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


var clear_float = document.getElementsByClassName("how_clear_float")[0];
var horarr;
var status = [200,304];
var horxhr = new XMLHttpRequest();
horxhr.onreadystatechange = function(){
    if(horxhr.readyState == 4 && status.indexOf(horxhr.status) != -1){
        horarr = JSON.parse(horxhr.responseText);
        console.log(horarr);
        GoodsHor()
    }
}
horxhr.open("get","../api/goods_hot_list.php",true);
horxhr.send(null);

function GoodsHor(){
    clear_float.innerHTML = horarr.map(function(item){
        return '<li>'+
              '<a href="#" title="'+item.title+'" target="_blank">'+
                '<img src="'+item.img+'" alt="'+item.alt+'" width="80px" height="80px">'+
                '<span class="topic">'+item.nema+'</span></a>'+
            '</li>'
    })
}