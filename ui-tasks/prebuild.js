'use strict';

const path = require('path');
const fse = require('fs-extra');

const rootPath = path.join(__dirname, '..');
const targetFolderPath = path.join(rootPath, 'target');
const etcFolderPath = path.join(rootPath, 'etc');
const buildFolderPath = path.join(targetFolderPath, 'aim');

function emptyBuildFolder() {
    fse.emptyDir(targetFolderPath, err => {
        if (err) {
            return console.error(err);
        }
        console.log('Done emptyBuilderFolder..!!');
        copyEtcFolderToBuildFolder();
    });
}

function copyEtcFolderToBuildFolder() {
    const deployTo = process.env.Link;
    console.log('Deployment Env is', deployTo);

    if (deployTo !== 's11') {
        return;
    }
    const copyToPath = path.join(buildFolderPath, 'etc');
    fse.copy(etcFolderPath, copyToPath, err => {
        if (err) {
            console.error(err);
        }
        console.log('Done copyEtcFolderToBuildFolder..!!');
    });
}

emptyBuildFolder();

module.exports = emptyBuildFolder;
