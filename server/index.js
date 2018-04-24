'use strict';

const _ = require('lodash');
const express = require('express');
const compression = require('compression');

const paths = require('./utils/paths');
const argv = require(paths.getUtilFilePath('argv'));
const devServerConfig = require(paths.getDevServerConfigFilePath());
const webpackMiddleware = require(paths.getServerFolderFilePath(
    'webpack-middleware'
));
const proxyService = require(paths.getServerFolderFilePath('proxy-service'));
const otmContextInjector = require(paths.getServerFolderFilePath(
    'otm-context-injector'
));

const isBuild = argv.isBuild();
const target = getTarget();
const port = argv.getPort() || devServerConfig.port || 8085;
let devMiddleware;
let hotMiddleware;
if (!isBuild) {
    const HMR = argv.hmrEnabled();
    webpackMiddleware.init({
        target,
        HMR,
    });
    devMiddleware = webpackMiddleware.getDevMiddleware();
    hotMiddleware = webpackMiddleware.getHotMiddleware();
}

proxyService.config(devServerConfig.apiProxies);
const app = express();

app.use(compression());

addStaticFilesRoutes([
    {
        route: 'assets',
        path: 'assets',
    },
    {
        route: 'webfonts',
        path: 'webfonts',
    },
    {
        route: 'img',
        path: 'img',
    },
    {
        route: 'test',
        path: 'test/mock-data',
    },
]);

app.use(/\/(loc|trifiz)/, otmContextInjector(isBuild));
app.use(
    /\/(loc|trifiz)/,
    isBuild
        ? express.static(paths.getBuildFolderPath())
        : (req, res, next) => {
              devMiddleware(req, res, next);
          }
);

app.use(
    'trifiz',
    isBuild
        ? express.static(paths.getBuildFolderPath())
        : (req, res, next) => {
              devMiddleware(req, res, next);
          }
);

!isBuild && app.use(hotMiddleware);

app.listen(port, () =>
    console.log(`${target} server started at port, ${port}..!!`)
);

function getTarget() {
    const targetArr = ['dashboard'];
    const argvTarget = argv.getTarget();
    return targetArr.indexOf(argvTarget) > -1 ? argvTarget : 'dashboard';
}

function addStaticFilesRoutes(pathArr) {
    _.map(pathArr, staticPath => {
        app.use(
            `/trifiz/${staticPath.route}`,
            express.static(paths.getBuildFolderPath(staticPath.path))
        );
    });
}
