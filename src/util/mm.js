/*
* @Author: Administrator
* @Date:   2018-10-07 00:14:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-07 15:09:11
*/

'use strict';

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
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href); 
	}
}

module.exports = _mm
