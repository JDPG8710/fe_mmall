/*
* @Author: user
* @Date:   2019-01-06 22:56:54
* @Last Modified by:   user
* @Last Modified time: 2019-01-06 23:11:57
*/
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _product  = require('service/product-service.js');
var _cart  = require('service/cart-service.js');
var templateIndex = require('./index.string');


var page ={
        data : {
            productId   : _mm.getUrlParam('productId') || '',
        },
        init   : function(){
            this.onload();
            this.bindEvent();
        },
        bindEvent : function(){
            var _this = this;
        },
        onload : function(){
            if(!this.data.productId){
                _mm.goHome();
            }
            this.loadDetail();
        },
        loadDetail : function(){
            
        }
    };

$(function(){
    page.init();
});