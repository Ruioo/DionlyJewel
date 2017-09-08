
//存
// function setCookie(key,value,day){
// 	if( day ){
// 		var now = new Date();
// 		now.setDate(now.getDate()+day);
// 		document.cookie = key + "=" + value + ";expires=" + now + ";path=/http://localhost/170901/66";
// 	}else{
// 		document.cookie = key + "=" + value = ";path=/http://localhost/170901/66";
// 	}
// }
function setCookie(name, value, seconds) {
	seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
	var expires = "";
	if ( seconds != 0 ) {      //设置cookie生存时间
		var date = new Date();
		date.setTime(date.getTime()+(seconds*1000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/170901/66";   //转码并赋值
}
//取
function getCookie(key){
	var str = document.cookie;
	if( str ){
		var arr = str.split("; ");
		for (var i = 0 ; i < arr.length ; i++) {
			var item = arr[i].split("=");
			if( item[0] == key ){
				return JSON.parse( item[1] );
			}
		}
		//循环结束后  有cookie。但是没有key，就可以返回一个空数组
		return [];
	}
	//如果没有cookie  也返回一个空数组
	return [];
}
//删除
function removeCookie( key ){
	setCookie( key , "" , -1);
}
