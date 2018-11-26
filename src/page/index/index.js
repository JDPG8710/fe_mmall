/*
* @Author: user
* @Date:   2018-06-03 23:48:01
* @Last Modified by:   user
* @Last Modified time: 2018-11-29 00:22:30
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide= require('page/common/nav-side/index.js');
var templateBanner=require('./banner.string')
var _mm = require('util/mm.js');

$(function() {
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var slidey = $('.banner').unslider({
        speed: 500,               //  The speed to animate each slide (in milliseconds)
        delay: 3000,              //  The delay between slide animations (in milliseconds)
        keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        dots: true,               //  Display dot navigation
        fluid: false
    });
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        slidey.data('unslider')[forward]();
    })
});