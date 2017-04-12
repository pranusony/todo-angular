
path = require("path");
var util = require('./util');
var httpPort = 3000;


var webpackConfig = require("../webpack.config");
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var compiler = webpack(webpackConfig);

var server;
var webpackPlugin;

util.exec("npm run build",function(){

    serve();

});


function serve(){

    server = require("../src/api/server");
    webpackPlugin = webpackMiddleware(compiler,{
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    });

    var hotReloadPlugin = require("webpack-hot-middleware")(compiler);

    server.start(httpPort,[webpackPlugin,hotReloadPlugin]);

    console.log('Server running at http://localhost:' + httpPort);
}

function reload(filePath){
    tinylr.changed({
        body: {
            files: [path.resolve('./' + filePath)]
        }
    });
}

function myWatch(filePaths,cb){
    chokidar.watch(filePaths).on('change', cb);
}

process.on('exit', function(code){
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

process.on('SIGHUP', function(){
    webpackPlugin.close();
    server.close();
});

//catches uncaught exceptions
process.on('uncaughtException', function () {
    webpackPlugin.close();
    server.close();
});