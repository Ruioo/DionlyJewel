$('.right').on('click','.del',function(){
	var res = confirm('确认删除吗?')
	if( res ){
		$(this).parent().parent().remove()
		index = $(this).parent().parent().index() - 2
		info = getCookie('collection')
		info.splice(index,1);
		setCookie('collection',JSON.stringify(info),1000000)
	}

})

if( getCookie('collection') ){
	var info = getCookie('collection')
	var href = 'http://localhost/170901/66/html/productInfo.html?'
	$(info).each(function(index){
		$('.right').append(`<ul class="items"><li><a href="${href + $(info)[index].left}=${$(info)[index].right}"><img src="${$(info)[index].src}" alt=""></a></li>
					<li><a href="${href + $(info)[index].left}=${$(info)[index].right}">${$(info)[index].name}</a></li>
					<li>${$(info)[index].time}</li>
					<li>
						<input class="del" type="button" value="删除">
					</li></ul>`)
	})
	
}


