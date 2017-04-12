
var webpack = require("webpack");
var projectConfig = require("../project.config");

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
        test: /\.(tsx?|js)($|\?)/i // process .js and .ts files only
    }));

    devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    devConfig.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }));


    /*************************
     * Extending Rules
     **************************/

    devConfig.module.rules.push({

        test: /\.scss$/,
        loaders: ["style-loader", "css-loader",
            {loader: 'sass-loader',
                options: {
                    includePaths: [projectConfig.root("./node_modules/framework7/dist/img"),
                        projectConfig.root("./node_modules/ionicons/dist/scss")]
                },
            }],
    });

    return devConfig;
};