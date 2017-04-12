
var webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var projectConfig = require("../project.config");

module.exports = function (options) {

    var prodConfig = Object.assign({},require("./common.config")(options));

    /*************************
     * Extending Plugins
     **************************/

    prodConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin('common'));

    prodConfig.plugins.push(new ExtractTextPlugin(projectConfig.distClientDirMainCSS));
    prodConfig.plugins.push(new CopyWebpackPlugin([
        {
            context:projectConfig.srcDir,
            from: projectConfig.srcDir,
            to: projectConfig.distDir
        }

    ],{
        ignore: [
            'client/index.html',
            'api/tsconfig.json',
            'api/**/*.ts',
            "client/**/*.scss",
            "client/**/*.ts",
            "client/**/*.js"
        ],
        debug: true
    }));

    /*************************
     * Extending Rules
     **************************/

    prodConfig.module.rules.push({
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader','sass-loader']})
    });


    return prodConfig;
};