'use strict';

const proxy = require('http-proxy-middleware');
const _ = require('lodash');

function ProxyBuilder() {
    let _config;
    let _proxyNames;
    const _proxyMiddlewares = {};

    function config() {
        if (arguments === 0) {
            return _config;
        } else {
            _config = arguments[0];
            _memoizeConfig();
        }
    }
    this.config = config;

    function addProxiedRoutes(app) {
        app.use(_config.apiContexts, (req, res, next) => {
            _doAddProxiedRoutes(req, res, next);
        });

        _.forEach(_config.proxyOptions, (val, targetServer) => {
            _.forEach(_config.apiContexts, targetPath => {
                app.use(`/${targetServer}${targetPath}/`, (req, res, next) => {
                    _doAddProxiedRoutes(req, res, next, true);
                });
            });
        });
    }
    this.addProxiedRoutes = addProxiedRoutes;

    function _doAddProxiedRoutes(req, res, next, isTargetServerSpecified) {
        let checkTargetForProxy;
        let targetServer;

        if (isTargetServerSpecified) {
            checkTargetForProxy = req.baseUrl;
        } else {
            checkTargetForProxy = req.headers.referer;
        }

        _.each(_proxyNames, proxyName => {
            if (checkTargetForProxy.indexOf(`/${proxyName}/`) > -1) {
                targetServer = proxyName;
            }
        });

        targetServer && _proxyMiddlewares[targetServer](req, res, next);
    }

    function buildProxies(opts) {
        const options = opts ? opts : {};
        _.each(_proxyNames, proxyName => {
            _proxyMiddlewares[proxyName] = proxy(
                _getProxyOptions(proxyName, options)
            );
        });
    }
    this.buildProxies = buildProxies;

    function _getProxyOptions(targetServer, opts) {
        const targetUrl = _config.proxyOptions[targetServer].url;
        const defaultOpt = {
            target: targetUrl,
            changeOrigin: true,
            ws: true,
            pathRewrite: {},
            headers: {},
        };
        const callbacks = opts.callbacks;

        if (opts.cookie) {
            defaultOpt.headers.cookie = opts.cookie;
        }

        if (callbacks && callbacks.onProxyReq) {
            defaultOpt.onProxyReq = callbacks.onProxyReq;
        }
        if (callbacks && callbacks.onProxyRes) {
            defaultOpt.onProxyRes = callbacks.onProxyRes;
        }

        _.each(_config.apiContexts, contextPath => {
            const rewritePath = `^/${targetServer}${contextPath}`;
            defaultOpt.pathRewrite[rewritePath] = contextPath;
        });

        return defaultOpt;
    }

    function _memoizeConfig() {
        if (!_config) {
            return;
        }
        _proxyNames = _.keys(_config.proxyOptions);
    }
}

module.exports = new ProxyBuilder();
