/*
* @Author: user
* @Date:   2018-11-06 23:29:50
* @Last Modified by:   user
* @Last Modified time: 2018-11-27 00:21:06
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide= require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
var _user  = require('service/user-service.js');

// page codes
var page ={
    init   : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name: 'user-pass-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.btn-submit', function(){
            var passInfo = {
                password       :     $.trim($('#password').val()),
                passwordNew       :     $.trim($('#password-new').val()),
                passwordConfirm    :     $.trim($('#password-confirm').val())
            },
            validateResult = _this.formValidate(passInfo);
            if(validateResult.status){
                // change user password
                _user.updatePassword({
                    passwordOld : passInfo.password,
                    passwordNew : passInfo.passwordNew
                }, function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './result.html';
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg= '新密码不能为空并且不能小于6位字符'
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '当前密码不能为空';
            return result;
        }
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致！';
            return result;
        }
        // passed the validate and return correct result
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});