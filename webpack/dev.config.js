
var webpack = require("webpack");

module.exports = function (options) {

    if(!options) options = {};

    var devConfig = Object.assign({},require("./common.config")(options));// setting common config

    var devEntries = [  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        'webpack/hot/dev-server'
    ];

    /*************************
     * Extending Entry and Output
     **************************/
    for(var key in devConfig.entry)
    {
        devConfig.entry[key] = devConfig.entry[key].concat(devEntries)
    }

    devConfig.output.sourceMapFilename = '[name].map';


    /*************************
    * Extending Plugins
    **************************/
    devConfig.plugins.push(new webpack.SourceMapDevToolPlugin({
        filename: null, // if no value is provided the sourcemap is inlined
        test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }));

    devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


    /*************************
     * Extending Rules
     **************************/

    devConfig.module.rules.push({

        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    });

    return devConfig;
};