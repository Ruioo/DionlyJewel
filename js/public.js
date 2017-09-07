// 导入头部文件
$('header').load('../html/public.html #header',function(){
	// 操作导航栏的隐藏和现显示
	$('.subNav').mouseenter(function(){
		$('.subNavInfo').stop().slideDown(200)
		$(this).find('i').html('&#xe8c9;')
	}).mouseleave(function(){
		$('.subNavInfo').stop().slideUp(50)
		$(this).find('i').html('&#xe8ca;')
	})
	// 从cookie获取数据,如果有就为登录状态,没有为未登录状态
	var data = getCookie('userList');
	if( data.phone ){
		$('#welcomeWord>span').html(data.phone)
		$('#login').hide();
		$('#register').hide();
		$('#leaveLogin').show();
	}else{
		$('#login').show();
		$('#register').show();
		$('#leaveLogin').hide();
	}
	$('#leaveLogin').click(function(){
		removeCookie('userList');
		var data = getCookie('userList');
		if( data.phone ){
			$('#welcomeWord>span').html(data.phone)
			$('#login').hide();
			$('#register').hide();
			$('#leaveLogin').show();
		}else{
			$('#login').show();
			$('#register').show();
			$('#leaveLogin').hide();
		}
	})

})
$('.experienceCenter').load('../html/public.html #experienceCenter',function(){
	//  操作体验中心的一些交互效果
	$('.sites>li').mouseenter(function(){
		var index = $(this).index();
		$(this).css({
			'borderBottom' : '3px solid #8a0003',
			'background' : 'url(../image/public/sitesEnterBg.jpg) no-repeat center bottom'
		}).siblings().css({'borderBottom' : 'none','background':''})

		$('.sitesShow>img').eq(index).addClass('imgActive').siblings().removeClass('imgActive')
		// ajax 请求 json 数据
		$.ajax({
			url : 'http://localhost/170901/66/json/centerSites.json',
			type : 'GET',
			dataType : 'json',
			success : function(res){
				$('.centerSites').html(res.infos[index].centerSite)
				$('.sitesAddress').html(res.infos[index].sitesAddress)
				$('.sitesTime').html(res.infos[index].sitesTime)
				$('.sitesPhone').html(res.infos[index].sitesPhone)
			},
			error : function(res){
				console.log("未请求到json数据");
			}
		})
	})
})
$('.footNav').load('../html/public.html #footNav')
$('.sideBar').load('../html/public.html #sideBar')



