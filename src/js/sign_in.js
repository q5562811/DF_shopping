/*注册开始*/
    var $txtRegUserName = $("#mobile");
    var $txtRegPassword = $("#password");
    var $txtRePassword = $("#confirm_pwd");
    var $txtVerifyCode = $("#smshp"); 
    var $btnUserRegSubmit = $("#btnSubmit");
    var $getCode = $("#addressBtn");
    var $checkMobileId = $("#checkMobileId");
    var $sms_title = $("#sms_title");
    var $checkPwd = $("#checkPwd");
    var $checkPwd2 = $("#checkPwd2");
    var $field = $(".field");
    var $sms_title = $("#sms_title");
    var $agree = $("#readed");
    var $label = $("#fwtk");
    var $userState;
    var $pwdState;
    var $pwd2State;
    var $codeState;

/*获取验证码*/
    $getCode.html(getCode());
    $getCode.on("click",function(){
         $(this).html(getCode());
    })
/*手机聚焦*/
    $txtRegUserName.on("focus",function(){
        $(this).parent().next().html("只能使用数字").css("color","#515151");
        console.log(555);
    })
/*手机判断*/
    $txtRegUserName.on("blur",function(){
        var $user = this.value;
        if(!(/^1[34578]\d{9}$/.test($user))){
            $(this).parent().next().html("fuck!用户名有误").css("color","red");
            $userState = false;
        }else{
            $.post("../api/login.php",{"user":$user},(data)=>{
                $(this).parent().next().html(data).css("color","#45F671");
                $userState = true;
                if(data == "该用户名已被注册"){
                    $(this).parent().next().css("color","red");
                    $userState = false;
                }
            });
        }
    })
/*密码聚焦*/
    $txtRegPassword.on("focus",function(){
        $(this).parent().next().html("用户名的长度应为6个字符以上！前后不能为空格").css("color","#515151");
    })
/*密码判断*/
    $txtRegPassword.on("blur",function(){
        var $pwd = this.value.trim();
        if($pwd.length <6){
            $(this).parent().next().html("密码不符合要求").css("color","red");
            $pwdState = false;
        }else{
            $(this).parent().next().html("√").css("color","#45F671");
            $pwdState = true;
        }
    })
/*重复密码判断*/
    $txtRePassword.on("blur",function(){
        var $pwd = this.value.trim();
        if($pwd != $txtRegPassword.val()){
            $(this).parent().next().html("密码不一致").css("color","red");
            $pwd2State = false;
        }else{
            $(this).parent().next().html("√").css("color","#45F671");
            $pwd2State = true;
        }
    })
/*验证码判断*/
    $txtVerifyCode.on("blur",function(){
        var $code = $(this).val().trim();
        if($code == ""){
            $sms_title.html("验证码不能为空").css("color","red");
            $codeState = false;
        }else  if($code != $getCode.html()){
            $sms_title.html("验证码输入错误").css("color","red");
            $codeState = false;
        }else if($code == $getCode.html()){
            $sms_title.html("√").css("color","#45F671")
            $codeState = true;
        }
    })
/*条款判断*/
$agree.on("change",function(){
    if(!this.checked){
        $label.html("请接受服务条款").css("color","red");
    }else{
        $label.html("");
    }
})
/*注册提交判断*/
    $btnUserRegSubmit.on("click",function(e){
        e.preventDefault();
        var $state = $userState&&$pwdState&&$pwd2State&&$codeState;
        if($state){
            if($agree.prop("checked")){
                var register =true;
                var user = $txtRegUserName.val();
                var pwd = $txtRegPassword.val();
                $.post("../api/login.php",{"user":user,"pwd":pwd,"register":register},function(data){
                    if(data){
                        location.href = "../index.html";
                    }
                })
            }else{
                $label.html("请接受服务条款");
            }
        }
    })
/*注册结束*/
