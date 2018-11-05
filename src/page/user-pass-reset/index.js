/*
* @Author: user
* @Date:   2018-06-30 12:17:18
* @Last Modified by:   user
* @Last Modified time: 2018-11-06 00:36:07
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
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init      : function(){
        this.onload();
        this.bindEvent();
    },
    onload    : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        //click username next button event
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入用户名！');
            }
        });
        // enter key keyup event
        $('.user-content').keyup(function(e){
            if(e.keyCode===13){
                _this.submit();
            }
        })
         //click password next button event
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //密码提示问题答案
            if(answer){
                //check the secret quesiton exists
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadSteppassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入密码提示问题的答案！');
            }
        });
        //click password next button event
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //密码提示问题答案
            if(password && password.length>6){
                //check the secret quesiton exists
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token
                },function(res){
                    window.location.href= "./result.html?type=pass-reset";
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        // enter key keyup event
        $('.user-content').keyup(function(e){
            if(e.keyCode===13){
                _this.submit();
            }
        })
    },   
    //load the first step of find my password
    loadStepUsername : function(){
        $('.step-username').show();
    },
    //load the second step of find my password
    loadStepQuestion : function(){
        //clear error msg
        formError.hide();
        // shift the container
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    //load the third step of find my password
    loadSteppassword : function(){
        //clear error msg
        formError.hide();
        // shift the container
        $('.step-question').hide()
        .siblings('.step-password').show();
    }
}
$(function(){
    page.init();
})