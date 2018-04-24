'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/*
const ExtractTextPlugin = require('extract-text-webpack-plugin');
*/

const rootPath = path.join(__dirname, '../../..');
const mainPath = path.join(rootPath, 'src/main');
const dashboardPath = path.join(mainPath, 'dashboard');

const dashboardChunkName = 'dashboard';

function webpackConfig(options) {
    const configOpts = options || {};
    const HMR_ENTRY = configOpts.HMR
        ? ['event-source-polyfill', 'webpack-hot-middleware/client?reload=true']
        : [];

    const config = {
        mode: 'development',
        devtool: 'source-map',
        entry: {
            vendor: HMR_ENTRY.concat([path.join(dashboardPath, 'vendor.js')]),
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
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                url: false,
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
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
                },
                {
                    test: /^((?!\.module).)*less$/,
                    loader: 'style!css!less',
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                    loader: 'url?limit=100000&name=/src/fonts/[name].[ext]',
                },
                {
                    test: /\.html$/,
                    include: [/partials/],
                    use: [
                        {
                            loader: 'ngtemplate-loader',
                            options: {
                                module: 'dashboard',
                                relativeTo: 'partials',
                                prefix: '/partials',
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
                                module: 'dashboard',
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
                        },
                    },
                },
            ],
        },
        output: {
            filename: 'dashboard/[name].[hash:8].js',
            publicPath: '/trifiz/',
        },
        optimization: {
            minimize: false,
            splitChunks: {
                cacheGroups: {
                    default: false,
                    commons: {
                        name: 'vendor',
                        minChunks: Infinity,
                    },
                },
            },
        },
        plugins: [
            /*new CopyWebpackPlugin([
                {
                    from: 'node_modules/font-awesome/fonts',
                    to: 'fonts',
                },
                {
                    from: 'node_modules/font-awesome/css/font-awesome.min.css',
                },
            ]),*/
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
            new HtmlWebpackPlugin({
                chucks: ['vendor', dashboardChunkName],
                chucksSortMode: 'manual',
                filename: 'dashboard.html',
                inject: false,
                template: path.join(dashboardPath, 'index.ejs'),
                customOptions: {
                    DEV: true,
                },
            }),
            /*new webpack.DefinePlugin({
                WEBPACK_ENV: JSON.stringify('development'),
            }),*/
            new webpack.HotModuleReplacementPlugin(),
            /*new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity,
            }),*/
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
