if( location.href.split('?')[1] ){
	var infoArr = location.href.split('?')[1].split('&')
	if( infoArr[0].split('=')[0] != 'carat' ){
		for( var i=0 ; i<infoArr.length ; i++ ){
			if( infoArr[i].split('=')[0] == 'color' ){
				var color = infoArr[i].split('=')[1];
				console.log(color)
				$('.colorItems li').each(function(){
					if( $(this).html().match(color) ){
						$(this).css({
							"color" : "red",
							"fontWeight" : "bold"
						});
					}
				})
			}
			if( infoArr[i].split('=')[0] == 'clarity' ){
				var clarity = infoArr[i].split('=')[1];
				console.log(clarity)

				$('.clarityItems li').each(function(){
					if( $(this).html().match(clarity) ){
						$(this).css({
							"color" : "red",
							"fontWeight" : "bold"
						});
					}
				})
			}
			if( infoArr[i].split('=')[0] == 'polish' ){
				var polish = infoArr[i].split('=')[1];
				console.log(polish)

				$('.polishItems li').each(function(){
					if( $(this).html().match(polish) ){
						$(this).css({
							"color" : "red",
							"fontWeight" : "bold"
						});
					}
				})
			}
		}
	}else{
		var num = parseInt( infoArr[0].split('=')[1] );
		console.log(num)
		$('.caratItems').find('input').eq(0).val( (num/100+0.0).toFixed(2) )
		$('.caratItems').find('input').eq(1).val( (num/100+0.1).toFixed(2) )
	}
}


$('.jewelChooseItems li').click(function(){
	$(this).css({
		"color" : "red",
		'fontWeight' : "bold"
	})
})
