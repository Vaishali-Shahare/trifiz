'use strict';

const rulesDirPlugin = require('eslint-plugin-rulesdir');
const path = require('path');
rulesDirPlugin.RULES_DIR = path.join(
	__dirname,
	'./config/otm-eslint-rules/lib/rules'
);

module.exports = {
	extends: ['plugin:prettier/recommended'],
	plugins: ['rulesdir'],
	env: {
		browser: true,
		node: true,
		es6: true,
		jasmine: true,
	},
	rules: {
		strict: 2,
		'no-shadow': 2,
		'no-shadow-restricted-names': 2,
		'no-unused-vars': [
			2,
			{
				vars: 'local',
				args: 'after-used',
			},
		],

		'no-cond-assign':[
			2,
			'always',
		],
		'no-debugger': 1,
		'no-alert': 1,
		'no-constant-condition': 1,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-empty': 1,
		'no-empty-character-class': 2,
		'no-ex-assign': 2,
		'no-func-assign': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-irregular-whitespace': 1,
		'no-negated-in-lhs': 2,
		'no-obj-calls': 2,
		'no-path-concat': 2,
		'no-regex-spaces': 2,
		'no-sparse-arrays': 2,
		'no-unreachable': 2,
		'use-isnan': 2,
		'valid-jsdoc': 1,
		'valid-typeof': [
			2,
			{
				requireStringLiterals: true,
			},
		],
		'no-dupe-args': 2,
		'dot-notation': 2,
		eqeqeq: [
			2,
			'smart',
		],
		'no-caller': 2,
		'no-div-regex': 2,
		'no-labels': 2,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-extra-bind': 2,
		'no-implied-eval': 2,
		'no-lone-blocks': 2,
		'no-loop-func': 2,
		'no-multi-str': 2,
		'no-native-reassign': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-wrappers': 2,
		'no-octal': 2,
		'no-octal-escape': 2,
		'no-param-reassign': 2,
		'no-proto': 2,
		'no-redeclare': 2,
		'no-return-assign': 2,
		'no-script-url': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-throw-literal': 2,
		'no-undef': 2,
		'no-undef-init': 2,
		'no-undefined': 1,
		'no-with': 2,
		'handle-callback-err': 1,
		radix: 2,
		yoda: [
			2,
			'never',
		],
		'no-invalid-this': 1,
		'vars-on-top': 2,
		'max-lines': [
			2,
			{
				max: 400,
				skipBlankLines: true,
				skipComments: true
			},
		],

	},
};