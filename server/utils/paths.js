'use strict';

const path = require('path');

const rootPath = path.join(__dirname, '../..');

function getUtilFilePath(filename) {
    return path.join(rootPath, `server/utils/${filename}`);
}

function getServerFolderFilePath(filename) {
    return path.join(rootPath, `server/${filename}`);
}

function getWebpackConfigPath(target) {
    return path.join(
        rootPath,
        `config/webpack/${target}/webpack.config.${target}.dev`
    );
}

function getJanusFilePath(filename) {
    return path.join(rootPath, `server/janus/${filename}`);
}

function getDevServerConfigFilePath() {
    return path.join(rootPath, 'config/dev-server-config');
}

function getConfigFolderFilePath(filename) {
    return path.join(rootPath, `config/${filename}`);
}

function getStaticFolderPath(foldername) {
    return path.join(rootPath, `src/${foldername}`);
}

function getBuildFolderPath() {
    return path.join(rootPath, 'target/aim');
}

function getBuildTargetPath(target) {
    return path.join(getBuildFolderPath(), `${target}.html`);
}

module.exports = {
    getUtilFilePath,
    getServerFolderFilePath,
    getWebpackConfigPath,
    getJanusFilePath,
    getDevServerConfigFilePath,
    getConfigFolderFilePath,
    getStaticFolderPath,
    getBuildFolderPath,
    getBuildTargetPath,
};
