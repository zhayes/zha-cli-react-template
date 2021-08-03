const config = require('./webpack.test.config.js');
const webpack = require('webpack');
const setting = require('./setting');
const {BASE_URL} = setting.prod;

config.plugins[1] = new webpack.DefinePlugin({
    BASE_URL: JSON.stringify(BASE_URL)
});

module.exports = config;