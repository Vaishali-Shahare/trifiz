'use strict';

const _ = require('lodash');
const fs = require('fs');

const Transform = require('stream').Transform;
const request = require('request');
const Readable = require('stream').Readable;

const paths = require('./utils/paths');

function otmContextInjector(isBuild) {
    return function(req, res, next) {
        const config = _loadConfig();
        if (_hasProperConfig(config)) {
            if (/\/dashboard\.html$/.test(req.url)) {
                return injectContext(req, res, next, config, 'dashboard');
            }
        }
        next();
    };

    function injectContext(req, res, next, config, target) {
        let otmContextJson = jSON.stringify(_createContext(config));
        if (isBuild) {
            fs
                .createReadStream(paths.getBuildTargetPath(target))
                .pipe(_injector(otmContextJson))
                .pipe(res);
        } else {
            const urlForCheck =
                req.protocol + '://' + req.headers.host + req.originalUrl;
            getCompiledHtmlFromWebpack(urlForCheck, function(
                error,
                response,
                body
            ) {
                if (!error && response.statusCode === 200) {
                    console.log('get the compiled html from webpack..!!');
                    sendResponseFromString(
                        body,
                        _injector(otmContextJson),
                        res
                    );
                } else {
                    next();
                }
            });
        }
    }

    function getCompiledHtmlFromWebpack(urlForCheck, cb) {
        request(
            { proxy: false, url: urlForCheck, qs: { fromdevserver: true } },
            cb
        );
    }

    function sendResponseFromString(originalContent, pipeLine, res) {
        const readable = new Readable();
        readable._read = function noop() {};
        readable.push(originalContent);
        readable.push(null);
        readable.pipe(pipeLine).pipe(res);
    }

    function _hasProperConfig(config) {
        return config && config.userInfo;
    }

    function _createContext(config) {
        return {
            contextPath: config.contextPath,
            logOnConsole: config.logOnConsole,
            timeout: config.timeout,
            useMockData: config.useMockData,
        };
    }

    function _injector(replacementStr) {
        const parser = new Transform();
        parser._transform = function(data, encoding, done) {
            const convertedData = data
                .toString()
                .replace(
                    "otmJsContext = '<json-snippet>'",
                    `otmJsContext = ${replacementStr}`
                );
            this.push(convertedData);
            done();
        };
        return parser;
    }

    function _loadConfig() {
        const privateFilePath = paths.getConfigFolderFilePath('private');
        let privateObj = _.attempt(function() {
            return requireEagerly(privateFilePath);
        });

        if (_.isError(privateObj)) {
            console.log(
                'cannot inject otm context: {root}/config/private.js not found! Please create file in said path'
            );
            privateObj = {};
        }
        return privateObj;
    }

    function requireEagerly(modulePath) {
        delete require.cache[require.resolve(modulePath)];
        return require(modulePath);
    }
}

module.exports = otmContextInjector;
