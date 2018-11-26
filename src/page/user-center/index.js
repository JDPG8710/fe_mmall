/*
* @Author: user
* @Date:   2018-11-06 23:29:50
* @Last Modified by:   user
* @Last Modified time: 2018-11-21 00:17:55
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide= require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _user  = require('service/user-service.js');
var templateIndex = require('./index.string');

// page codes
var page ={
    init      : function(){
        this.onLoad();
    },
    onLoad : function(){
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});