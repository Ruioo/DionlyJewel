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
	url : 'http://localhost/170901/66/json/fixRing.json',
	dataType :"json",
	success :function(res){
		var arr = res.list;
		$('.items>div').each(function(){
			var index = $(this).index();
			$(this).append(`<dl><dt><a href="http://localhost/170901/66/html/productInfo.html?f=${index}"><img src="${arr[index].url}" alt=""></a><a href="http://localhost/170901/66/html/productInfo.html?f=${index}">${arr[index].name}</a></dt><dd><p>市场价：￥<span>${arr[index].mPrice}</span></p><p>商城价：￥<span>${arr[index].sPrice}</span></p></dd></dl>`)
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
				$(this).append(`<dl><dt><a href="http://localhost/170901/66/html/productInfo.html?f=${index}"><img src="${arr[index].url}" alt=""></a><a href="http://localhost/170901/66/html/productInfo.html?${index}">${arr[index].name}</a></dt><dd><p>市场价：￥<span>${arr[index].mPrice}</span></p><p>商城价：￥<span>${arr[index].sPrice}</span></p></dd></dl>`)
			})
		})

		//筛选
		$('.menus>div').not('.menusChoose').find('li').click(function(){
			var index = $(this).parent().parent().index();
			$(this).parent().parent().hide();
			$('.menusChoose ul').prepend(`<li><span>${$(this).html()}</span><input class=${index} type="button" value="x"></li>`)
			$('.menusChoose').css('display','flex')
		})
		
		$('.menusChoose').on('click','input',function(){
			var index = parseInt( $(this).attr('class') )
			$(this).parent().remove()
			$('.menus>div').eq(index).show()
			if( $('.menusChoose').find('li').length==0 ){
				$('.menusChoose').hide()
			}
		})
		// 清除所有
		$('.menusChoose').on('click','.clearAll',function(){
			$(this).prevAll('li').find('input').each(function(index,ele){
				var index = parseInt( $(ele).attr('class') )
				console.log($(ele).attr('class'))
				$('.menus>div').eq(index).show()
			})
			$(this).prevAll('li').remove()
			$(this).parent().parent().hide()
			if( $('.menusChoose').find('li').length==0 ){
				$('.menusChoose').hide()
			}
		})

		// 左边sort筛选
		$('.sort ul:eq(0)').find('li').click(function(){
			var that = $(this)
			var index = 0;
			$('.menus li').each(function(){
				if( $(this).html() == that.html() ){

					$(this).parent().parent().hide();
					index = $(this).parent().parent().index();
				}
			})
			$('.menusChoose ul').prepend(`<li><span>${$(this).html()}</span><input class=${index} type="button" value="x"></li>`)
			$('.menusChoose').css('display','flex')
		})

	}
})
