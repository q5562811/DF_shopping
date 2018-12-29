var NUM = "0123456789";
var SALPHA = "abcdefghijklmnopqrstuvwxyz";
var ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+SALPHA;
//var EMAIL = "!#$%&*+-./=?@^_`{|}"+NUM+ALPHA;
var NONIDABLE = "'~!@#$%^&*()_+|`-=:;<>?,./≠∝≮≯≤≥∞＆∵";
var PASSWORD = "!@.#,$%^*&_-" + ALPHA + NUM;
var ERRORMSG = "";
var RESIDENT_18No = ALPHA+SALPHA+NUM;
var NAMERULE = NUM+ALPHA+SALPHA;
var INTERNETID = NUM+ALPHA+SALPHA+"-_";
var reg =/^((\+86)|(86))?(1)\d{10}$/;//手机号

$(document).ready(function() {
	$('#cust_name').focus(function(){
		$('#checkName').attr('class','tips');
		setHtml('checkName','2-4个中文字符');
	});
	$('#internet_Id').focus(function(){
		$('#checkId').attr('class','tips');
		setHtml('checkId','4-12个字符，可由英文、数字及“_”、“-”组成');
	});
	$('#pwd').focus(function(){
		$('#checkPwd').attr('class','tips');
		setHtml('checkPwd','6-20个字符，由英文和数字组成');
	});
	$('#confirm_pwd').focus(function(){
		$('#checkPwd2').attr('class','tips');
		setHtml('checkPwd2','请再次输入密码');
	});
//	$('#mail1').focus(function(){
//		 $('#mail').attr('class','tips');
//		 setHtml('mail','请输入常用邮箱，可用于找回密码、接受订单通知等');
//	});
//	$('#mail2').focus(function(){
//		 $('#mail').attr('class','tips');
//		 setHtml('mail','请输入常用邮箱，可用于找回密码、接受订单通知等');
//	});
	
	$('#mail3').focus(function(){
	 $('#mail').attr('class','tips');
	 setHtml('mail','请输入常用邮箱，可用于找回密码、接受订单通知等');
});
	
	$('#mail').focus(function(){
	 $('#mail').attr('class','tips');
	 setHtml('mail','请输入常用邮箱，可用于找回密码、接受订单通知等');
});
	
	
	if($('#recommend_id').val()==""){
		//$('#recommend_id').val("可不填");
		$('#recommend_id').css('color','#999999');
	}
	if($('#mobile').val()==""){
		//$('#mobile').val("可不填");
		$('#mobile').css('color','#999999');
	}
	$('#recommend_id').focus(function(){
		var recommend_idval = $('#recommend_id').val();
		if(recommend_idval=="" || recommend_idval=="可不填"){
			$('#recommend_id').css('color','#000000');
			$('#recommend_id').val("");
		};
	});
	$('#mobile').focus(function(){
		var recommend_idval = $('#mobile').val();
		if(recommend_idval=="" || recommend_idval=="可不填"){
			$('#mobile').css('color','#000000');
			$('#mobile').val("");
		};
	});
	$('#recommend_id').blur(function(){
		var recommend_idval = $('#recommend_id').val();
		if(recommend_idval=="" || recommend_idval=="可不填"){
			$('#recommend_id').css('color','#999999');
			//$('#recommend_id').val("可不填");
		};
	});
	$('#mobile').blur(function(){
		var recommend_idval = $('#mobile').val();
		if(recommend_idval=="" || recommend_idval=="可不填"){
			$('#mobile').css('color','#999999');
			//$('#mobile').val("可不填");
		};
	});
	$('#cust_name_tv').focus(function(){
		$('#checkNameTv').attr('class','tips');
		setHtml('checkNameTv','2-4个中文字符');
	});
	$('#resident_No').focus(function(){
		$('#checkCardId').attr('class','tips');
		setHtml('checkCardId','请输入有效身份证号码');
	});
	$('#tel_Tv2').focus(function(){
		$('#checktel_Tv2').attr('class','tips');
		setHtml('checktel_Tv2','请输入有效电话号码');
	});
});


function internetIdBlur(ctx){
	getSecurityCode('text',ctx);
	checkSecurityNum(ctx);
}

/**
*
* @returns {Boolean}
*/
function checkCustName(){
	var name = $('#cust_name').val();
	if ($isNull(trim(name))){
		$('#checkName').attr('class','tips_e');
		setHtml('checkName','请输入姓名');
		return false;
	}
	if (!CheckTypeName(name,NAMERULE) || name.length <= 1){
		$('#checkName').attr('class','tips_e');
		setHtml('checkName','请输入您的真实姓名');
		return false;
	}
	if (name.length < 2 || name.length > 4){
		$('#checkName').attr('class','tips_e');
		setHtml('checkName','姓名长度2-4位');
		return false;
	}else{
		$('#checkName').attr('class','');
		setHtml('checkName','');
		return true;
	}
}

function checkCustNameTv(){
	var name = $('#cust_name_tv').val();
	if ($isNull(trim(name))){
		$('#checkNameTv').attr('class','tips_e');
		setHtml('checkNameTv','请输入姓名');
		return false;
	}
	if (!CheckTypeName(name,NAMERULE) || name.length <= 1){
		$('#checkNameTv').attr('class','tips_e');
		setHtml('checkNameTv','请输入您的真实姓名');
		return false;
	}
	if (name.length < 2 || name.length > 4){
		$('#checkNameTv').attr('class','tips_e');
		setHtml('checkNameTv','姓名长度2-4位');
		return false;
	}else{
		$('#checkNameTv').attr('class','');
		setHtml('checkNameTv','');
		return true;
	}
}

var isPassCutName = false;
function checkInternetId(ctx){
	var result = true;
	var internet_Id = $('#internet_Id').val().toLowerCase();
	if($isNull(trim(internet_Id))){
		$('#checkId').attr('class','tips_e');
		setHtml('checkId','请输入用户名');
		return;
	}
	if(!CheckType(internet_Id, INTERNETID)) {
		$('#checkId').attr('class','tips_e');
		setHtml('checkId','您输入的用户名错误');
		return;
	}
	if(CheckType(internet_Id,NUM)) {
		$('#checkId').attr('class','tips_e');
		setHtml('checkId','用户名不支持全数字');
		return;
	}
	if (internet_Id.length < 4 || internet_Id.length > 12){
		$('#checkId').attr('class','tips_e');
		setHtml('checkId','用户名长度为4-12个字符');
		return;
	}
	setHtml('checkId','正在检查，请稍等...');
	$('#checkId').attr('color','blue');
	$.ajax({
		type : "POST",
		url : ctx+"/customers/fieldCheck", 
		data : {
			"action": "internet_Id",
			"internet_Id":internet_Id
		},
		success : function(msg) {
			if(msg == "0"){
				$('#checkId').attr('class','');
				setHtml('checkId','');
				ischeckSecurity = true;
				isPassCutName = true;
			} else {
				$('#checkId').attr('class','tips_e');
				setHtml('checkId','该用户名已被占用');
				isPassCutName = false;
			}
		}
	});
}
/**
*
* @returns {Boolean}
*/
function checkPwd(){
	var pwd = $('#password').val();
	var internet_Id = $('#internet_Id').val();
	if($isNull(trim(pwd))){
		$('#checkPwd').attr('class','tips_e');
		setHtml('checkPwd','请输入密码');
		return false;
	}
	if(pwd.length < 4||pwd.length > 20){
		$('#checkPwd').attr('class','tips_e');
		setHtml('checkPwd','密码长度为4-20个字符');
		return false;
	}
	if(!getResult(pwd)){
		$('#checkPwd').attr('class','tips_e');
		setHtml('checkPwd','该密码比较简单，有被盗风险，建议您改为字母+数字的密码');
		return false;
	}
	var checkRegex = new RegExp("^((?=.*\\W)|(?=.*\_)).*$", "g");
	if (checkRegex.test(pwd)) {
		$('#checkPwd').attr('class','tips_e');
		setHtml('checkPwd','密码只能由字母和数字组成');
		return false;
    }
	if (pwd == internet_Id){
		$('#checkPwd').attr('class','tips_e');
		setHtml('checkPwd','用户名和密码不能相同');
		return false;
	}else{
		$('#checkPwd').attr('class','');
		setHtml('checkPwd','');
		return true;
	}
}

