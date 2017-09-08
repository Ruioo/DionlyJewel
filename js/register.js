var regPhone = /^\d{11}$/,
	regMes = /^\d{6}$/,
	regPwd1 = /^\w{6,12}$/,
	regPwd2 = /\d+/g,
	regPwd3 = /[a-z]+/g;
var nameFlag,mesFlag,idenFlag,pwdFlag,cPwdFlag,agreeFlag;
// 手机号码验证
$('.phoneNum input').blur(function(){
	if( regPhone.test( $('.phoneNum input').val() ) ){
		nameFlag = true;
		$('.phoneNum .tips').html('');
	}else{
		$('.phoneNum .tips').html('请输入11位数字');
		$('.phoneNum input').val("");
	}
})

// 短信验证
$('.messTxt').blur(function(){
	if( regMes.test( $('.messTxt').val() ) ){
		mesFlag = true;
		$('.messageConfirm .tips').html('');
	}else{
		$('.messageConfirm .tips').html('请输入6位数字');
		$('.messTxt').val("");
	}
})

// 验证码
$('.idencode').blur(function(){
	if( $('.idencode').val().toLowerCase() == $('#numChange').html().toLowerCase() ){
		$('.idenCode .tips').html('');
		idenFlag = true;
	}else{
		$('.idenCode .tips').html('输入错误,请重新输入');
		$('.idencode').val("");
	}
})
// 密码
$('.password input').blur(function(){
	var temp1 = regPwd1.test( $('.password input').val() );
	var temp2 = regPwd2.test( $('.password input').val() );
	var temp3 = regPwd3.test( $('.password input').val() );
	if( temp1 && temp2 && temp3 ){
		pwdFlag = true;
		$('.password .tips').html(' ');
	}else{
		$('.password .tips').html('请输入6到20位,包含数字和字符');
		$('.password input').val("");
		$('.confirmPwd input').val("");
	}
})

// 确认密码
$('.confirmPwd input').blur(function(){
	if( $('.password input').val() == $('.confirmPwd input').val() ){
		cPwdFlag = true;
		$('.confirmPwd .tips').html("");
	}else{
		$('.confirmPwd .tips').html("密码不一致");
		$('.confirmPwd input').val("");
		$('.confirmPwd input').val("");
	}
})

$('#vipRegister').click(function(){
	// 协议
	if( $('.agreeAgreement input').prop('checked') ){
		agreeFlag = true;
	}else{
		alert('请同意双方协议')
	}

	// 存储cookie
	if( nameFlag==true && mesFlag==true && idenFlag==true && pwdFlag==true && cPwdFlag==true && agreeFlag==true ){
		var userInfo = {
			"phone" : $('.phoneNum input').val(),
			"password" : $('.password input').val()
		}
		userInfo = JSON.stringify(userInfo);
		setCookie("userList",userInfo,1000000)
		location.href = "http://localhost/170901/66/html/login.html"
	}
})
