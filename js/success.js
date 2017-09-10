$('.otherPay').click(function(){
	$('#otherPay').toggle()
})
var href = location.href.split('?')[1].split('&')
var order = href[0].split('=')[1]
var money = href[1].split('=')[1]

$('.main p:eq(1)').find('span').eq(0).html(order)
$('.main p:eq(1)').find('span').eq(1).html(money)
$('.main p:eq(1)').find('span').eq(3).html(money)

