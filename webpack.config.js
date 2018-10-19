/*
* @Author: Administrator
* @Date:   2018-09-17 22:41:56
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-07 15:04:04
*/

var webpack = require("webpack");

var Ex = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

//环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

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
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery' : 'window.jQuery'
    },
    module: {
          loaders: [{
                test: /\.css$/,
                loader: Ex.extract('style-loader', 'css-loader')  
          },{
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
          }]
    },
    resolve :{
        alias: {
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            img     : __dirname + '/src/img',
        }
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
        new htmlWebpackPlugin(getWebPackHtmlNames('index')),
        new htmlWebpackPlugin(getWebPackHtmlNames('login'))
    ]
};


if('dev'=== WEBPACK_ENV)
{
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;