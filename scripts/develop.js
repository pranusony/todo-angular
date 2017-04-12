var path = require("path");
var util = require('./util');
var httpPort = 3000;
var chokidar = require('chokidar');

var projectConfig = require("../project.config");
var webpackConfig = require("../webpack.config");
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var compiler = webpack((typeof webpackConfig === 'function') ? webpackConfig() : webpackConfig);

var server;
var webpackPlugin;

var indexStaticPath = projectConfig.srcDir;

var cmd = projectConfig.tsc;
cmd = cmd + " -p src/api";

util.exec(cmd, function (err) {
    serve();
});

function serve(){

    console.log(indexStaticPath);

    server = require("../src/api/server");

    webpackPlugin = webpackMiddleware(compiler,{
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    });

    var hotReloadPlugin = require("webpack-hot-middleware")(compiler);

    server.start(httpPort,[webpackPlugin,hotReloadPlugin], indexStaticPath);

    console.log('Server running at http://localhost:' + httpPort);

}

process.on('exit', function(){
    webpackPlugin.close();
    server.close();
});

//catches ctrl+c event
process.on('SIGINT', function(){
    webpackPlugin.close();
    server.close();
});

process.on('SIGTERM', function(){
    webpackPlugin.close();
    server.close();
});

process.on('SIGABRT', function(){
    webpackPlugin.close();
    server.close();
});

process.on('SIGHUP', function(){
    webpackPlugin.close();
    server.close();
});

//catches uncaught exceptions
process.on('uncaughtException', function () {
    webpackPlugin.close();
    server.close();
});