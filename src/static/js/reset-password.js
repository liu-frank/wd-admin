'use strict';

$(function(){
	var goTo = function(time, url){
		$('.reset-pop').show();
		$('.reset-pop-m').append('<p>密码修改成功，<span>'+ time +'秒</span>后跳回首页<br><a href="'+ url +'">返回首页</a></p>');

		setInterval(function(){
			if ( time > 0) {
				time = time - 1;
				$('.reset-pop-m > p > span').text(time + '秒');
			}else{
				window.location.href = url;
			}
		}, 1000);
	};

	goTo(10, 'https://www.baidu.com');
});
