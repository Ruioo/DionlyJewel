if( getCookie('order')[0] != "" ){
	var arr = getCookie('order')
	$(arr).each(function(index){
		$('.allOrder').append(`<ul>
						<li>${$(arr)[index].id}</li>
						<li>${$(arr)[index].day}</li>
						<li>0.00元</li>
						<li>${$(arr)[index].pay}</li>
						<li>已提交</li>
						<li>支付</li>
					</ul>`)
	})
}
