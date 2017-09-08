// 导入头部文件
$('header').load('html/public.html #header',function(){
	// 操作导航栏的隐藏和现显示
	$('.subNav').mouseenter(function(){
		$('.subNavInfo').stop().slideDown(200);
		$(this).find('i').html('&#xe8c9;');
	}).mouseleave(function(){
		$('.subNavInfo').stop().slideUp(50);
		$(this).find('i').html('&#xe8ca;');
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
$('.experienceCenter').load('html/public.html #experienceCenter',function(){
	//  操作体验中心的一些交互效果
	$('.sites>li').mouseenter(function(){
		var index = $(this).index();
		$(this).css({
			'borderBottom' : '3px solid #8a0003',
			'background' : 'url(../66/image/public/sitesEnterBg.jpg) no-repeat center bottom'
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
$('.footNav').load('html/public.html #footNav')
$('.sideBar').load('html/public.html #sideBar',function(){
	// 蒙层的高度
	$('.bodyMask').css('height',$('body').height());
	// 切换城市
	$('.changesites button').click(function(){
		$(this).parent().parent().fadeOut(500);
		$('.bodyMask').fadeOut(500);
	})
	$('#locationChange').click(function(){
		console.log(1)
		$('.bodyMask').fadeIn(500);
		$('.changesites').fadeIn(500);
	})
	$('.changesites li').click(function(){
		$(this).parent().parent().fadeOut(500);
		$('.bodyMask').fadeOut(500);
		$('#loactionTxt').html( $(this).html() )
	})
})

// 轮播图
var index = 0;
function bannerChange(){
	index++;
	index = index >= $('.bannerImg>li').size() ? 0 : index;
	$('.bannerList>li').eq(index).addClass('bannerListShow').siblings().removeClass('bannerListShow');
	$(".bannerImg>li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
}

$('.bannerList>li').click(function(){
	$(this).addClass('bannerListShow').siblings().removeClass('bannerListShow');
	index = $(this).index()-1;
	bannerChange()
})

bannerTimer = setInterval(bannerChange,3000);
$('.banner').mouseenter(function(){
	clearInterval(bannerTimer);
}).mouseleave(function(){
	bannerTimer = setInterval(bannerChange,3000);
})

// 点击参数选取裸钻
$('.part2>div>div>button').click(function(){
	$(this).addClass('buttonCurrent').siblings().removeClass('buttonCurrent')
})

// 点击搜索裸钻
$('#bareRingSearch').click(function(){
	if( $('.color').find('.buttonCurrent') ){
		var color = $('.color').find('.buttonCurrent').val(); 
	}
	if( $('.polish').find('.buttonCurrent') ){
		var polish = $('.polish').find('.buttonCurrent').val(); 
	}
	if( $('.clarity').find('.buttonCurrent') ){
		var clarity = $('.clarity').find('.buttonCurrent').val(); 
	}
	var hrefAdd = `?color=${color}&polish=${polish}&clarity=${clarity}`
	location.href = `http://localhost/170901/66/html/bareJewel.html${hrefAdd}`;
})

