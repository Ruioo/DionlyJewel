var temp = location.href.split('?')[1];
var ringType = temp.split('=')[0];
var num = parseInt( temp.split('=')[1] );
switch( ringType ){
	case 'f' : urladd = 'http://localhost/170901/66/json/fixRing.json';break;
	case 'm' : urladd = 'http://localhost/170901/66/json/madeRing.json';break;
	case 'g' : urladd = 'http://localhost/170901/66/json/gold.json';break;
}
$.ajax({
	type : "GET",
	url : urladd,
	dataType :"json",
	success :function(res){
		// 放大镜的操作
		var info = res.list[num];
		$('.small>img,.move>img,.big>img').attr('src',info.url);
		$('.list ul').append(`<li><img src=${info.url} alt=""></li>`)
			// 详细产品信息 ↓
		$('.infoBigImg').append(`<img src=${info.url} alt="">`)
		// 从json中获取li的数量
		var count = 1;
		if( eval('info.url'+count) ){
			while( eval('info.url'+count ) ){
				$('.list ul').append(`<li><img src=${eval('info.url'+count)} alt=''></li>`)
					// 详细产品信息 ↓
				$('.infoBigImg').append(`<img src=${eval('info.url'+count)} alt="">`)
				count++;
			}
		}
		$('.list li').click(function(){
			$(this).addClass('currentRedBorder').siblings().removeClass('currentRedBorder')
			$(".big>img,.small>img,.move>img").attr('src',$(this).find('img').attr('src'))
		})
		// 放大镜的左右翻页按钮
		if( $('.list li').size() > 4 ){
			var ins = 0;
			var flag = true;
			$('.pageLeft,.pageRight').show();
			$('.pageRight').click(function(){
				if( -parseInt( $('.list ul').css('left') ) < ($('.list li').size()-4)*90 && flag == true ){
					ins += 90;
					flag = false;
					$('.list ul').animate({'left':-ins},function(){
						flag = true;
					})
				}
			})
			$('.pageLeft').click(function(){
				if( parseInt( $('.list ul').css('left') ) < 0 && flag == true ){
					ins -= 90;
					flag = false;
					$('.list ul').animate({'left':-ins},function(){
						flag = true;
					})
				}
			})
		}
		// 获取商品详情的名称和价格
		$('.proName').html(info.name)
		$('.proMprice').html(info.mPrice)
		$('.proSprice').html(info.sPrice)
		// 钻石材质的按钮的点击样式更改
		$('.material>button').click(function(){
			$(this).addClass('currentButton').siblings().removeClass('currentButton')
		})
		// 获取钻石重量和数量
		$('.subRing .infoNum').html(info.ringNum)
		$('.subRing .infoWeight').html(info.ringWeight)

		// 用循环给 钻石重量select加入option选项
		var weight = 10;
		var html = "";
		while( weight < 170 ){
			html = weight +'-'+ (weight+5) +'分';
			weight += 5;
			if( weight == 45 ){
				$('.ringWeight').append(`<option selected = selected>${html}</option>`)
			}else{
				$('.ringWeight').append(`<option>${html}</option>`)
			}
			
		}	

		// 用循环给 手寸select加入option选项
		var handSize = 4;
		var html = "";
		while( handSize <= 34.5 ){
			$('.handNum').append(`<option>${handSize}</option>`)
			handSize += 0.5;
		}

	}
})

// 放大镜
$(".small").on({
	mouseenter : function(){
		$(".big").show();
		$(".mask").show();
		$(".move").show();
	},
	mouseleave : function(){
		$(".big").hide();
		$(".mask").hide();
		$(".move").hide();
	},
	mousemove : function(e){
		var e = e || event;
		var x = e.pageX - $(".small").offset().left - $(".move").width()/2;
		var y = e.pageY - $(".small").offset().top - $(".move").height()/2;
		var maxL = $(".small").width() - $(".move").width();
		var maxT = $(".small").height() - $(".move").height();
		x =Math.min( maxL , Math.max( 0 ,x ) ); 
		y =Math.min( maxT , Math.max( 0 ,y ) ); 
		$(".move").css({
			left : x , 
			top : y,
		})
		$('.move>img').css({
			left : -x , 
			top : -y,
		})
		var bigImgX = x*$(".big>img").eq(0).width()/$(".small").width();
		var bigImgY = y*$(".big>img").eq(0).height()/$(".small").height();
		
		$(".big>img").css({
			left : -bigImgX,
			top : -bigImgY
		})
	}
})


// 加入购物车	
	
$('.twoButton').on('click','.addShopCar',function(){
	var arr = [];
	var _json = {
		"src" : $('.move>img').attr('src'),
		"name" : $('.proName').html(),
		"hand" : $('.handNum').val(),
		"words" : $('.lettering input').val(),
		"mPrice" : $('.proMprice').html(),
		"sPrice" : $('.proSprice').html()
	}
	var info = getCookie('shopcart')
	if( info.length != 0 ){
		arr = info;
	}
	arr.push(_json);
	setCookie("shopcart",JSON.stringify(arr),1000000);
	alert('加入购物车成功')
})