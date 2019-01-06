/*
* @Author: Administrator
* @Date:   2018-09-17 22:41:56
* @Last Modified by:   user
* @Last Modified time: 2019-01-06 22:56:36
*/

var webpack = require("webpack");

var Ex = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');

//环境变量
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

var getWebPackHtmlNames = function (name,title){
    return {            
                template: './src/view/'+ name +'.html',
                filename: 'view/'+ name +'.html',
                hash    : true,
                title   : title,
                inject  : true,
                chunks  : ['common',name] 
           };
}

var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'              : ['./src/page/detail/index.js'],
        'user-login'        : ['./src/page/user-login/login.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result'            : ['./src/page/result/index.js']
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
          },{
                test: /\.string$/,
                loader: 'html-loader'
          }]
    },
    resolve :{
        alias: {
            node_modules: __dirname + '/node_modules',
            util        : __dirname + '/src/util',
            page        : __dirname + '/src/page',
            service     : __dirname + '/src/service',
            img         : __dirname + '/src/img'
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
        new htmlWebpackPlugin(getWebPackHtmlNames('index','首页')),
        new htmlWebpackPlugin(getWebPackHtmlNames('list','商品列表页')),
        new htmlWebpackPlugin(getWebPackHtmlNames('detail','商品详情页')),
        new htmlWebpackPlugin(getWebPackHtmlNames('user-login','用户登录')),
        new htmlWebpackPlugin(getWebPackHtmlNames('user-register','用户注册')),
        new htmlWebpackPlugin(getWebPackHtmlNames('user-pass-reset','找回密码')),
        new htmlWebpackPlugin(getWebPackHtmlNames('user-pass-update','修改密码')),
        new htmlWebpackPlugin(getWebPackHtmlNames('user-center','个人中心')),
        new htmlWebpackPlugin(getWebPackHtmlNames('user-center-update','修改个人信息')),
        new htmlWebpackPlugin(getWebPackHtmlNames('result','操作结果'))
    ]
};


if('dev'=== WEBPACK_ENV)
{
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;