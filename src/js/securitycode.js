/**
* 删除左右两端的空格
* @param str
* @returns
*/
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 判断不为空
 * @param val
 * @returns {Boolean}
 */
function $isNull(val) {
	if (val == null || val == 'null' || val == '') {
		return true;
	} else {
		return false;
	}
}

/**
* 验证码刷新
*/
var valcnt=2;
var ischeckSecurity = false;
function getSecurityCode(type,ctx){
	if ($isNull(trim(ctx))){
		ctx="";
	}
	valcnt++;
	$("#valcode").attr("src",ctx+"/ocjCaptchaImg/"+type+"/"+valcnt);
}

function getSecurityCode1(type,ctx,id){
	if ($isNull(trim(ctx))){
		ctx="";
	}
	valcnt++;
	$("#"+id).attr("src",ctx+"/ocjCaptchaImg/"+type+"/"+valcnt);
}
