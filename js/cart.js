var arr = getCookie("shopcart");
// console.log(arr)
$(arr).each(function(index){
	// console.log(index)
	$('.box').append(`<ul class="items">
				<li><img src="${$(arr)[index].src}" alt=""></li>
				<li>${$(arr)[index].name}</li>
				<li>${$(arr)[index].hand}</li>
				<li>${$(arr)[index].words}</li>
				<li>${$(arr)[index].mPrice}</li>
				<li></li>
				<li>${$(arr)[index].sPrice}</li>
				<li><input type="button" value="删除">
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