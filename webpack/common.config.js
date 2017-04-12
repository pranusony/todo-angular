
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var projectConfig = require("../project.config");


module.exports = function (options) {

    /*************************
     * Common Entry
     **************************/

    var entry = {
        'main': [
            projectConfig.srcClientDirMain
        ]
    };

    if(!(options.env == "test"))
    {
        entry.main = entry.main.concat([
            projectConfig.srcClientDirIndex,
            projectConfig.srcClientDirMainCSS
        ])
    }


    /*************************
     * Common Plugins
     **************************/

    var plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

    ];

    if(!(options.env == "test"))
    {

        var htmlWebPackPlugin =   new HtmlWebpackPlugin({
            template: projectConfig.srcClientDirIndex,
            chunksSortMode: 'dependency',
            metadata: options,
            inject: 'body'
        });

        plugins.push(htmlWebPackPlugin);
    }

     /*************************
     * Common rules
     **************************/

    var typescriptLoader = {test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        query: {
            tsconfig: projectConfig.rootDir+"/tsconfig.json"
        }
    };

    if(options.env == "test" && !options.isLocalTesting) //adding inline source map only for test node environment
    {
        typescriptLoader.query.sourceMap = false;
        typescriptLoader.query.inlineSourceMap = true;
    }

    var rules = [

        typescriptLoader,

        {
            test: /\.html$/,
            loader: "underscore-template-loader" // loaders: ['underscore-template-loader'] is also perfectly acceptable.
        }

    ];


    return {
        entry:entry,
        output: {
            path: projectConfig.distClientDir,
            filename: '[name].js'
        },
        resolve: {
            extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
            modules: [
                "src",
                "node_modules"
            ]
        },
        module: {
            rules: rules
        },
        plugins: plugins,
        node:  {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }
};