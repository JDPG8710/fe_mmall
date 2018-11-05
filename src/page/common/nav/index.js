/*
* @Author: Administrator
* @Date:   2018-10-22 00:16:42
* @Last Modified by:   user
* @Last Modified time: 2018-11-04 22:49:43
*/
'user strict';
require('./index.css');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent	 	: function(){
		// login click event
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//register click event
		$('.js-register').click(function(){
			window.location.href='./user-register.html';
		});
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			}, function(){
				_mm.errorTips(errMsg);
			});
		});
	},
	//user info
	loadUserInfo    : function(){
			_user.checkLogin(function(res){
				$('.user.not-login').hide().siblings('.user.login').show()
					.find('.username').text(res.username);
			}, function(){
				//do nothing
			});
	},
	//cart 
	loadCartCount   : function(){
		_cart.getCartCount(function(res){
			$('.nav.cart-count').text(res || 0);
		},function(){
			$('.nav.cart-count').text(0);
		});
	}
};

module.exports = nav.init();