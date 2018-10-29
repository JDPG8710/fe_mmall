/*
* @Author: Administrator
* @Date:   2018-10-29 00:33:08
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-29 01:08:16
*/
/*
* @Author: Administrator
* @Date:   2018-10-22 00:16:42
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-25 00:17:38
*/
'user strict';
require('./index.css');

var _mm = require('util/mm.js');

// general page header
var header = {
	init : function(){
		this.bindEvent();
	},
	onload :function(){
		var keyword=_mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	// search result submit
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		else{
			_mm.goHome();
		}
	}
};

header.init();