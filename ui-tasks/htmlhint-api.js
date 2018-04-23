'use strict';

const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
const HTMLHint = require('htmlhint').HTMLHint;

const rootPath = path.join(__dirname, '..');
const htmlhintIgnorePath = path.join(rootPath, 'config/.htmlhintignore.js');
const htmlhintrcPath = path.join(rootPath, '.htmlhintrc');
const htmlhintTargetFolder = 'src';

function hintFiles() {
    const htmlhintIgnoreFiles = require(htmlhintIgnorePath);
    const htmlhintOptions = fse.readJsonSync(htmlhintrcPath);

    const arrFilesSrc = glob.sync(`${htmlhintTargetFolder}/**/*.html`, {
        cwd: rootPath,
        ignore: htmlhintIgnoreFiles,
    });

    let hintCount = 0;
    let fileCount = 0;

    arrFilesSrc.forEach(filepath => {
        const file = fse.readFileSync(filepath, 'utf-8');
        if (file.length) {
            const messages = HTMLHint.verify(file, htmlhintOptions);
            if (messages.length > 0) {
                console.log('   ' + filepath);
                const arrLogs = HTMLHint.format(messages, {
                    colors: true,
                    indent: 6,
                });
                arrLogs.forEach(log => console.log(log));
                console.log('');
                hintCount += messages.length;
                fileCount++;
            }
        }
    });

    let resulsMsg;
    if (hintCount > 0) {
        resulsMsg = ' %d errors in %d files from HTMLHint';
        console.log(`\x1b[31m${resulsMsg}\x1b[0m`, hintCount, fileCount);
        process.exit(1);
    } else {
        resulsMsg = '>> %d files lint free from HTMLHint';
        console.log(`\x1b[32m${resulsMsg}\x1b[0m`, arrFilesSrc.length);
    }
}

hintFiles();
