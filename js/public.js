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
	var flag = getCookie('res');

	if( data.phone && flag.result == "ok" ){
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
		var flag = {
			"result" : "no",
		}
		flag = JSON.stringify(flag)
		setCookie("res",flag)
		location.reload();
		$('#login').show();
		$('#register').show();
		$('#leaveLogin').hide();
		$('#welcomeWord>span').html('你好')
	})
	//  搜索按钮
	$('.searchBtn').click(function(){
		var url = `http://localhost/170901/66/html/search.html?key=${$('.searchIpt').val()}`;
		url=encodeURI(url); 
		location.href = url;
	})
	$('.keyword>li').click(function(){
		var url = `http://localhost/170901/66/html/search.html?key=${$(this).html()}`;
		url=encodeURI(url); 
		location.href = url;
	})
	// 判断我的个人信息和购物车是否可以点开
	$('#personInfo').click(function(){
		var flag = getCookie('res');
		if( flag.result == 'ok' ){
			location.href = 'http://localhost/170901/66/html/user.html'
		}else{
			location.href = 'http://localhost/170901/66/html/login.html'
		}
	})
	$('#jewelryBox').click(function(){
		var flag = getCookie('res');
		if( flag.result == 'ok' ){
			location.href = 'http://localhost/170901/66/html/cart.html'
		}else{
			location.href = 'http://localhost/170901/66/html/login.html'
		}
	})
	// 实时显示珠宝箱里面的数量
	var shopcart = getCookie('shopcart')
	if( parseInt( shopcart.length ) >= 1 ){
		$('#jewelryBoxCount').html( shopcart.length )
	}
	
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
$('.sideBar').load('../html/public.html #sideBar',function(){
	// 蒙层的高度
	$('.bodyMask').css('height',$('body').height())
	// 切换城市
	$('.changesites button').click(function(){
		$(this).parent().parent().fadeOut(500);
		$('.bodyMask').fadeOut(500);
	})
	$('#locationChange').click(function(){
		$('.bodyMask').show();
		$('.changesites').fadeIn(500);
	})
	$('.changesites li').click(function(){
		$(this).parent().parent().fadeOut(500);
		$('.bodyMask').fadeOut(500);
		$('#loactionTxt').html( $(this).html() )
	})

	// nav 传值到 madeRing
	$('.madeRingNav li,.madeRingNav h6').click(function(){
		var url = 'http://localhost/170901/66/html/madeRing.html?name='+$(this).html();
		url=encodeURI(url); 
		location.href = url;
	})
	// nav 传值到 gold
	$('.goldNav li,.goldNav h6').click(function(){
		var url = 'http://localhost/170901/66/html/gold.html?name='+$(this).html();
		url=encodeURI(url); 
		location.href = url;
	})

})



