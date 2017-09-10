var arr = getCookie("shopcart");

$(arr).each(function(index){
	var href = 'http://localhost/170901/66/html/productInfo.html?'
	$('.box').append(`<ul class="items">
				<li><a href="${href + $(arr)[index].left}=${$(arr)[index].right}"><img src="${$(arr)[index].src}" alt=""></a></li>
				<li><a href="${href + $(arr)[index].left}=${$(arr)[index].right}">${$(arr)[index].name}</a></li>
				<li>${$(arr)[index].hand}</li>
				<li>${$(arr)[index].words}</li>
				<li>${$(arr)[index].mPrice}</li>
				<li></li>
				<li>${$(arr)[index].sPrice}</li>
				<li><input class="delThis" type="button" value="删除">
					<input type="button" value="修改"></li>
			</ul>`)
})
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

$('.goToPay').click(function(){
	location.href = 'http://localhost/170901/66/html/confirm.html'
})

$('.delThis').click(function(){
	var res = confirm('确认删除吗?')
	if( res ){
		$(this).parent().parent().remove()
		index = $(this).parent().parent().index()-1
		info = getCookie('shopcart')
		info.splice(index,1);
		setCookie('shopcart',JSON.stringify(info),1000000)
	}
})

$('.delAll').click(function(){
	var res = confirm('确认删除吗?')
	if( res ){
		$('.items').remove();
		removeCookie('shopcart')
	}
})