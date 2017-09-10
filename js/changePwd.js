var regPwd1 = /^\w{6,12}$/,
	regPwd2 = /\d+/g,
	regPwd3 = /[a-z]+/g;
var temp1 = regPwd1.test( $('.newpwd').val() ),
    temp2 = regPwd2.test( $('.newpwd').val() ),
    temp3 = regPwd3.test( $('.newpwd').val() );

$('.change').click(function(){
	var info = getCookie('userList');
	if( $('.newpwd').val() != $('.conpwd').val() ){
		alert('两次密码输入不一致')
		return false;
	}	
	if( info.password != $('.oldpwd').val() ){
		alert('原始密码错误')
		return false;
	}else{
		if( temp1 && temp2 && temp3 ){
			info.password = $('.newpwd').val();
			setCookie('userList',JSON.stringify(info),1000000);
			alert('修改成功')
		}else{
			alert('密码格式有误')
		}
	}
})


