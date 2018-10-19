/*
* @Author: user
* @Date:   2018-06-03 23:48:01
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-19 22:48:40
*/
//cats = require('./cats.js');
'use strict';

var _mm = require('util/mm.js');

_mm.request({
	url: '/product/list.do?categoryId=100002',
	success: function(res){
		console.log(res);
	},
	error: function(err){
		console.log(err);
	}
})