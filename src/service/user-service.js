/*
* @Author: Administrator
* @Date:   2018-10-24 23:54:21
* @Last Modified by:   user
* @Last Modified time: 2018-11-27 00:18:48
*/

'use strict';

var _mm = require('util/mm.js');

var _user = {
	login  : function(userInfo,resolve,reject){
			_mm.request({
			url		: _mm.getServerUrl('/user/login.do'),
			data	: userInfo,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	logout : function(resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/logout.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	getUserInfo : function(resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/get_user_information.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/update_user_information.do'),
			data	: userInfo,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	//get find user password back question
	getQuestion : function(username ,resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/forget_get_question.do'),
			data	: {
				username : username
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	//get find user password back question
	checkAnswer : function(request , resolve , reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/forget_check_answer.do'),
			data	: request,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	//get find user password back question
	resetPassword : function(request , resolve , reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/forget_reset_password.do'),
			data	: request,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	//get find user password back question
	updatePassword : function(request , resolve , reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/reset_password.do'),
			data	: request,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	register  : function(user,resolve,reject){
			_mm.request({
			url		: _mm.getServerUrl('/user/register.do'),
			data	: user,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	checkLogin : function(resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/get_user_info.do'),
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	// username checked
	checkUsername : function(username,resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/check_valid.do'),
			data	: {
				type: 'username',
				str : username
			},
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	}
}

module.exports = _user;