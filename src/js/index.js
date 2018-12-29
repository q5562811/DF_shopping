/*获取用户名cookie*/
    var user_name = Cookie.getCookie("user") || null;
    if(user_name){
        $("#denglu").html(user_name);
        $("#tuichubb").html('<a href="" id="tuichu">退出</a>');
    }
    $("#tuichu").on("click",function(e){
        e.preventDefault();
        location.reload();
        Cookie.delCookie("user","/");
    })

// 主播推荐-右
var anchor_l = document.getElementsByClassName("anchor-l")[0];
var zbarr_l;
var status = [200,304];
var xhrL = new XMLHttpRequest();
xhrL.onreadystatechange = function(){
    if(xhrL.readyState == 4 && status.indexOf(xhrL.status) != -1){
        zbarr_l = JSON.parse(xhrL.responseText);
        console.log(zbarr_l);
        renderGoodsL();
    }
}
xhrL.open("get","../api/index-mysql-L.php",true);
xhrL.send(null);

function renderGoodsL(){
    anchor_l.innerHTML = zbarr_l.map(function(item){
        return '<div class="anchor-l-img">'+
                '<a href="#"><img src="'+item.img+'" alt="" /></a>'+
                '<b><a href="#">'+item.name+'</a></b><br/>'+
                '<p>￥<span>'+item.money+'</span></p>'+
            '</div>'+
            '<h3>'+item.recommend+'</h3>'+
            '<p class="anchor-l-p">'+item.recommend_what+'</p>'
    })
}

// 主播推荐-右
var anchor_r = document.getElementsByClassName("anchor-r-ul")[0];
var zbarr_r;
var xhrR = new XMLHttpRequest();
xhrR.onreadystatechange = function(){
    if(xhrR.readyState == 4 && status.indexOf(xhrR.status) != -1){
        zbarr_r = JSON.parse(xhrR.responseText);
        console.log(zbarr_r);
        renderGoodsR();
    }
}
xhrR.open("get","../api/index-mysql-R.php",true);
xhrR.send(null);

function renderGoodsR(){
    anchor_r.innerHTML = zbarr_r.map(function(item,idx){
        return '<li class="anchor-r-li'+idx+'">'+
                    '<a href="#"><img src="'+item.img+'" alt="" /></a>'+
                    '<a href="#">东滩绿港 大米组合（3+1）</a>'+
                    '<p>￥<span id="sp1">299</span></p>'+
                '</li>'     
    })
}