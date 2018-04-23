'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const paths = require('./utils/paths');

let devMiddleware;
let hotMiddleware;

function init(options) {
    const webpackConfig = require(paths.getWebpackConfigPath(options.target))(
        options
    );
    const compiler = webpack(webpackConfig);
    devMiddleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/',
    });
    hotMiddleware = webpackHotMiddleware(compiler);
}

function getDevMiddleware() {
    return devMiddleware;
}

function getHotMiddleware() {
    return hotMiddleware;
}

module.exports = {
    init,
    getDevMiddleware,
    getHotMiddleware,
};