/**
*
* @returns {Boolean}
*/
function checkConfirmPwd(){
	var pwd = $('#password').val();
	var confirm_pwd = $('#confirm_pwd').val();
	var internet_Id = $('#internet_Id').val();
	if($isNull(trim(confirm_pwd))){
		$('#checkPwd2').attr('class','tips_e');
		setHtml('checkPwd2','请输入确认密码');
		return false;
	}
	if(confirm_pwd.length < 4||confirm_pwd.length > 20){
		$('#checkPwd2').attr('class','tips_e');
		setHtml('checkPwd2','确认密码长度为4-20个字符');
		return false;
	}
	if(!getResult(confirm_pwd)){
		$('#checkPwd2').attr('class','tips_e');
		setHtml('checkPwd2','该密码比较简单，有被盗风险，建议您改为字母+数字的密码');
		return false;
	}
	if (confirm_pwd == internet_Id){
		$('#checkPwd2').attr('class','tips_e');
		setHtml('checkPwd2','用户名和确认密码不能相同');
		return false;
	}
	if (pwd != confirm_pwd){
		$('#checkPwd2').attr('class','tips_e');
		setHtml('checkPwd2','密码输入不一致，请重新确认');
		return false;
	}else{
		$('#checkPwd2').attr('class','');
		setHtml('checkPwd2','');
		return true;
	}
}
var isPassMail = false;
function checkMail(ctx){
	checkSecurityNum(ctx);
//	var mail1 = $('#mail1').val();
//	var mail2 = $('#mail2').val();
	var mail3 = $('#mail3').val();
	if($isNull(trim(mail3))){
		$('#mail').attr('class','tips_e');
		setHtml('mail','请输入邮箱');
		return;
	}
	 if(mail3.split(".").length==1){
	 	$('#mail').attr('class','tips_e');
		setHtml('mail','邮箱缺少[.]符号或是缺少[@]符号');
		return false;
	    }
	    if(mail3.split("@").length == 1){
	 	$('#mail').attr('class','tips_e');
		setHtml('mail','邮箱缺少[@]符号');
	     return false;
	    }
	    if(mail3.split(".").length > 3||mail3.split("@").length > 2){
		 	$('#mail').attr('class','tips_e');
			setHtml('mail','邮箱有三个[.]符号或有两个[@]符号');
			return false;
	    }
	    if(mail3.charAt(0) == "@"||mail3.charAt(mail3.length-1)=="@"){
		 	 $('#mail').attr('class','tips_e');
			 setHtml('mail','邮箱[@]符号不能放在首位也不能放在最末尾');
		     return false;
	    }
	    if(mail3.indexOf(".")== 0 || mail3.lastIndexOf(".")== mail3.length-1){
		 	$('#mail').attr('class','tips_e');
		 	setHtml('mail','邮箱[.]符号不能放在首位或是放在最末尾');
		 	return false;
	    }
	    if(mail3.indexOf("@")>mail3.indexOf(".")){
		 	$('#mail').attr('class','tips_e');
		 	setHtml('mail','邮箱[.]符号不能在[@]符号前面');
		 	return false;
	    }
	    if((mail3.indexOf(".")-mail3.indexOf("@"))==1){
	     alert("邮箱[.]符号与[@]符号不能相邻");
	     return false;
	    }
	/*if ($isNull(trim(mail2)) ){
		$('#mail').attr('class','tips_e');
		setHtml('mail','请输入邮箱地址');
		return;
	}
	if (mail1.indexOf("@")>0){
		$('#mail').attr('class','tips_e');
		setHtml('mail','请正确输入邮箱');
		return;
	}
	if (mail2.indexOf("@")>0){
		$('#mail').attr('class','tips_e');
		setHtml('mail','只需输入@之后的邮件地址');
		return;
	}*/
	//判断是否为yahoo邮箱
	if (mail3.match(/yahoo\./)){
		$('#mail').attr('class','tips_e');
		setHtml('mail','雅虎邮箱已停止使用，请您填写其他邮箱！');
		isPassMail = false;
		return;
	} 
	var kiss = new Array("~","`","!","#","$","%","^","&","*","(",")","/","\,","\\","?","<",">","+","=","|",":",";"," ","'","}","{","[","]");
	for (var i = 0; i < mail3.length ; i++) {
		for (var j = 0 ; j < 28; j++){
//			if( kiss[j] ==mail2.charAt(i)){
			if( kiss[j] ==mail3.charAt(i)){
				$('#mail').attr('class','tips_e');
				setHtml('mail','邮件地址勿输入特殊字符及空格符');
				return;
			}
		}
	}
	setHtml('mail','正在检查，请稍等...');
	$('#mail').attr('color','blue');
//	var mail = mail1+"@"+mail2;
	var mail = mail3;
	$.ajax({
		type : "POST",
		url : ctx+"/customers/fieldCheck", 
		data : {
			"action" : "mail",
			"mail" : mail
		},
		success : function(msg) {
			if(msg == "0") {
				$('#mail').attr('class','');
				setHtml('mail','');
				isPassMail = true;
			} else {
				$('#mail').attr('class','tips_e');
				setHtml('mail','该邮箱已被占用');
				isPassMail = false;
			}
		}
	});
}
var ischeckMobile=false;
function checkMobile(ctx){
	  var mobile = $('#mobile').val();
	  if (mobile=="" ){
	    setHtml('checkMobileId','请输入11位手机号码');
	    $('#checkMobileId').attr('class','tips_e');
	    ischeckMobile=false;
	    return;
	  }    
	  if (mobile!=""){
		  if(!mobile.match(reg)){
			  $('#checkMobileId').attr('class','tips_e');
		         setHtml('checkMobileId','请输入有效手机');	 
		         ischeckMobile=false;
		         return ;
		  }
		  if (mobile.length != 11) {				        
		        $('#checkMobileId').attr('class','tips_e');
		         setHtml('checkMobileId','请输入11位手机号码');	 
		         ischeckMobile=false;
		         return ;
		  }
		 if (!CheckType(mobile, NUM)) {	
		        $('#checkMobileId').attr('class','tips_e');
		        setHtml('checkMobileId','请输入正确的11位手机号码');	
		        ischeckMobile=false;
		        return ;
		 } 
	    $.ajax({
	      type : "POST",
	      url : ctx+"/customers/fieldCheck",  
	      data : "action=checkHisHp&mobile=" + mobile,
	      success : function(msg) {
	        if (msg == '0') {            
	          $('#checkMobileId').attr('class','');
	          setHtml('checkMobileId','');
	          ischeckMobile=true;
	        }else if(msg== '2'){
	          $('#checkMobileId').attr('class','tips_e');
	          setHtml('checkMobileId','系统故障,请致电东方购物顾客中心：021-5111-9900');
	          ischeckMobile=false;
	        }else{
	          $('#checkMobileId').attr('class','tips_e');
	          setHtml('checkMobileId','很抱歉，该手机号码已被使用');
	          ischeckMobile=false;
	        }
	      }
	    });
	  }
	}

