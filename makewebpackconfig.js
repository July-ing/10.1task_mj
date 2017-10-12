var path = require('path');
var webpack  = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = function(options) {
    var entry,plugins,cssLoaders,devtool;
    // production
    if(options.prod) {
        entry = [
            path.resolve(__dirname, 'js/app.js')
        ];
        cssLoaders = ['file-loader?name=[path][name].[ext]','postcss-loader'];

    } else {
        entry = [
            "webpack-dev-server/client?http://localhost:8080",
            path.resolve(__dirname, 'js/app.js')
        ];
        cssLoaders = ['style-loader','css-loader', 'postcss-loader'];

    }

    return {
        entry: entry,
        output:{
            path: path.resolve(__dirname,'build'),
            filename: 'js/bundle.js'
        },
        module: {
            loaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: path.join(__dirname, '/node_modules/')
            },{
                test: /\.css$/,
                loader: cssLoaders
            },{
                test:/\.jpe?g$|\.gif$|\.png$/i,
                loader: "url-loader?limit=10000"
            }
            ]
        },
        plugins:
    }
}