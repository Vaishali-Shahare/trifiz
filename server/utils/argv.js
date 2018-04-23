'use strict';

const _ = require('lodash');

function getMatchedValue(regex) {
    let result;
    _.forEach(process.argv, val => {
        const matchResult = val.match(regex);
        if (!_.isEmpty(matchResult)) {
            result = matchResult[1];
            return false;
        }
    });
    return result;
}

function getTarget() {
    return getMatchedValue(/^-t=(.*?)$/);
}

function getPort() {
    return getMatchedValue(/^-p=([0-9]+)$/);
}

function isBuild() {
    return process.argv.indexOf('-b') > -1;
}

function hmrEnabled() {
    return !(process.argv.indexOf('-no-hmr') > -1);
}

module.exports = {
    getMatchedValue,
    getTarget,
    getPort,
    isBuild,
    hmrEnabled,
};