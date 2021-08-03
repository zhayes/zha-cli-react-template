const path = require('path');

module.exports = {
    entry: {
        app: './src/main'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx", ".json", "css", "less", "scss"],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            "~": path.resolve(__dirname, '../src'),
            "~reducers": path.resolve(__dirname, '../src/reducers'),
            "~sagas": path.resolve(__dirname, '../src/sagas'),
            "~utils": path.resolve(__dirname, '../src/utils'),
            "~components": path.resolve(__dirname, '../src/components'),
            "~pages": path.resolve(__dirname, '../src/pages'),
            "~img": path.resolve(__dirname, '../src/assets/images'),
            "~js": path.resolve(__dirname, '../src/assets/js'),
            "~css": path.resolve(__dirname, '../src/assets/css'),
            "~assets": path.resolve(__dirname, '../src/assets'),
            "~apis": path.resolve(__dirname, '../src/apis'),
            "~routes": path.resolve(__dirname, '../src/routes'),
            "~store": path.resolve(__dirname, '../src/store')
        }
    }
}