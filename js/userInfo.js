for( var i=0 ; i<117 ; i++ ){
	$('#birthyear').append(`<option value=${1900+i}>${1900+i}</option>`);
}
for( var i=0 ; i<12 ; i++ ){
	$('#birthmonth').append(`<option value=${i+1}>${i+1}</option>`);
}
for( var i=0 ; i<31 ; i++ ){
	$('#birthday').append(`<option value=${i+1}>${i+1}</option>`);
}

// 提交信息
$('input[type=submit]').click(function(){
	var flagname = false;
	var flagsex = false;
	var flagqq = false;
	var flagweixin = false;
	var flagphone = false;
	var flagmail = false;
	if( $('#name').val() ){
		flagname = true;
	}else{
		alert('名字不能为空')
	}
	if( $('input[type=radio]').eq(0).prop('checked') || $('input[type=radio]').eq(1).prop('checked') ){
		flagsex = true;
	}else{
		alert('请选择性别')
	}
	var regqq = /^\d{1,}$/
	if( regqq.test( $('#qq').val() ) ){
		flagqq = true;
	}else{
		alert('请输入正确的QQ号')
	}
	if( $('#weixin').val() ){
		flagweixin = true;
	}else{
		alert('请输入微信号')
	}
	var regphone = /^1\d{10}$/
	if( regphone.test($('#phone').val()) ){
		flagphone = true;
	}else{
		alert('手机号格式错误')
	}
	var regmail = /^\w+@\w+\.\w+$/
	if( regmail.test($('#mail').val()) ){
		flagmail = true;
	}else{
		alert('请输入正确的邮箱')
	}
	var flag = flagname && flagsex && flagqq && flagweixin && flagphone && flagmail ;
	if(flag){
		alert('提交信息成功')
	}
})