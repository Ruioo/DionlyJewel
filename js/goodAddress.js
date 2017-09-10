$('.reset').click(function(){
	$(this).parent().prevAll('p').find('input').val("");
})

$('.submit').click(function(){
	var _json = {
		"name" : $('.person').val(),
		"phone" : $('.phone').val(),
		"city" : $('.city').val(),
		"pro" : $('.pro').val(),
		"add" : $('.add').val()
	}

	setCookie('address',JSON.stringify(_json),1000000)
})


if( getCookie('address') ){
	var info = getCookie('address');
	$('.person').val( info.name )
	$('.phone').val( info.phone )
	$('.city').val( info.city )
	$('.pro').val( info.pro )
	$('.add').val( info.add )
}