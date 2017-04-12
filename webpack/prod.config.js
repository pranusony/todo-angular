var webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var projectConfig = require("../project.config");

module.exports = function (options) {

    // TODO: Refactor webpack config files

    var prodConfig = Object.assign({},require("./common.config")(options));

    /*************************
     * Extending Plugins
     **************************/

    prodConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin('common'));

    prodConfig.plugins.push(new ExtractTextPlugin(projectConfig.distDirMainCSS));
    prodConfig.plugins.push(new CopyWebpackPlugin([
        {
            context:projectConfig.root('src'),
            from: projectConfig.root('src'),
            to: projectConfig.distDir
        }
    ],{
        ignore: [
            'index.html',
            "**/*.scss",
            "**/*.ts"
        ],
        debug: true
    }));

    prodConfig.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }));

    /*************************
     * Extending Rules
     **************************/

    prodConfig.module.rules.push({
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader',
            {loader: 'sass-loader',
                options: {
                    includePaths: [projectConfig.root("./node_modules/framework7/dist/img")
                    ,projectConfig.root("./node_modules/ionicons/dist/scss")]
                }
            }]})
    });


    return prodConfig;
};