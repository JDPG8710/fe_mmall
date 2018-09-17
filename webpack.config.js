/*
* @Author: user
* @Date:   2018-06-03 23:52:58
* @Last Modified by:   user
* @Last Modified time: 2018-08-09 21:44:13
*/

var webpack = require("webpack");
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var getWebPackHtmlNames = function (name){
    return {            
                template: './src/view/'+ name +'.html',
                filename: 'view/'+ name +'.html',
                hash: true,
                inject: true,
                chunks: ['common',name] 
           };
}


var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/login.js'],
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
          loaders: [{
                test: /\.css$/,
                loader: Ex.extract('style-loader', 'css-loader')  
          }]
    },
    plugins: [
        //common js package configuration
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        
        //css independant package configuration
        new Ex("css/[name].css"),

        //html package config
        new HtmlWebpackPlugin(getWebPackHtmlNames('index')),
        new HtmlWebpackPlugin(getWebPackHtmlNames('login'))
    ]
};

module.exports = config;