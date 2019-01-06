/*
* @Author: user
* @Date:   2019-01-06 18:46:46
* @Last Modified by:   user
* @Last Modified time: 2019-01-06 19:46:53
*/
'use strict';

require('./index.css');
var templatePagination = require('./index.string');
var _mm                = require('util/mm.js');

var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    //event process
    $(document).on('click', '.pg-item', function(){
        var $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return ;
        }
        typeof _this.option.onSelectPage ==='function' 
            ? _this.option.onSelectPage($this.data('value')) : null;
    })
}
// render the pagination items
Pagination.prototype.render = function(userOption){
    this.option = $.extend({}, this.defaultOption, userOption);
    // judge if the container is legal jQuery object
    if(!(this.option.container instanceof jQuery)){
        return;
    }
    if(this.option.pages <= 1){
       return; 
    }
    this.option.container.html(this.getPagenationHtml());
}

// get pagination html
Pagination.prototype.getPagenationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        start       = this.option.pageNum - option.pageRange > 0 
        ? (this.option.pageNum - option.pageRange) : 1,
        end         = this.option.pageNum + option.pageRange < option.pages
        ? (this.option.pageNum + option.pageRange) : option.pages;

    pageArray.push({
        name    : '上一页',
        value   : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    })
    for(var i = start ; i <= end; i++){
        pageArray.push({
            name    : i,
            value   : i,
            active  : (i === option.pageNum),
        });
    }
    pageArray.push({
        name    : '下一页',
        value   : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination,{
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;