/*
* @Author: user
* @Date:   2018-10-31 22:54:29
* @Last Modified by:   user
* @Last Modified time: 2018-10-31 23:40:51
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        //show the promotion element
    $element.show();
})