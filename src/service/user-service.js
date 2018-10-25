/*
* @Author: Administrator
* @Date:   2018-10-24 23:54:21
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-25 00:11:05
*/

'use strict';

var _mm = require('util/mm.js');


var _user = {
	logout : function(resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/logout.do'),
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
	}
}

module.exports = _user;