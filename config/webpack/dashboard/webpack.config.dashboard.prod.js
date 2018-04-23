'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = path.join(__dirname, '../../..');
const mainPath = path.join(rootPath, 'src/main');
const dashboardPath = path.join(mainPath, 'dashboard');
const outputPath = path.join(rootPath, 'target/aim');

const dashboardChunkName = process.env.TRIFIZ_VERSION
    ? `dashboard-${process.env.TRIFIZ_VERSION}`
    : 'dashboard';

function webpackConfig() {
    const config = {
        bail: true,
        devtool: 'inline-source-map',
        entry: {
            vendor: [path.join(dashboardPath, 'vendor.js')],
            [dashboardChunkName]: [path.join(dashboardPath, 'index.js')],
        },
        module: {
            rules: [
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader',
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    url: false,
                                    sourceMap: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    url: false,
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.html$/,
                    include: [/partials/],
                    use: [
                        {
                            loader: 'ngtemplate-loader',
                            options: {
                                module: 'trifiz-layout',
                                relativeTo: 'partials',
                                prefix: '/trifiz/partials',
                            },
                        },
                        {
                            loader: 'html-loader',
                            options: {
                                attrs: false,
                                minimize: true,
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
                                minimize: true,
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
                            minimize: true,
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
                        },
                    },
                },
            ],
        },
        output: {
            filename: 'dashboard/[name].[chunkhash:8].js',
            path: outputPath,
            publicPath: 'trifiz',
        },
        plugins: [
            new CleanWebpackPlugin([path.join(outputPath, 'dashboard')], {
                root: rootPath,
            }),
            new CopyWebpackPlugin([
                {
                    from: path.join(rootPath, 'src/assets'),
                    to: 'assets',
                },
                {
                    from: path.join(rootPath, 'src/fonts'),
                    to: 'fonts',
                },
                {
                    from: path.join(rootPath, 'src/img'),
                    to: 'img',
                },
            ]),
            new ExtractTextPlugin({
                filename: 'dashboard/[name].[contenthash:8].css',
            }),
            new HtmlWebpackPlugin({
                chunks: ['vendor', dashboardChunkName],
                chunksSortMode: 'manual',
                filename: 'dashboard.html',
                inject: false,
                minify: {
                    removeComments: true,
                },
                template: path.join(dashboardPath, 'index.ejs'),
            }),
            new webpack.DefinePlugin({
                WEBPACK_ENV: JSON.stringify('production'),
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
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
