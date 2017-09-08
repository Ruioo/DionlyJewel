$('.sort>p span').click(function(){
	if( $(this).parent().next().is(':hidden') ){
		$(this).parent().next().slideToggle(500).siblings('ul').hide();
		$(this).next().css('color','#db3962').parent().siblings('p').find('a').css('color','#000')
		setTimeout(function(){
			$('.sort>ul').each(function(){
				if( $(this).is(':hidden') ){
					$(this).prev().find('span').css('background' , 'url(../image/madeRing/+.jpg) no-repeat left center')
				}else{
					$(this).prev().find('span').css('background' , 'url(../image/madeRing/-.jpg) no-repeat left center')
				}
			})
		},550)
	}
})

$.ajax({
	type : "GET",
	url : 'http://localhost/170901/66/json/gold.json',
	dataType :"json",
	success :function(res){
		var arr = res.list;
		$('.items>div').each(function(){
			var index = $(this).index();
			$(this).append(`<dl><dt><a href="http://localhost/170901/66/html/productInfo.html?g=${index}"><img src="${arr[index].url}" alt=""></a><a href="http://localhost/170901/66/html/productInfo.html?g=${index}">${arr[index].name}</a></dt><dd><p>市场价：￥<span>${arr[index].mPrice}</span></p><p>商城价：￥<span>${arr[index].sPrice}</span></p></dd></dl>`)
		})
		// 翻页按钮
		var pageCount = Math.ceil( arr.length/21 );
		if( pageCount > 9 ){
			$('.flip .ellipsis').eq(1).css('display','block');
			$('.flip li:last').html(pageCount)
		}else{
			$('.flip .ellipsis').eq(1).css('display','none');
		}

		// 价格排序
		$('.priceSort').click(function(){
			var brr = arr;
			var newArr = [];
			$(brr).each(function(){
				var minIndex = 0;
				$(brr).each(function(index){
					if( $(brr)[index].sPrice > $(brr)[minIndex].sPrice ){
						minIndex = index;
					}
				})
				newArr.push($(brr)[minIndex])
				brr.splice(minIndex,1);
			})
			arr = newArr;
			$('.items>div').each(function(index){
				$(this).html('')
				$(this).append(`<dl><dt><a href="http://localhost/170901/66/html/productInfo.html?m=${index}"><img src="${arr[index].url}" alt=""></a><a href="http://localhost/170901/66/html/productInfo.html?${index}">${arr[index].name}</a></dt><dd><p>市场价：￥<span>${arr[index].mPrice}</span></p><p>商城价：￥<span>${arr[index].sPrice}</span></p></dd></dl>`)
			})
		})
		
		$('.flip li').click(function(){
			var num = $(this).index();
			$(this).addClass('currentLi').siblings('li').removeClass('currentLi');
			$('.items>div').each(function(){
				var index = $(this).index();
					index = index + 21*(num-1);
				$(this).html(" ");
				$(this).append(`<dl><dt><a href="http://localhost/170901/66/html/productInfo.html?g=${index}"><img src="${arr[index].url}" alt=""></a><a href="http://localhost/170901/66/html/productInfo.html?${index}">${arr[index].name}</a></dt><dd><p>市场价：￥<span>${arr[index].mPrice}</span></p><p>商城价：￥<span>${arr[index].sPrice}</span></p></dd></dl>`)
			})
		})
	}
})
