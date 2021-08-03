const path = require('path');
const webpack = require('webpack');
const open = require('open');
const config = require('./webpack.dev.config');
const webpackDevServer = require('webpack-dev-server');
const net = require('net')

const complier = webpack(config);

let port = 2000;

const options = {
    contentBase: path.join(__dirname, '../dist/'),
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true
}

webpackDevServer.addDevServerEntrypoints(config, options);

const server = new webpackDevServer(complier, options);

server.use(require('webpack-hot-middleware')(complier));

const setupServer = (port) => {
    server.listen(port, options.host, (err) => {
        if (err) {
            console.log(err)
            return;
        }
        const address = `http://localhost:${port}`;
        console.log(`dev server listening on ${address}`);
        open(`${address}`);
    })

}

const checkPort = () => {
    const netServer = net.createServer().listen(port, options.host);
    
    netServer.on('listening', function () {
        console.log(port)
        netServer.close();
        setupServer(port)
    })

    netServer.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
            port = port + 1;
            checkPort()
        }
    })
}

checkPort();