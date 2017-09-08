var name = location.href;
name = decodeURI(name)
name = decodeURI(name)

var type = name.split('?')[1].split('=')[1];
var key = name.split('?')[1].split('=')[1];
$('.path .key').html(type);
console.log(key)
$.ajax({
	type : "GET",
	url : 'http://localhost/170901/66/json/madeRing.json',
	dataType :"json",
	success :function(res){
		var arr = res.list;
		var brr = arr;
		var newArr = [];
		$(brr).each(function(index,ele){
			if( $(this)[0].name.match(key) ){
				newArr.push($(this)[0])
			}
		})
		arr = newArr;
		$('.items>div').each(function(index){
			$(this).html('')
			console.log(arr)
			$(this).append(`<dl><dt><a href="http://localhost/170901/66/html/productInfo.html?m=${index}"><img src="${arr[index].url}" alt=""></a><a href="http://localhost/170901/66/html/productInfo.html?${index}">${arr[index].name}</a></dt><dd><p>市场价：￥<span>${arr[index].mPrice}</span></p><p>商城价：￥<span>${arr[index].sPrice}</span></p></dd></dl>`)
		})
	}
});