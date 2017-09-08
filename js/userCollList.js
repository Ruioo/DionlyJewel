$('.right').on('click','.del',function(){
	var res = confirm('确认删除吗?')
	if( res ){
		$(this).parent().parent().remove()
	}
})