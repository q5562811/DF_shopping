jQuery(function($){
    /*登陆开始*/
    var $loginuser = $("#loginid");
    var $loginpwd = $("#password");
    var $logincode = $("#security");
    var $GetCode = $(".valcode_refresh");
    var $btnLogin = $(".submit");
/*获取验证码*/
    $GetCode.html(getCode());
    $GetCode.on("click",function(){
         $(this).val(getCode());
    })
/*聚焦去掉提示*/
    $loginuser.on("focus",function(){
        $(this).next().html("");
    })
    $loginpwd.on("focus",function(){
        $(this).next().html("");
    })
    $logincode.on("focus",function(){
        $(this).next().next().next().html("");
    })
    $btnLogin.on("click",function(e){
        e.preventDefault();
        var user = $loginuser.val();
        var pwd = $loginpwd.val();
        if(user.length ==""){
            $loginuser.next().html("请输入用户名").css("color","red");
        }
        if(pwd.length ==""){
            $loginpwd.next().html("请输入密码").css("color","red");
        }
        if($logincode.val() == $GetCode.html()){
            console.log(28173)
            $.post("../api/login.php",{"user":user,"pwd":pwd,"type":"登陆"},function(data){
                if(data){
                    Cookie.setCookie("user",JSON.parse(data)[0].username,"","/");
                    location.href = "../index.html";
                }else{
                    // $loginpwd.next().html("用户名或密码输入错误，请您重新输入").css("color","red");
                    alert("用户名或密码输入错误，请您重新输入");
                }
            })
        }else{
            $GetCode.next().next().html("验证码输入错误").css("color","red");
        }
        if($logincode.val().length ==""){
            $logincode.next().next().next().html("请输入验证码").css("color","red");
        }
        $GetCode.html(getCode());
    })
/*登陆结束*/
})