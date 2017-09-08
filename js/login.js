var regPhone = /^\d{11}$/;

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

// 验证手机号和密码
$('.vipLogin input').click(function(){
	var data = getCookie('userList')
	var uphone = data.phone;
	var upwd = data.password;
	if( uphone != $('.phoneNum input').val() ){
		alert('用户名不存在')
	}
	if( uphone == $('.phoneNum input').val() && upwd != $('.password input').val() ){
		alert('密码错误')
	}
	if( uphone == $('.phoneNum input').val() && upwd == $('.password input').val() ){
		var flag = {
			"result" : "ok",
		}
		flag = JSON.stringify(flag)
		setCookie("res",flag)
		location.href = 'http://localhost/170901/66/index.html'
	}
})

