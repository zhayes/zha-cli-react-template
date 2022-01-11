const merge = require('webpack-merge');
const common = require('./webpack.base.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');
const path = require('path');

const setting = require('./setting');
const {BASE_URL} = setting.dev;

module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: './src/main',
        framework: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        filename: 'js/[name].[chunkHash:10].bundle.js',
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }]
                },
                canPrint: true
            }),
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                },
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx|ts$/,
                use: [
                    'ts-loader'
                ],
                exclude: '/node_modules/',
                include: path.resolve(__dirname, '../src'),
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
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
                exclude: path.resolve(__dirname, '../src'),
                use: [
                    MiniCssExtractPlugin.loader,
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
                test: /\.(less|css)$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { 
                            modules: {
                                localIdentName: '[name][contentHash:base64:5]'
                            },
                        }
                    },
                    'postcss-loader',
                    'less-loader'
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
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(BASE_URL)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/temp.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contentHash].css',
            chunkFilename: 'css/[id][contentHash].css',
        })
    ]
});
