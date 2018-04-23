'use strict';

const path = require('path');

const rootPath = path.join(__dirname, '../..');
const webpackTestConfig = require(path.join(
	rootPath,
	'config/webpack/webpack.config.test'
))();
const testFilePath = path.join(__dirname, 'test.webpack.js');

module.exports = function(config) {
	const configObj = {
		framework: ['jasmine'],
		file: [testFilePath],
		exclude: [],
		preprocessors: {
			'test.webpack.js': ['webpack', 'sourcemap'],
		},
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		usePolling: true,
		browsers: ['IENoAddons'],
		customLaunchers: {
			IENoAddons: {
				base: 'IE',
				flags: ['-extoff'],
			},
		},
		singleRun: false,
		reportSlowerThan: 100,
		concurrency: Infinity,
		plugins: [
			'karma-webpack',
			'karma-sourcemap-loader',
			'karma-ie-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-mocha-reporter',
			'karma-junit-reporter',
			'karma-coverage',
		],
		junitReporter: {
			outputDir: path.join(rootPath, 'tmp/unit-test/JUnit'),
			outputFile: 'result.xml',
			useBrowserName: false,
		},

		coverageReporter: {
			type: 'html',
			dir: path.join(rootPath, 'tmp/unit-test/coverage'),
			subdir: '',
		},
		webpack: webpackTestConfig,
	};
	config.set(configObj);
};