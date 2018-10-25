/*
* @Author: Administrator
* @Date:   2018-10-07 00:14:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-21 00:14:43
*/

'use strict';

var Hogan = require('hogan');

var conf = {
	serverHost : ''
};

var _mm = {
	request : function(param){
		var _this = this;
		$.ajax({
			type     : param.method || 'get',
			url      : param.url    || '',
			dataType : param.type   || 'json',
			data     : param.data   || '',
			success  : function(res){
				//请求成功
				if(0 === res.status){
					typeof param.success === 'function' && param.success(res.data,res.msg);

				}
				//跳转至登录页面
				else if(10 === res.status){
					_this=doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}

			},	
			error    : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},	
	//get Server address
	getServerUrl :  function(path){
		return conf.serverHost + path;
	},
	//get Server Parameter
	getUrlParam  : function (name){
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//render html
	renderHtml : function (htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate);
		var result   = template.render(data);
		return result;
	},
	//tips success
	successTips : function(msg){
		alert(msg || "Operation Successfully!");
	},
	//tips failed
	errorTips : function(msg){
		alert(msg || "Operation failed");
	},
	//field validation
	//cell number or mailaddress validation
	validate : function(val,type){
		var value = $.trim(value);
		if('require' === type){
			return !!value;
		}
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		if('email' === type){
			return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
		}
	},
	//login function
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href); 
	},
	//back to homePage
	goHomePage : function(){
		window.location.href = './index.html';
	}
}

module.exports = _mm
