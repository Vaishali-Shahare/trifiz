'use strict';

const path = require('path');
const webpack = require('webpack');

const rootPath = path.join(__dirname, '../..');
const mainPath = path.join(rootPath, 'src/main');

function webpackConfig() {
    const config = {
        devtool: 'source-map',
        externals: {
            './cptable': 'var cptable',
            '../xlsx.js': 'var _XLSX',
        },
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    use: 'null-loader',
                },
                {
                    test: /\.html$/,
                    include: [/partials/],
                    use: [
                        {
                            loader: 'ngtemplate-loader',
                            options: {
                                module: 'trifiz.layout',
                                relativeTo: 'partials',
                                prefix: '/trifiz/partials',
                            },
                        },
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: false,
                                minimize: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    include: [/Layout/],
                    use: [
                        {
                            loader: 'ngtemplate-loader',
                            options: {
                                module: 'trifiz.layout',
                                relativeTo: '[path]',
                                prefix: '/layout',
                            },
                        },
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: false,
                                minimize: false,
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    exclude: [/(Layout|partials)/],
                    use: {
                        loader: 'html-loader',
                        options: {
                            attrs: false,
                            minimize: false,
                        },
                    },
                },
                {
                    test: /\.js$/,
                    include: [mainPath],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['es2015'],
                            plugins: ['istanbul'],
                        },
                    },
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                WEBPACK_ENV: JSON.stringify('development'),
            }),
        ],
        resolve: {
            alias: {
                '/main': mainPath,
            },
        },
    };
    return config;
}

module.exports = webpackConfig;
