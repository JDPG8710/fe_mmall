/*
* @Author: Administrator
* @Date:   2018-10-24 23:54:21
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-25 00:17:22
*/

'use strict';

var _mm = require('util/mm.js');


var _cart = {
	//get Cart production Count number
	getCartCount : function(resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/user/get_cart_product_count.do'),
			success : resolve,
			error	: reject
		});
	}
}
module.exports = _cart;