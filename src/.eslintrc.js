'use strict';

const rulesDirPlugin = require('eslint-plugin-rulesdir');
const path = require('path');
rulesDirPlugin.RULES_DIR = path.join(
    __dirname,
    '../config/otm-eslint-rules/lib/rules'
);

module.exports = {
    extends: ['plugin:angular/johnpapa'],
    plugins: ['rulesdir'],
    parserOptions: {
        sourceType: 'module',
    },
    globals: {
        _: false,
        angular: false,
        moment: false,
    },
    rules: {
        strict: 1,
        'no-console': 2,
        'angular/function-type': [2, 'named'],
        'angular/controller-name': [1, 'trifiz'],
        'angular/file-name': 0,
        'angular/di': [2, '$inject'],
        'angular/module-setter': 0,
    },
};
