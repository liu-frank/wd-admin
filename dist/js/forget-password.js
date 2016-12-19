'use strict';

$(function(){
	$(document).on('click','.message-code:not(".message-sent")',function(){
		var _this = $(this);
		_this.addClass('message-sent').find('p').html('<span>10</span>秒后可重发');
		var _time = _this.find('p > span').text();
		var _thisInterval = setInterval(function(){
			if ( _time > 0) {
				_time = _time - 1;
				_this.find('p > span').text(_time);
			}else{
				_this.removeClass('message-sent').find('p').html('发送验证码');
				clearInterval(_thisInterval);
			}
		}, 1000);
	});
});