var ischeckRecom = false;
/**
*
* @returns {Boolean}
*/
function checkRecom(ctx){
	var recomm = $('#recommend_id').val();
	if (recomm=="" || recomm=="可不填"){
		setHtml('checkRecommId','');
		$('#checkRecommId').attr('class','');
		ischeckRecom = true;
		return;
	}
	if (recomm!=""){
		$.ajax({
			type : "POST",
			url : ctx+"/customers/fieldCheck", 
			data : {
				"action": "recomm",
				"checkId": recomm
			},
			success : function(msg) {
				if(msg!=""){
					$('#recommend_no').val(msg);
					$.ajax({
						type : "POST",
						url : ctx+"/customers/fieldCheck", 
						data : {
							"action" : "recommstep2",
							"checkId" : msg
						},
						success : function(recomm_cnt) {
							if(recomm_cnt >= 5){
									$('#checkRecommId').attr('class','tips_e');
									setHtml('checkRecommId','该用户推荐次数大于5次');
									ischeckRecom = false;
								}else{
									setHtml('checkRecommId','');
									$('#checkRecommId').attr('class','');
									ischeckRecom = true;
							}
						}
					});
				}else{
					$('#checkRecommId').attr('class','tips_e');
					setHtml('checkRecommId','查询不到相应的用户');
					ischeckRecom = false;
				}
			}
		});
	}
}
/**
* 验证码
* @returns {Boolean}
*/
var ischeckSecurity = false;
function checkSecurityNum(ctx){
	if ($isNull(trim(ctx))){
		ctx="";
	}
	var security = $('#security').val();
	if($isNull(trim(security)) || typeof(security) == "undefined"){
		$('#checkIdVal').attr('class','tips_e');
		setHtml('checkIdVal','请输入验证码');
		return;
	}else{
		$.ajax({
			type : "POST",
			url  : ctx+"/common/checkSecurityCode",
			data : "security="+security,
			success : function(msg) {
				if(msg=="1000"){
					setHtml('checkIdVal','');
					$('#checkIdVal').attr('class','');
					checkInternetId(ctx);
				}else{
					$('#checkIdVal').attr('class','tips_e');
					setHtml('checkIdVal','您输入的验证码不一致，请重新输入');
					ischeckSecurity = false;
				}
			}
		});
	}
}

