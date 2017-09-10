var arr = getCookie("shopcart");
// 从cookie获取购物车数据
$(arr).each(function(index){
	$('.box').append(`<ul class="items">
				<li><img src="${$(arr)[index].src}" alt=""></li>
				<li>${$(arr)[index].name}</li>
				<li>${$(arr)[index].hand}</li>
				<li>${$(arr)[index].words}</li>
				<li>${$(arr)[index].mPrice}</li>
				<li></li>
				<li>${$(arr)[index].sPrice}</li>
			</ul>`)
})

// 结算的数据
var mprice = 0,
	price = 0,
	sprice = 0;
$('.items').each(function(){
	var num = $(this).find('li').eq(4).html() - $(this).find('li').eq(6).html()
	$(this).find('li').eq(5).html(num.toFixed(2));
	mprice += parseInt( $(this).find('li').eq(4).html() )
	price += parseInt( $(this).find('li').eq(5).html() )
	sprice += parseInt( $(this).find('li').eq(6).html() )
})
$('.count>p:first>span').html( $('.box').find('.items').size() )
$('.count>p:last>span:first').html( mprice.toFixed(2) )
$('.count>p:last>span:eq(1)').html( price.toFixed(2) )
$('.count>p:last>span:last').html( sprice.toFixed(2) )

// 收货地址单选的操作
$('.adrInfo').click(function(){
	$(this).next().next().show();
	$(this).siblings('.adrInfo').next().next().hide()
})
//  支付方式单选的操作
$('.payType').click(function(){
	if( $(this).index() == 4 ){
		$('.payInfo').show()
	}else{
		$('.payInfo').hide()
	}
})

// 通过网址传值 传递
var count = 1
$('.success').click(function(){
	$('.phone').each(function(){
		var reg = /^\d{11}$/
		if( reg.test( $(this).val() ) ){
			var day = new Date();
			// 判断是否过了一天,编号重新来过
			if( day.getHours() == 0 && day.getMinutes() == 0 && day.getSeconds() == 0 ){
				count = 0;
			}
			day = day.toLocaleDateString()
			count++;
			day = day + '-' + count;
			var p1 = $('.count>p:last>span:last').html()
			location.href = 'http://localhost/170901/66/html/success.html?day='+day+'&money='+p1;
			
			// 储存cookie信息 联系到订单页面
			var arr = [];
			var _json = {
				"id" : day,
				"day" : new Date().toLocaleDateString(),
				"pay" : p1
			}
			var info = getCookie('order')
			if( info.length != 0 ){
				arr = info;
			}
			arr.push(_json);
			setCookie("order",JSON.stringify(arr),1000000);

			return false;
		}else{
			alert('请输入正确手机号码');
			return false;
		}

		
	})

})

// 从cookie获取个人收货地址的资料
if( getCookie('address') ){
	var info = getCookie('address');
	$('.person').val( info.name )
	$('.phone').val( info.phone )
}
