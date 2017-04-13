
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
var projectConfig = require("../project.config");


module.exports = function (options) {

    var processIndexAndScss = options.env !== "test";

    /*************************
     * Common Entry
     **************************/

    var entry = {
        'main': [
            projectConfig.srcDirMain
        ]
    };

    var indexFile = projectConfig.srcDirIndex ;

    if(process.env.DOCS) {
        indexFile = projectConfig.documentationDirIndex;
        entry.main = [projectConfig.documentaionDirMain];
    }

    var filename = "index.html";

    if(processIndexAndScss)
    {

        entry.main = entry.main.concat([
            indexFile,
            projectConfig.srcDirMainCSS
        ]);

    }

    /*************************
     * Common Plugins
     **************************/

    var plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()

    ];

    if(processIndexAndScss)
    {

        var htmlWebPackPlugin =   new HtmlWebpackPlugin({
            template: indexFile,
            filename:filename,
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

    // AOT uses a different typescript loader
    if (options.aot === 'true') {

        typescriptLoader = {test: /\.ts$/, loaders: ['@ngtools/webpack']};

        plugins.push(new AotPlugin({
            tsConfigPath: projectConfig.rootDir+"/tsconfig.json",
            entryModule: projectConfig.srcDir + '/AppModule#AppModule',
        }));

        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: false
            },
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false
        }));
    }

    if (options.compress) {
        var CompressionPlugin = require("compression-webpack-plugin");

        plugins.push(new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        }));
    }

    var rules = [

        typescriptLoader,
        {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        },
        {
            test: /\.png$/,
            loader: "underscore-template-loader" // loaders: ['underscore-template-loader'] is also perfectly acceptable.
        },

        {
            test: /\.html$/,
            loader: "underscore-template-loader" // loaders: ['underscore-template-loader'] is also perfectly acceptable.
        },
        {
            test: /\.json$/,
            use: 'json-loader'
        }

    ];


    return {
        entry:entry,
        output: {
            path: projectConfig.root("dist/client"),
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