function Submit_check(ctx){
	var result = true;
	if (!checkCustName()){
		result = false;
		return result;
	}
	//checkSecurityNum(ctx);
	var security = $('#security').val();
	if($isNull(trim(security)) || typeof(security) == "undefined"){
		$('#checkIdVal').attr('class','tips_e');
		setHtml('checkIdVal','请输入验证码');
		result = false;
		return result;
	} else if (!ischeckSecurity){
		$('#checkIdVal').attr('class','tips_e');
		setHtml('checkIdVal','您输入的验证码不一致，请重新输入');
		result = false;
		return result;
	}
	//checkInternetId(ctx);
	if (!isPassCutName){
		$('#checkId').attr('class','tips_e');
		setHtml('checkId','用户名不正确');
		result = false;
		return result;
	}
	if (!checkPwd()){
		result = false;
		return result;
	}
	if (!checkConfirmPwd()){
		result = false;
		return result;
	}
	checkMail(ctx);
//	var mail1 = $('#mail1').val();
//	var mail2 = $('#mail2').val();
	
	var mail3 = $('#mail3').val();
	if($isNull(trim(mail3))){
		$('#mail').attr('class','tips_e');
		setHtml('mail','请输入邮箱');
		return false;
	}
	 if(mail3.split(".").length==1){
	 	$('#mail').attr('class','tips_e');
		setHtml('mail','邮箱缺少[.]符号或是缺少[@]符号');
		return false;
	    }
	    if(mail3.split("@").length == 1){
	 	$('#mail').attr('class','tips_e');
		setHtml('mail','邮箱缺少[@]符号');
	     return false;
	    }
	    if(mail3.split(".").length > 3||mail3.split("@").length > 2){
		 	$('#mail').attr('class','tips_e');
			setHtml('mail','邮箱有三个[.]符号或有两个[@]符号');
			return false;
	    }
	    if(mail3.match(/yahoo\./)){
			$('#mail').attr('class','tips_e');
			setHtml('mail','雅虎邮箱已停止使用,请您填写其他邮箱');
			return false;
		}
	    if(mail3.charAt(0) == "@"||mail3.charAt(mail3.length-1)=="@"){
		 	 $('#mail').attr('class','tips_e');
			 setHtml('mail','邮箱[@]符号不能放在首位也不能放在最末尾');
		     return false;
	    }
	    if(mail3.indexOf(".")== 0 || mail3.lastIndexOf(".")== mail3.length-1){
		 	$('#mail').attr('class','tips_e');
		 	setHtml('mail','邮箱[.]符号不能放在首位或是放在最末尾');
		 	return false;
	    }
	    if(mail3.indexOf("@")>mail3.indexOf(".")){
		 	$('#mail').attr('class','tips_e');
		 	setHtml('mail','邮箱[.]符号不能在[@]符号前面');
		 	return false;
	    }
	    if((mail3.indexOf(".")-mail3.indexOf("@"))==1){
	     alert("邮箱[.]符号与[@]符号不能相邻");
	     return false;
	    }
	if ($isNull(trim(mail3)) ){
		$('#mail').attr('class','tips_e');
		setHtml('mail','请输入邮箱地址');
		return false;
	} else if (!isPassMail){
		result = false;
		return result;
	}
	if(!ischeckMobile){
		 var mobile = $('#mobile').val();
		  if (mobile!=""){
			  if (mobile.length != 11) {				        
			        $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入11位手机号码');	
			         result = false;
			         return result;
			  }
			  if(!mobile.match(reg)){
				  $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入有效手机');	 
			         ischeckMobile=false;
			         return ;
			  }
			 if (!CheckType(mobile, NUM)) {	
			        $('#checkMobileId').attr('class','tips_e');
			        setHtml('checkMobileId','请输入正确的11位手机号码');	
			        result = false;
			        return result;
			 } 
			 $('#checkMobileId').attr('class','tips_e');
			 setHtml('checkMobileId','很抱歉，该手机号码已被使用');
			 result = false;
			 return result;
		 }else{
			    $('#checkMobileId').attr('class','tips_e');
		        setHtml('checkMobileId','请输入正确的11位手机号码');	
		        result = false;
		        return result;
		 }
		
	}

	//checkRecom(ctx);
	if (!ischeckRecom){
		$('#checkRecommId').attr('class','tips_e');
		setHtml('checkRecommId','查询不到相应的用户');
		result = false;
		return result;
	}
	if (result==true){
		if (!document.getElementById("agree2").checked){
			alert("请先阅读并同意网络服务使用条款");
			return false;
		}
		//joe 输入框内可不填字样过滤
		var recomm = $('#recommend_id').val();
		if (recomm=="可不填"){
			$('#recommend_id').val("");
		}
		$('#member_Gubun').val('new');
		var doc = document.form1;
		doc.action = ctx+"/customers/emp/new/method3/step2";
		doc.submit();
	}
}

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
* 判断字符串中包含的字符
* @param s
* @param spc
* @returns
*/
function CheckTypeName(s,spc) {
	var i;
	for(i=0; i<s.length; i++) {
		if (spc.indexOf( s.substring(i, i+1)) > 0) {
			return false;
		}
	}
	return true;
}
/**
* 判断字符串中是否只包含数字
* @param s
* @param spc
* @returns
*/
function CheckType(s,spc) {
	var i;
	for(i=0; i<s.length; i++) {
		if (spc.indexOf( s.substring(i, i+1)) < 0) {
			return false;
		}
	}
	return true;
}
function setHtml(id,val){
	$('#'+id).html(val);
}
/**
* 判断是否为字母与数字组合
* @param s
* @returns {Boolean}
*/
function getResult(s){
	var ls = 0;
	if (s.match(/[!@.#,$%^*&_\-A-Za-z]/ig)){
		ls++;
	}
	if (s.match(/[0-9]/ig)){
		ls++;
	}
	if(ls==2){
		return true;
	}else{
		return false;
	}
}
/**
* 判断18位身份证中生日
* @param s
* @returns {Boolean}
*/
function CheckResident18(s){
Today = new Date();
var MyMonth = (Today.getFullYear() - parseInt(s.substring(6, 10))) * 12 ;
if(12*18 > MyMonth){
return false;
}
return true;
}
/**
* 判断15位身份证中生日
* @param s
* @returns {Boolean}
*/
function CheckResident15(s){
Today = new Date();
var MyMonth = (Today.getFullYear() - parseInt("19"+s.substring(6, 8))) * 12 ;
if(12*18 > MyMonth){
return false;
}
return true;
}
/**
* 判断身份证号码是否合法
* @param s
* @returns {Boolean}
*/
function ResidentNo_Check(s){
var chk_bit = new Array();
chk_bit = ['1','0','x','9','8','7','6','5','4','3','2'];
var acc_val = s.substring(0,1)*7 + s.substring(1,2)*9+
s.substring(2,3)*10 + s.substring(3,4)*5+
s.substring(4,5)*8 + s.substring(5,6)*4+
s.substring(6,7)*2 + s.substring(7,8)*1+
s.substring(8,9)*6 + s.substring(9,10)*3+
s.substring(10,11)*7 + s.substring(11,12)*9+
s.substring(12,13)*10 + s.substring(13,14)*5+
s.substring(14,15)*8 + s.substring(15,16)*4+
s.substring(16,17)*2;
var mod_val = acc_val % 11;
var chk_bitstr = chk_bit[mod_val];
var res_str = s.substring(17,18);
if(res_str.toLowerCase() == chk_bitstr){
return true;
}

if(res_str == 'A'){
return true;
}

return false;
}

var checkPostCardInfo = true;
function checkPostCardInf(){
	
	var resident_No = $('#resident_No').val();
	if ($isNull(trim(resident_No))){		
		$('#checkCardId').attr('class','tips_e');
		setHtml('checkCardId','请输入身份证');
		return false;
	}else{
		$('#checkCardId').attr('class','');
		setHtml('checkCardId','');
		return true;
	}

}

var isTvRegist = false;
function checkC_no(ctx){
	  isTvRegist = false;
	  var c_no = $('#c_no').val();
	  var c_name = $('#c_name').val();
	  var c_hp = $('#c_hp').val();
	  if (c_no==null || c_no==""){
		$('#checkC_no').attr('class','tips_e');
	    setHtml('checkC_no','请输入12位顾客编号');	 
	    isTvRegist=false;
	    return;
	  }    
	  if (c_no!=""){
		  if (c_no.length != 12) {				        
		        $('#checkC_no').attr('class','tips_e');
		         setHtml('checkC_no','请输入12位顾客编号');	 
		         isTvRegist=false;
		         return ;
		  }
		 if (!CheckType(c_no, NUM)) {	
		        $('#checkC_no').attr('class','tips_e');
		        setHtml('checkC_no','请输入正确的12位顾客编号');	
		        isTvRegist=false;
		        return ;
		 } 
	    $.ajax({
	      type : "POST",
	      url : ctx+"/customers/fieldCheck",  
	      data : "action=custno&c_no=" + c_no + "&c_name=" + c_name + "&c_hp=" + c_hp,
	      success : function(msg) {
	        if (msg == '' || msg == null) {            
	          $('#checkC_no').attr('class','');
	          setHtml('checkC_no','');
	          isTvRegist=true;
	        }else{
	          $('#checkC_no').attr('class','tips_e');
	          setHtml('checkC_no','该用户不能电视注册');
	          isTvRegist=false;
	        }
	      }
	    });
	  }
	}

function checkUserMsg(ctx){
	isTvRegist = false;
	var cust_name_tv = $("#cust_name_tv").val();
	var resident_No = $("#resident_No").val();
	var tel_Tv2 = $("#tel_Tv2").val();
	
	//电视用户登录 先检查电话号码 再根据三项信息判断能否注册
	if(tel_Tv2 == ""){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','请输入电话号码');
		return false;
	}else if(tel_Tv2.length < 11){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','电话号码长度不对，请输入有效电话号码');
		return false;
	}else  if(!tel_Tv2.match(reg)){
		  $('#checktel_Tv2').attr('class','tips_e');
	         setHtml('checktel_Tv2','请输入有效手机');	 
	         return ;
	 }else if(!CheckType(tel_Tv2,NUM)) {
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','电话号码只能输入数字');
		return false;
	} else {
		$.ajax({
			type : "POST",
			url : ctx+"/customers/fieldCheck", 
			data : {
				"action" : "checkUser",
				"custName" : cust_name_tv,
				"residentNo" : resident_No,
				"telTv" : tel_Tv2
			},
			success : function(response) {
				response = response.replace(/\r\n/ig,"");
				if(response=="" || response==null){
					isTvRegist = true;
					$('#checktel_Tv2').attr('class','tips');
					setHtml('checktel_Tv2','该用户可电视注册');
				}else if(response == 1){
					isTvRegist = false;
					$('#checktel_Tv2').attr('class','tips_e');
					setHtml('checktel_Tv2','您输入的手机号码已被验证，请致电客服咨询');
				}else if(response == 2){
					isTvRegist = false;
					$('#checktel_Tv2').attr('class','tips_e');
					setHtml('checktel_Tv2','您输入的姓名与手机号码不匹配或有误，请致电顾客中心');
				}else if(response == 3){
					isTvRegist = false;
					$('#cn_d').hide();
					$('#hp_d').hide();
					$('#cno_d').show();
					$('#c_name').val(cust_name_tv);
					$('#c_hp').val(tel_Tv2);
				}
			}
		});
	}
}

function Submit_check_tv(ctx){
	if(isTvRegist){
		if(!document.getElementById("agreePV").checked){
			alert("请先阅读并同意网络服务使用条款");
			return false;
		} else {
			document.getElementById("member_Gubun").value="old";
			//$('#member_Gubun').val('old');
			var doc = document.form1;
			doc.action = ctx+"/customers/emp/new/method2/step2";
			doc.submit();
		}
	}
}







var timer = 119;

var isValiter = true;
function timerInfo() {
	if(isValiter){
		isValiter = true;
		if (timer > 0) {
	    	isValiter = true;
	    	var ti="验证倒计时"+timer;
	    	 $("#addressBtn_on").html(ti);
	        timer--;
	    } else {
	    	isValiter = false;
	    	$("#addressBtn_ok").show();
	    	$("#addressBtn_on").hide();
	    	$("#addressBtn_show").hide();
	    	 $("#addressBtn_on").html("验证倒计时"+120);
	    }
	}else{
		 isValiter = false;
			$("#addressBtn_ok").show();
	    	$("#addressBtn_on").hide();
	    	$("#addressBtn_show").hide();
	    	 $("#addressBtn_on").html("验证倒计时"+120);
	}
    
}
var newRegist=false;
function newregUserMsg(ctx){
	newRegist = false;
	var internet_Id=$("#internet_Id").val();
	var cust_Name=$("#cust_Name").val();
	var mobile=$("#mobile").val();
	if(!ischeckMobile){
		  if (mobile!=""){
			  if (mobile.length != 11) {				        
			        $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入11位手机号码');	
			         return ;
			  }
			  if(!mobile.match(reg)){
				  $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入有效手机');	 
			         return ;
			  }
			 if (!CheckType(mobile, NUM)) {	
			        $('#checkMobileId').attr('class','tips_e');
			        setHtml('checkMobileId','请输入正确的11位手机号码');	
			        return ;
			 } 
		 }else{
			    $('#checkMobileId').attr('class','tips_e');
		        setHtml('checkMobileId','请输入正确的11位手机号码');	
		        return ;
		 	}
		}else{$.ajax({
					type : "POST",
					url : "/customers/fieldCheck",  
					data: {"action": "checkMobileSMSSendCount",
						   "mobile": mobile
				},
			success : function(msg) {
				if (msg == '0') {
					isValiter=false;
					$('#sms_title').attr('class','tips_e');
					setHtml('sms_title',"您的手机号码一小时内发送验证码次数已经超出限制5条!");
					return  ;
				}else{
					$('#checkMobileId').attr('class','');
					  setHtml('checkMobileId','');	
					  $('#sms_title').attr('class','');
					  setHtml('sms_title','');	
					  getSecurityCode1('text',ctx,'reg_valcodetv')
					 $('#regist_output6').css({'margin-left':'-200px'});
					 $('.regist_tips_overlay').css({'display':'block'});
							
				}
			}
		});
	}
					
			
	
}

var btn_show=false;

var issendsmg=false;
function sendsmg(){
	var internet_Id=$("#internet_Id").val();
	var cust_Name=$("#cust_Name").val();
	var mobile=$("#mobile").val();
	var reg_security=$("#reg_security").val();
	$("#security1").val(reg_security);
	timer=119;
	newcheckSecurityNum('','reg_security','reg_error_info');
	if(!ischeckSecurity){
		setHtml('reg_error_info','请输入验证码');
		$('#reg_error_info').attr('class','tips_e');
		return;
	}
	if(!ischeckMobile){
		  if (mobile!=""){
			  if (mobile.length != 11) {				        
			        $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入11位手机号码');	
			         return ;
			  }
			  if(!mobile.match(reg)){
				  $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入有效手机');	 
			         return ;
			  }
			 if (!CheckType(mobile, NUM)) {	
			        $('#checkMobileId').attr('class','tips_e');
			        setHtml('checkMobileId','请输入正确的11位手机号码');	
			        return ;
			 } 
		 }else{
			    $('#checkMobileId').attr('class','tips_e');
		        setHtml('checkMobileId','请输入正确的11位手机号码');	
		        return ;
		 	}
		}else{
			$.ajax({
					type : "POST",
					url : "/customers/fieldCheck",  
					data: {"action": "checkMobileSMSSendCount",
						   "mobile": mobile
				},
			success : function(msg) {
				if (msg == '0') {
					isValiter=false;
					$('#sms_title').attr('class','tips_e');
					setHtml('sms_title',"您的手机号码一小时内发送验证码次数已经超出限制5条!");
					return  ;
				}else{
					$.ajax({
						type : "POST",
						url : "/customers/fieldCheck",  			
						data: {"action": "setRegVerificationCode",
							   "mobile": mobile,
							   "cust_name" :cust_Name,
							   "internet_Id" :internet_Id,
							   "security":reg_security
						},
						success : function(msg) {
							if (msg == '1') {	
								isValiter = true;
								timer=119;
								 $('.regist_output').css({'margin-left':'-20000px'});
								 $('.regist_tips_overlay').css({'display':'none'});
								 if(!issendsmg){
									setInterval(timerInfo, 1000);
									issendsmg=true;
								 }
									$("#addressBtn_ok").hide();
							    	$("#addressBtn_on").show();
							    	$("#addressBtn_show").hide();	
							    	btn_show=true;
							    	$("#mobile").attr("readonly","readonly");
												
							}else if(msg=='2'){
									isValiter=false;
										alert('您输入的验证码不一致，请重新输入!');
										return;
								}else{
								isValiter=false;
								$('#sms_title').attr('class','tips_e');
								setHtml('sms_title',"您的手机号码暂时无法接收，请重新确认您的手机号码!");								
						    return;
							}
						}
					});	
				}
			}
		});
	}
}


var is_subimt=false;
function submitregistFrom() {
	if(is_subimt){
		return false;
	}
    var smshp = $("#smshp").val();
    var internet_Id=$("#internet_Id").val();
	 var mobile = $('#mobile').val();
	 $("tel_Tv2").val(mobile);
	if(!ischeckMobile){
	
		  if (mobile!=""){
			  if (mobile.length != 11) {				        
			        $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入11位手机号码');	
			         return ;
			  }
			  if(!mobile.match(reg)){
				  $('#checkMobileId').attr('class','tips_e');
			         setHtml('checkMobileId','请输入有效手机');	 
			         return ;
			  }
			 if (!CheckType(mobile, NUM)) {	
			        $('#checkMobileId').attr('class','tips_e');
			        setHtml('checkMobileId','请输入正确的11位手机号码');	
			        return ;
			 } 
		 }else{
			    $('#checkMobileId').attr('class','tips_e');
		        setHtml('checkMobileId','请输入正确的11位手机号码');	
		        return ;
		 }
		
	}
    
    if (!isValiter) {
    	setHtml('sms_title',"本次激活未成功，请确认输入的手机号码是否正确！");
    	$('#sms_title').attr('class','tips_e');
        return false ;
    }
		if(document.getElementById("smshp").value.length != 6){
			setHtml('sms_title',"请输入正确的验证码");
			$('#sms_title').attr('class','tips_e');

    		document.getElementById("smshp").focus();
    		return  ;
    	}
			if (!checkPwd()){
				return ;
			}
			if (!checkConfirmPwd()){
				return ;
			}
		if (!document.getElementById("readed").checked){
			alert("请先阅读并同意网络服务使用条款");
			return false;
		}
	
        	$.ajax({
    			type : "POST",
    			url : "/customers/fieldCheck",  
    			data: {"action": "checkHisHp",
    				   "mobile":mobile
					   
				},
    			success : function(msg) {
    				if (msg== '1') {
    					$('#sms_title').attr('class','tips_e');
    					setHtml('sms_title',"很抱歉，该手机号码已被他人用于会员激活，或已被使用！");
    			
    					return;
    				}else if(msg== '2'){
    					setHtml('sms_title',"系统故障,请致电东方购物顾客中心：021-5111-9900");
    					$('#sms_title').attr('class','tips_e');
    					return;
    				}else if(msg== '0'){
    					$.ajax({
   		          			type : "POST",
   		          			url : "/customers/fieldCheck",  
   		          			
   		          		    data: {"action": "checksmspasswdCount",
   		          		            "mobile": mobile,
   						            "smshp": smshp,  						   
   						            "internet_Id" :internet_Id
   					         },
   		          			success : function(msg) {
   		          				if (msg == '1') {
   		          				     $.ajax({
   		   		          			    type : "POST",
   		   		          			    url : "/customers/fieldCheck",   		   		          			
   		   		          		        data: {"action": "checksmspasswd",
   		   		          		               "mobile":mobile,
   						                       "smshp": smshp,  						   
   						                       "internet_Id" :internet_Id
   					                    },
   		   		          			    success : function(msg) {
   		   		          				   if (msg == '1') {
   		   		          					   /* frm.action = "/customers/emp/new/step6_mobile";
   		   		          		               frm.submit(); */
   		   		          					   is_subimt=true;
		   		   		          		     $.ajax({
		   		   		          		            cache: true,
		   		   		          		            type: "POST",
		   		   		          		            url:"/customers/emp/new/step6_mobile",
		   		   		          		            data:$('#form1').serialize(),// form id
		   		   		          		            async: false,
		   		   		          		            error: function(request) {
		   		   		          		                alert("系统异常，请重新操作");
		   		   		          		                return;
		   		   		          		            },
		   		   		          		            success: function(data) {
		   		   		          		            	if(data=='1'){
		   		   		          		            		
		   		   		          		                   window.location.href="/customers/emp/new/method4/newstep3?type=tel_web&hp_email="+mobile; 
		   		   		          		            	}else{
		   		   		          		            		is_subimt=false;
		   		   		          		                     alert("注册失败，请重新操作");
		   		   		          		                     return;
		   		   		          		            	}     
		   		   		          		            }
		   		   		          		        });
		   		   	
   		   		          		               
   		   		          				   }else{
   		   		          				setHtml('sms_title',"很抱歉，您输入的激活码不正确或已失效!");
   		   		          				$('#sms_title').attr('class','tips_e');

   											  return;
   		   		          				   }
   		   		          			    }
   		    		          	     });
   		          					 
   		          				}else{
   		          				setHtml('sms_title',"很抱歉，验证码错误次数超过10次，请30分钟后再试!");
   		          				$('#sms_title').attr('class','tips_e');
									return;
   		          				}
   		          			}
    		          	});
    				}
    			}
    		});
	
}



/**
* 验证码
* @returns {Boolean}
*/
var ischeckSecurity = false;
function newcheckSecurityNum(ctx,id,textid){
	if ($isNull(trim(ctx))){
		ctx="";
	}
	var security = $('#'+id).val();
	if($isNull(trim(security)) || typeof(security) == "undefined"){
		setHtml(textid,'请输入验证码');
		$('#'+textid).attr('class','tips_e');
		return;
	}else{
		$.ajax({
			type : "POST",
			url  : ctx+"/common/checkSecurityCode",
			data : "security="+security,
			success : function(msg) {
				if(msg=="1000"){
					ischeckSecurity = true;
					setHtml(textid,'');
					$('#'+textid).attr('class','');
				}else{
					setHtml(textid,'您输入的验证码不一致，请重新输入');
					$('#'+textid).attr('class','tips_e');
					ischeckSecurity = false;
				}
			}
		});
	}
}


/**
*
* @returns {Boolean}
*/
function emailcheckPwd(){
	var pwd = $('#emailpassword').val();
	if($isNull(trim(pwd))){
		$('#pwdtext').attr('class','tips_e');
		setHtml('pwdtext','请输入密码');
		return false;
	}
	if(pwd.length < 4||pwd.length > 20){
		$('#pwdtext').attr('class','tips_e');
		setHtml('pwdtext','密码长度为4-20个字符');
		return false;
	}
	var checkRegex = new RegExp("^((?=.*\\W)|(?=.*\_)).*$", "g");
	if (checkRegex.test(pwd)) {
		$('#pwdtext').attr('class','tips_e');
		setHtml('pwdtext','密码只能由字母和数字组成');
		return false;
    }
	if(!getResult(pwd)){
		$('#pwdtext').attr('class','tips_e');
		setHtml('pwdtext','该密码比较简单，有被盗风险，建议您改为字母+数字的密码');
		return false;
	}else{
		$('#pwdtext').attr('class','');
		setHtml('pwdtext','');
		return true;
	}
}

/**
*
* @returns {Boolean}
*/
function emailcheckConfirmPwd(){
	var pwd = $('#emailpassword').val();
	var confirm_pwd = $('#emailconfirm_pwd').val();
	if($isNull(trim(confirm_pwd))){
		$('#confirmtext').attr('class','tips_e');
		setHtml('confirmtext','请输入确认密码');
		return false;
	}
	if(confirm_pwd.length < 4||confirm_pwd.length > 20){
		$('#confirmtext').attr('class','tips_e');
		setHtml('confirmtext','确认密码长度为4-20个字符');
		return false;
	}
	if(!getResult(confirm_pwd)){
		$('#confirmtext').attr('class','tips_e');
		setHtml('confirmtext','该密码比较简单，有被盗风险，建议您改为字母+数字的密码');
		return false;
	}
	
	if (pwd != confirm_pwd){
		$('#confirmtext').attr('class','tips_e');
		setHtml('confirmtext','密码输入不一致，请重新确认');
		return false;
	}else{
		$('#confirmtext').attr('class','');
		setHtml('confirmtext','');
		return true;
	}
}

function newcheckMail(ctx){
	var mail3 = $('#mail3').val();
	if($isNull(trim(mail3))){
		$('#mail').attr('class','tips_e');
		setHtml('mail','请输入邮箱');
		return false;
	}
	if(mail3.match(/yahoo\./)){
		$('#mail').attr('class','tips_e');
		setHtml('mail','雅虎邮箱已停止使用,请您填写其他邮箱');
		return false;
	}
	 if(mail3.split(".").length==1){
	 	$('#mail').attr('class','tips_e');
		setHtml('mail','邮箱缺少[.]符号或是缺少[@]符号');
		return false;
	    }
	    if(mail3.split("@").length == 1){
	 	$('#mail').attr('class','tips_e');
		setHtml('mail','邮箱缺少[@]符号');
	     return false;
	    }
	    if(mail3.split(".").length > 3||mail3.split("@").length > 2){
		 	$('#mail').attr('class','tips_e');
			setHtml('mail','邮箱有三个[.]符号或有两个[@]符号');
			return false;
	    }
	    if(mail3.charAt(0) == "@"||mail3.charAt(mail3.length-1)=="@"){
		 	 $('#mail').attr('class','tips_e');
			 setHtml('mail','邮箱[@]符号不能放在首位也不能放在最末尾');
		     return false;
	    }
	    if(mail3.indexOf(".")== 0 || mail3.lastIndexOf(".")== mail3.length-1){
		 	$('#mail').attr('class','tips_e');
		 	setHtml('mail','邮箱[.]符号不能放在首位或是放在最末尾');
		 	return false;
	    }
	    if(mail3.indexOf("@")>mail3.indexOf(".")){
		 	$('#mail').attr('class','tips_e');
		 	setHtml('mail','邮箱[.]符号不能在[@]符号前面');
		 	return false;
	    }
	    if((mail3.indexOf(".")-mail3.indexOf("@"))==1){
	     alert("邮箱[.]符号与[@]符号不能相邻");
	     return false;
	    }
	var kiss = new Array("~","`","!","#","$","%","^","&","*","(",")","/","\,","\\","?","<",">","+","=","|",":",";"," ","'","}","{","[","]");
	for (var i = 0; i < mail3.length ; i++) {
		for (var j = 0 ; j < 28; j++){
//			if( kiss[j] ==mail2.charAt(i)){
			if( kiss[j] ==mail3.charAt(i)){
				$('#mail').attr('class','tips_e');
				setHtml('mail','邮件地址勿输入特殊字符及空格符');
				return false;
			}
		}
	}
	setHtml('mail','正在检查，请稍等...');
	$('#mail').attr('color','blue');
	var mail = mail3;
	$.ajax({
		type : "POST",
		url : ctx+"/customers/fieldCheck", 
		data : {
			"action": "checkHisMail",
			"email":mail
		},
		async : false,
		success : function(msg) {
			if(msg == "0") {
				$('#mail').attr('class','');
				setHtml('mail','');
				isPassMail = true;
			} else {
				$('#mail').attr('class','tips_e');
				setHtml('mail','该邮箱已被占用');
				isPassMail = false;
			}
		}
	});
	if(isPassMail){
		return true;
	}else{
		return false;
	}
}


var NUM = "0123456789";
var ischeckemail=true;
function Submit_checkemail(mctx){
	
	if(!ischeckemail){
		return false;
	}
	var result=true;
	if(!ischeckSecurity){
		$('#securitytext').attr('class','tips_e');
		setHtml('securitytext','您输入的验证码不一致，请重新输入');	
		return false;
	}
	var checkhp_email = $('#mail3').val().toLowerCase();
	if(!newcheckMail(mctx)){
		return false;
	}
	
	$.ajax({
		type : "POST",
		url : mctx+"/customers/fieldCheck", 
		data : {
			"action": "checkHisMail",
			"email":checkhp_email
		},
		success : function(msg) {
			if(msg == "0") {
				$("#email1").val(checkhp_email);
				ischeck_hp_email=true;
				if (!emailcheckPwd()){
					result = false;
					return result;
				}
				if (!emailcheckConfirmPwd()){
					result = false;
					return result;
				}

				if (!document.getElementById("readed_email").checked){
					alert("请先阅读并同意网络服务使用条款");
					return false;
				}
				ischeckemail=false;
				 $.ajax({
   		            cache: true,
   		            type: "POST",
   		            url:"/customers/emp/new/step_email",
   		            data:$('#emailform1').serialize(),// form id
   		            async: false,
   		            error: function(request) {
   		                alert("系统异常，请重新操作");
   		                return;
   		            },
   		            success: function(data) {
   		            	if(data=='1'){
   		                   window.location.href="/customers/emp/new/method4/newmethod_email?email="+checkhp_email; 
   		            	}else{
   		            		ischeckemail=true;
   		                     alert("注册失败，请重新操作");
   		                     return;
   		            	}     
   		            }
   		        });
			} else {
				setHtml('mailtext',"该邮箱已被占用");
				$('#mailtext').attr('class','tips_e');
				$('#email').focus();			
				return;
				}
			},
		});
}

function newchecktvhpMsg(ctx){
	var cust_name_tv = $("#cust_name_tv").val();
	var tel_Tv2 = $("#tel_Tv2").val();
	
	//电视用户登录 先检查电话号码 再根据三项信息判断能否注册
	if(tel_Tv2 == ""){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','请输入电话号码');
		return false;
	}else if(tel_Tv2.length < 11){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','电话号码长度不对，请输入有效电话号码');
		return false;
	} else  if(!tel_Tv2.match(reg)){
		  $('#checktel_Tv2').attr('class','tips_e');
	         setHtml('checktel_Tv2','请输入有效手机');	 
	         return ;
	  }else if(!CheckType(tel_Tv2,NUM)) {
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','电话号码只能输入数字');
		return false;
	}else{
		$.ajax({
			type : "POST",
			url : ctx+"/customers/fieldCheck", 
			data : {
				"action" : "checkUser",
				"custName" : cust_name_tv,
				"telTv" : tel_Tv2
			},
			success : function(response) {
				response = response.replace(/\r\n/ig,"");
				if(response=="" || response==null){
					if(!newisTvRegist){
						getSecurityCode1('text',ctx,'valcodetv');
						}
					newisTvRegist = true;
					$('#checktel_Tv2').attr('class','tips');
					setHtml('checktel_Tv2','该用户可电视注册');
					return true;
				}else if(response == 1){
					newisTvRegist = false;
					$('#checktel_Tv2').attr('class','tips_e');
					setHtml('checktel_Tv2','您输入的手机号码已被验证，请致电客服咨询');
				}else if(response == 2){
					newisTvRegist = false;
					$('#checktel_Tv2').attr('class','tips_e');
					setHtml('checktel_Tv2','您输入的姓名与手机号码不匹配或有误，请致电顾客中心');
				}else if(response == 3){
					newisTvRegist = true;
					return true;
				}
			}
		});
	}
}

var newisTvRegist=false;
function newcheckUserMsg(ctx){
	newisTvRegist = false;
	var cust_name_tv = $("#cust_name_tv").val();
	var tel_Tv2 = $("#tel_Tv2").val();
	if(tel_Tv2 == ""){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','请输入电话号码');
		return false;
	}else if(tel_Tv2.length < 11){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','电话号码长度不对，请输入有效电话号码');
		return false;
	}else  if(!tel_Tv2.match(reg)){
		  $('#checktel_Tv2').attr('class','tips_e');
	         setHtml('checktel_Tv2','请输入有效手机');	 
	         return ;
	  }else if(!CheckType(tel_Tv2,NUM)) {
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','电话号码只能输入数字');
		return false;
	}else{
		$.ajax({
			type : "POST",
			url : ctx+"/customers/fieldCheck", 
			data : {
				"action" : "checkUser",
				"custName" : cust_name_tv,
				"telTv" : tel_Tv2
			},
			success : function(response) {
				response = response.replace(/\r\n/ig,"");
				if(response=="" || response==null){
					getSecurityCode1('text',ctx,'valcodetv');
					newisTvRegist = true;
					$('#checktel_Tv2').attr('class','tips');
					setHtml('checktel_Tv2','该用户可电视注册');
					 $('#regist_output1').css({'margin-left':'-200px'});
					 $('.regist_tips_overlay').css({'display':'block'});
				}else if(response == 1){
					newisTvRegist = false;
					$('#checktel_Tv2').attr('class','tips_e');
					setHtml('checktel_Tv2','您输入的手机号码已被验证，请致电客服咨询');
				}else if(response == 2){
					newisTvRegist = false;
					$('#checktel_Tv2').attr('class','tips_e');
					setHtml('checktel_Tv2','您输入的姓名与手机号码不匹配或有误，请致电顾客中心');
				}else if(response == 3){
					newisTvRegist = true;
					getSecurityCode1('text',ctx,'valcodetvno')
					 $('#regist_output4').css({'margin-left':'-200px'});
					 $('.regist_tips_overlay').css({'display':'block'});
				}
			}
		});
	}
}




var isValiter = true;
function tvtimerInfo() {
	if(isValiter){
		isValiter = true;
		if (timer > 0) {
	    	isValiter = true;
	    	 $("#addressun_on").html("验证倒计时"+timer);

	        timer--;
	    } else {
	    	isValiter = false;
	    	$("#addressun_ok").show();
	    	$("#addressun_on").hide();
	    	$("#addressun_show").hide();
	    	 $("#addressun_on").html("验证倒计时"+120);

	    }
	}else{
		 isValiter = false;
			$("#addressun_ok").show();
	    	$("#addressun_on").hide();
	    	$("#addressun_show").hide();
	    	$("#addressun_on").html("验证倒计时"+120);
	}
    
}
var istv_btn_show=false;
var tvissendsmg=false;
function tvsendsmg(ctx,securi_id){
	var internet_Id=$("#tvinternet_Id").val();
	var cust_Name=$("#cust_name_tv").val();
	var tv_cust_no_text=$("#tv_cust_no_text").val();
	$("#cust_no").val(tv_cust_no_text);
	$("#cust_No").val(tv_cust_no_text);

	var mobile=$("#tel_Tv2").val();
	timer=119;
	var securi="#"+securi_id;
	var security=$(securi).val();
	$("#security3").val(security);
	newcheckSecurityNum(ctx,securi_id,'error_info');
	if(!ischeckSecurity){
		setHtml('error_info','请输入验证码');
		$('#error_info').attr('class','tips_e');
		return;
	}
	if(!newisTvRegist){
		$('#checktel_Tv2').attr('class','tips_e');
		setHtml('checktel_Tv2','请输入电话号码');
		return false;
	}else{
	    $.ajax({
		      type : "POST",
		      url : ctx+"/customers/fieldCheck",  
		      data : "action=checkHisHp&mobile=" + mobile,
		      success : function(msg) {
		        if (msg == '0') {            
		        	$.ajax({
						type : "POST",
						url : "/customers/fieldCheck",  
						data: {"action": "checkMobileSMSSendCount",
							   "mobile": mobile
					},
				success : function(msg) {
					if (msg == '0') {
						isValiter=false;
						$('#tvsms_title').attr('class','tips_e');
						setHtml('tvsms_title',"您的手机号码一小时内发送验证码次数已经超出限制5条!");
						return  ;
					}else{
						$.ajax({
							type : "POST",
							url : "/customers/fieldCheck",  			
							data: {"action": "setRegVerificationCode",
								   "mobile": mobile,
								   "cust_name" :cust_Name,
								   "internet_Id" :internet_Id,
								   "security"	:security
							},
							success : function(msg) {
								if (msg == '1') {	
									isValiter = true;	
									timer=119;
									 $('.regist_output').css({'margin-left':'-20000px'});
									 $('.regist_tips_overlay').css({'display':'none'});
										
										if(!tvissendsmg){
											setInterval(tvtimerInfo, 1000);
											tvissendsmg=true;
										}
										$("#addressun_ok").hide();
								    	$("#addressun_on").show();
								    	$("#addressun_show").hide();		
								    	istv_btn_show=true;
								    	$("#tel_Tv2").attr("readonly","readonly");
								}else{
									 $('#tvsms_title').attr('class','tips_e');
									 setHtml('tvsms_title',"您的手机号码暂时无法接收，请重新确认您的手机号码!");			
									 $('.regist_output').css({'margin-left':'-20000px'});
									 $('.regist_tips_overlay').css({'display':'none'});
							    return;
								}
							}
						});	
					}
				}
			});
        }else if(msg== '2'){
          $('#tvsms_title').attr('class','tips_e');
          setHtml('tvsms_title','系统故障,请致电东方购物顾客中心：021-5111-9900');
          ischeckMobile=false;
        }else{
          $('#tvsms_title').attr('class','tips_e');
          setHtml('tvsms_title','很抱歉，该手机号码已被使用');
          ischeckMobile=false;
        }
      }
    });
		
	}
}


/**
*
* @returns {Boolean}
*/
function TVcheckPwd(){
	var pwd = $('#tvpassword').val();
	if($isNull(trim(pwd))){
		$('#tv_pwd_text').attr('class','tips_e');
		setHtml('tv_pwd_text','请输入密码');
		return false;
	}
	if(pwd.length < 4||pwd.length > 20){
		$('#tv_pwd_text').attr('class','tips_e');
		setHtml('tv_pwd_text','密码长度为4-20个字符');
		return false;
	}
	var checkRegex = new RegExp("^((?=.*\\W)|(?=.*\_)).*$", "g");
	if (checkRegex.test(pwd)) {
		$('#tv_pwd_text').attr('class','tips_e');
		setHtml('tv_pwd_text','密码只能由字母和数字组成');
		return false;
    }
	if(!getResult(pwd)){
		$('#tv_pwd_text').attr('class','tips_e');
		setHtml('tv_pwd_text','该密码比较简单，有被盗风险，建议您改为字母+数字的密码');
		return false;
	}else{
		$('#tv_pwd_text').attr('class','');
		setHtml('tv_pwd_text','');
		return true;
	}
}

/**
*
* @returns {Boolean}
*/
function TVcheckConfirmPwd(){
	var pwd = $('#tvpassword').val();
	var confirm_pwd = $('#tvconfirm_pwd').val();
	if($isNull(trim(confirm_pwd))){
		$('#tvconfirm_pwd_text').attr('class','tips_e');
		setHtml('tvconfirm_pwd_text','请输入确认密码');
		return false;
	}
	if(confirm_pwd.length < 4||confirm_pwd.length > 20){
		$('#tvconfirm_pwd_text').attr('class','tips_e');
		setHtml('tvconfirm_pwd_text','确认密码长度为4-20个字符');
		return false;
	}
	if(!getResult(confirm_pwd)){
		$('#tvconfirm_pwd_text').attr('class','tips_e');
		setHtml('tvconfirm_pwd_text','该密码比较简单，有被盗风险，建议您改为字母+数字的密码');
		return false;
	}
	
	if (pwd != confirm_pwd){
		$('#tvconfirm_pwd_text').attr('class','tips_e');
		setHtml('tvconfirm_pwd_text','密码输入不一致，请重新确认');
		return false;
	}else{
		$('#tvconfirm_pwd_text').attr('class','');
		setHtml('tvconfirm_pwd_text','');
		return true;
	}
}
var is_submit_tv=false;
function Submit_check_tv(mctx){	
	if(is_submit_tv){
		return false;
	}
	var frm = document.formTV;
	var internet_Id=$("#tvinternet_Id").val();
	var name = $('#cust_name_tv').val();
	
	var cust_no =$("#tv_cust_no_text").val();
	var pwd=$("#tvpassword").val();
	var confirm_pwd=$("#tvconfirm_pwd").val();
	var tel_Tv2 =$("#tel_Tv2").val();
	var smshp =$("#tvsmshp").val();
	$("#tvname").val(name);
	$("#tvtel").val(tel_Tv2);
	
	if(smshp==null||""==smshp||smshp.length != 6){
		setHtml('tvsms_title',"请输入正确的验证码");
		$('#tvsms_title').attr('class','tips_e');
		document.getElementById("tvsmshp").focus();
		return  ;
	}
			if(newisTvRegist){
				if (!TVcheckPwd()){
					result = false;
					return result;
				}
				if (!TVcheckConfirmPwd()){
					result = false;
					return result;
				}
				if (!document.getElementById("readed_tv").checked){
							alert('请先阅读并同意网络服务使用条款');	
							return ;
						}
							$.ajax({
								type : "POST",
								url : mctx+"/customers/fieldCheck", 
								data : {
									"action" : "checkUser",
									"custName" : name,
									"cust_no" : cust_no,
									"telTv" : tel_Tv2
								},
								success : function(response) {
									response = response.replace(/\r\n/ig,"");
									if(response=="" || response==null){
										$.ajax({
				   		          			type : "POST",
				   		          			url : "/customers/fieldCheck",  
				   		          		    data: {"action": "checksmspasswdCount",
				   		          		            "mobile": tel_Tv2,
				   						            "smshp": smshp,  						   
				   						            "internet_Id" :internet_Id
				   					         },
				   		          			success : function(msg) {
				   		          				if (msg == '1') {
				   		          				     $.ajax({
				   		   		          			    type : "POST",
				   		   		          			    url : "/customers/fieldCheck",   		   		          			
				   		   		          		        data: {"action": "checksmspasswd",
				   		   		          		               "mobile":tel_Tv2,
				   						                       "smshp": smshp,  						   
				   						                       "internet_Id" :internet_Id
				   					                    },
				   		   		          			    success : function(msg) {
				   		   		          				   if (msg == '1') {
				   		   		          				is_submit_ty=true;
			   		   		          					   $.ajax({
					   		   		          		            cache: true,
					   		   		          		            type: "POST",
					   		   		          		            url:mctx+"/customers/emp/new/step6_mobile",
					   		   		          		            data:$('#formTV').serialize(),// form id
					   		   		          		            async: false,
					   		   		          		            error: function(request) {
					   		   		          		                alert("系统异常，请重新操作");
					   		   		          		                return;
					   		   		          		            },
					   		   		          		            success: function(data) {
					   		   		          		            	if(data=='1'){
					   		   		          		                   window.location.href=mctx+"/customers/emp/new/method4/newstep3?type=tel_web&hp_email="+tel_Tv2; 
					   		   		          		            	}else{
					   		   		          		            		is_submit_ty=false;
					   		   		          		                     alert("注册失败，请重新操作");
					   		   		          		                     return;
					   		   		          		            	}     
					   		   		          		            }
					   		   		          		        });
				   		   		          				   }else{
				   		   		          				setHtml('tvsms_title',"很抱歉，您输入的激活码不正确或已失效!");
				   		   		          				$('#tvsms_title').attr('class','tips_e');
				   											  return;
				   		   		          				   }
				   		   		          			    }
				   		    		          	     });
				   		          				}else{
				   		          				setHtml('tvsms_title',"很抱歉，验证码错误次数超过10次，请30分钟后再试!");
				   		          				$('#tvsms_title').attr('class','tips_e');
													return;
				   		          				}
				   		          			}
				    		          	});
									}else if(response == 1){
										$('#checktel_Tv2').attr('class','tips_e');
										setHtml('checktel_Tv2','您输入的手机号码已被验证，请致电客服咨询');
									}else if(response == 2){
										$('#checktel_Tv2').attr('class','tips_e');
										setHtml('checktel_Tv2','您输入的姓名与手机号码不匹配或有误，请致电顾客中心');
									}else if(response == 3){
										 $('#regist_output4').css({'margin-left':'-200px'});
										 $('.regist_tips_overlay').css({'display':'block'});
									}
								}
					});

	}
	
}


function changemobile(id,show_id) {
	  var mobile = $('#mobile').val();
	  if(!btn_show){
	  if (mobile=="" ){
		  $("#"+show_id).hide();
         $("#"+id).show();
         return;
	  }    
	  if (mobile!=""){
		  if (mobile.length != 11) {				        
			  $("#"+show_id).hide();
		         $("#"+id).show();
		         return ;
		  }
		 if (!CheckType(mobile, NUM)) {	
			 $("#"+show_id).hide();
	         $("#"+id).show();
		        return ;
		 } 
		  if(!mobile.match(reg)){
			  $("#"+show_id).hide();
		         $("#"+id).show();
			        return ;
		}
	    $.ajax({
	      type : "POST",
	      url : "/customers/fieldCheck",  
	      data : "action=checkHisHp&mobile=" + mobile,
	      success : function(msg) {
	        if (msg == '0') {            
	         $("#"+id).hide();
	         $("#"+show_id).show();
	        }else if(msg== '2'){
	        	 $("#"+show_id).hide();
		         $("#"+id).show();
	        }else{
	        	$("#"+show_id).hide();
		         $("#"+id).show();
	        }
	      }
	    });
	  }
	  }
}

function  tvchangemobile(id,show_id) {
	
	var cust_name_tv = $("#cust_name_tv").val();
	var tel_Tv2 = $("#tel_Tv2").val();
	if(!istv_btn_show){
	//电视用户登录 先检查电话号码 再根据三项信息判断能否注册
	if(tel_Tv2 == ""){
		$("#"+show_id).hide();
        $("#"+id).show();
		return false;
	}else if(!tel_Tv2.match(reg)){
		  $("#"+show_id).hide();
	        $("#"+id).show();
			return false;
	}else if(tel_Tv2.length < 11){
		$("#"+show_id).hide();
        $("#"+id).show();
		return false;
	}else if(!CheckType(tel_Tv2,NUM)) {
		$("#"+show_id).hide();
        $("#"+id).show();
		return false;
	}else{
		$.ajax({
			type : "POST",
			url : "/customers/fieldCheck", 
			data : {
				"action" : "checkUser",
				"custName" : cust_name_tv,
				"telTv" : tel_Tv2
			},
			success : function(response) {
				response = response.replace(/\r\n/ig,"");
				if(response=="" || response==null){
					$("#"+id).hide();
					$("#"+show_id).show();
				}else if(response == 1){
					$("#"+show_id).hide();
			        $("#"+id).show();
				}else if(response == 2){
					$("#"+show_id).hide();
			        $("#"+id).show();
				}else if(response == 3){
					$("#"+id).hide();
					$("#"+show_id).show();
				}
			}
		});
		}
	}
}

