/*
* @Author: user
* @Date:   2018-06-30 12:17:18
* @Last Modified by:   user
* @Last Modified time: 2018-11-04 22:48:05
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');

//form error promotion
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page codes
var page ={
    init      : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //validate username if exists
        $('#username').blur(function(){
            var username = $.trim($(this).val());

            // 如果用户名为空，我们不做验证
            if(!username){
                formError.hide();
                return;
            }
            // sychronize validate the user name if existed
            _user.checkUsername(username,function(res){
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        $('#submit').click(function(){
            _this.submit();
        });
        // enter key keyup event
        $('.user-content').keyup(function(e){
            if(e.keyCode===13){
                _this.submit();
            }
        })
    },
    // submit form
    submit    : function(){
        var formData = {
                username        : $.trim($('#username').val()),
                password        : $.trim($('#password').val()),
                passwordConfirm : $.trim($('#password-confirm').val()),
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#mailAddress').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val())
            },
            //form validate Result
            validateResult = this.formValidate(formData);
        if(validateResult.status){
            //submit
            _user.register(formData,function(res){
                window.location.href = './result.html??type=register';
            },  function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //validate failed
            formError.show(validateResult.msg);
        }
    },
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6 ){
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }        
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号码格式不正确';
            return result;
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }        
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }        
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题的答案不能为空';
            return result;
        }
        // passed the validate and return correct result
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
}
$(function(){
    page.init();
})