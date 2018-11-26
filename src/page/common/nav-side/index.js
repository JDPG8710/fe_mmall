/*
* @Author: Administrator
* @Date:   2018-10-22 00:16:42
* @Last Modified by:   user
* @Last Modified time: 2018-11-27 00:07:14
*/
'user strict';
require('./index.css');

var _mm             = require('util/mm.js');
var templateIndex   = require('./index.string');

var navSide = {
    option :{
        name: '',
        navList : [
            {name:'user-center' , desc : '个人中心', href : './user-center.html'},
            {name:'order-list' , desc : '我的订单', href : './order-list.html'},
            {name:'user-pass-update' , desc : '修改密码', href : './user-pass-update.html'},
            {name:'about' , desc : '关于MMall', href : './about.html'}
        ]          
    },
    init : function(option){
        //combine option
        $.extend(this.option,option);
        this.renderNav();
    },
    renderNav : function(){
        // calculate active data
        for(var i = 0, iLength = this.option.navList.length; i<iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        //render list data
        var navHtml = _mm.renderHtml(templateIndex , {
            navList : this.option.navList
        });
        // put the html into the container
        $('.nav-side').html(navHtml);
    }
};

module.exports = navSide;