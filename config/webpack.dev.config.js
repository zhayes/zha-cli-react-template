const merge = require('webpack-merge');
const common = require('./webpack.base.config.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const setting = require('./setting');
const {BASE_URL} = setting.dev;

module.exports = merge(common, {
    mode: 'development',
    entry: ['react-hot-loader/patch', './src/main'],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'happypack/loader?id=babel',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'font/'
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[contentHash:base64:5]'
                            },
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(css|less)$/,
                exclude: path.resolve(__dirname, '../src'),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: {
                                "@disabled-color": "#000"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[contentHash].[ext]'
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBar(),
        new HappyPack({
            id: 'babel',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                },
                {
                    loader: 'ts-loader',
                    options:{
                        happyPackMode: true
                    }
                }
            ],
            threadPool: happyThreadPool
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(BASE_URL)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/temp.html',
            inject: 'body',
            minify: {
                removeComments: false,
                collapseWhitespace: false,
            }
        })
    ],
    devtool: "source-map"
});
