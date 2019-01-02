/*
* @Author: Administrator
* @Date:   2018-12-31 16:10:08
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-02 22:39:23
*/
/*
* @Author: Administrator
* @Date:   2018-10-24 23:54:21
* @Last Modified by:   product
* @Last Modified time: 2018-11-27 00:18:48
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
	getProductList  : function(listParam,resolve,reject){
			_mm.request({
			url		: _mm.getServerUrl('/product/list.do'),
			data	: listParam,
			method	: 'POST',
			success : resolve,
			error	: reject
		});
	},
	
}

module.exports = _product;