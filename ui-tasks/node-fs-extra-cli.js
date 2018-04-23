'use strict';

const _ = require('lodash');
const fse = require('fs-extra');

function createEmptyFile(filePath) {
	fse.ensureFile(filePath, err => {
		if (err) {
			return console.log(err);
		}
	});
}

function emptyDir(dirPath) {
	fse.emptyDir(dirPath, err => {
		if (err) {
			return console.error(err);
		}
	});
}

function doCommand(command, path1) {
	switch (command) {
		case 'ef':
			path1 && createEmptyFile(path1);
			break;

		case 'ed':
			path1 && emptyDir(path1);
			break;
	}
}

function checkCliOptions() {
	let command;
	let path1;
	_.forEach(process.argv, val => {
		const matchResult1 = val.match(/^-fse=(.+?)$/);
		if (!_.isEmpty(matchResult1)) {
			command = matchResult1[1];
		}
		const matchResult2 = val.match(/^-path1=(.+?)$/);
		if (!_.isEmpty(matchResult2)) {
			path1 = matchResult2[1];
		}
	});
	console.log('fse command:',command);
	console.log('fse path1:', path1);
	doCommand(command, path1);
}

checkCliOptions();