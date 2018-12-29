/**
 * Created by admin on 15/5/21.
 */
var websystem=function(){
    this.ismoving=false;
    this.w=$(window).width();
    this.h=$(window).height();
};

/*
 * pc设置轮播
 * arg0=被轮的对象
 * arg1=参数配置
 * */
websystem.prototype.setslick=function(its,obj){
    if(its.data("setslick")){
        //console.log(12311);
        its.slick('setPosition');
        return;
    }
    its.data({"setslick":true});
    obj.fade=true;
    obj.speed=500;
    if(obj.setColorDiv){
        var colorArray=[];
        its.find("div").each(function(){
            colorArray.push($(this).data("changecolor"));
        });
    }
    var sa="";
    var sb="";
    if(obj.controlPos){
        sa='style="left: '+obj.controlPos[0]+'px;"';
        sb='style="right: '+obj.controlPos[1]+'px;"';
    }
    obj.prevArrow='<div class="slick-prev"'+sa+'><div class="hJiantouImgL"></div>' +
        '<div class="slicknumsbuttonL">1/2</div></div>';
    obj.nextArrow='<div class="slick-next"'+sb+'><div class="hJiantouImgR"></div>' +
        '<div class="slicknumsbuttonR">1/3</div></div>';

    its.on('init', function(event, slick, direction){
        if(obj.setColorDiv){
            TweenLite.to(obj.setColorDiv,.3,{"backgroundColor":colorArray[slick.currentSlide]});
        }
        var nowNuml=slick.currentSlide-1;
        var nowNumr=slick.currentSlide+1;
        if(nowNuml<0){
            nowNuml=slick.slideCount-1;
        }
        if(nowNumr>(slick.slideCount-1)){
            nowNumr=0;
        }
        $(this).find(".slicknumsbuttonL").html('<span>'+Number(nowNuml+1)+'</span>'+'/'+slick.slideCount);
        $(this).find(".slicknumsbuttonR").html('<span>'+Number(nowNumr+1)+'</span>'+'/'+slick.slideCount);
        its.find(".slick-prev").hover(function(){

            TweenLite.to($(this),.3,{"width":73});
        },function(){
            TweenLite.to($(this),.3,{"width":23});
        });
        its.find(".slick-next").hover(function(){
            TweenLite.to($(this),.3,{"width":73});
        },function(){
            TweenLite.to($(this),.3,{"width":23});
        });
        if(obj.arrows==undefined){
            TweenLite.to(its.find(".slick-prev"),.5,{alpha:0});
            TweenLite.to(its.find(".slick-next"),.5,{alpha:0});
            its.hover(function(){
                TweenLite.to(its.find(".slick-prev"),.5,{alpha:1});
                TweenLite.to(its.find(".slick-next"),.5,{alpha:1});
            },function(){
                TweenLite.to(its.find(".slick-prev"),.5,{alpha:0});
                TweenLite.to(its.find(".slick-next"),.5,{alpha:0});
            });
        }

    });

    if(obj.setColorDiv){
        its.on('beforeChange', function(event, slick , currentSlide, nextSlide){
            TweenLite.to(obj.setColorDiv,.3,{"backgroundColor":colorArray[nextSlide]});
        });
    }
    its.on('afterChange', function(event, slick, direction){
        var nowNuml=slick.currentSlide-1;
        var nowNumr=slick.currentSlide+1;
        if(nowNuml<0){
            nowNuml=slick.slideCount-1;
        }
        if(nowNumr>(slick.slideCount-1)){
            nowNumr=0;
        }
        $(this).find(".slicknumsbuttonL").html('<span>'+Number(nowNuml+1)+'</span>'+'/'+slick.slideCount);
        $(this).find(".slicknumsbuttonR").html('<span>'+Number(nowNumr+1)+'</span>'+'/'+slick.slideCount);
    });
        its.slick(obj);
}

/*全局一个video＝hvideo
 * playbutton
 * bevideobutton
 * */
websystem.prototype.videoplay=function(playbutton,bevideobutton){
    $("body").bind("DOMNodeInserted",function(e){
        var tg=$(e.target);
        if(tg.hasClass(playbutton)){
            console.log("插入新视频");
            playVideo(tg.find(playbutton),tg.find(bevideobutton));
        }
    });

    $(playbutton).each(function(i){
        //console.log(i,playbutton);
        playVideo($(this),$(bevideobutton).eq(i));
    });

    function playVideo(tg,vg){
        if(tg.data("hasvideoevent")){
            return;
        }
        tg.data("hasvideoevent",true);
        tg.bind("tap",function(e){
            if(typeof (hvideo) !='undefined'){
                hvideo.playbutton.css({'display':'block'});
                hvideo.bevideobutton.css({'display':'none'});
                hvideo.bevideobutton.empty();
                //hvideo={"playbutton":tg,"bevideobutton":vg};
            }
            tg.css({"display":"none"});
            vg.css({'display':'block'});
            if(vg.data("videourl")){
                vg.append('<video controls="controls" autoplay="true" webkit-playsinline src="'+vg.data("videourl")+'"></video>');
                /*vg.find("video")[0].addEventListener("play",function(e){
                 if(typeof (hvideo) !='undefined'){
                 if(hvideo!= e.target){
                 hvideo.pause();
                 }
                 }
                 hvideo= e.target;
                 });*/
                hvideo={"playbutton":tg,"bevideobutton":vg};
            }
            e.preventDefault();
            e.stopPropagation();
        });
    }
}

websystem.prototype.setLinktoHref=function(tag){
    if(tag.data("linka")){
        if(!tag.data("bindlinka")){
            tag.data({"bindlinka":true});
            tag.bind("tap",function(e){
                window.location.href=tag.data("linka");
                e.preventDefault();
                e.stopPropagation();
            });
        }
    }
}

websystem.prototype.setBgColr=function(tag){
    if(tag.data("hbgcolor")){
        var co=tag.data("hbgcolor").toString();//tag.data("hbgcolor")
        var a;
        var r;
        var g;
        var b;
        if(co.length>7){
            r=parseInt(co.substring(1,3),16);
            g=parseInt(co.substring(3,5),16);
            b=parseInt(co.substring(5,7),16);
            a=Number(parseInt(co.substring(7,9),16)/255).toFixed(2);
            console.log(a);
            TweenLite.set(tag,{'backgroundColor':'rgba('+r+','+g+','+b+','+a+')'});
        }else{
            r=parseInt(co.substring(1,3),16);
            g=parseInt(co.substring(3,5),16);
            b=parseInt(co.substring(5,7),16);
            TweenLite.set(tag,{'backgroundColor':'rgb('+r+','+g+','+b+')'});
        }

    }
}


/*
 * it.navName-jquery
 * it.navListName-string
 * it.froceName-string
 * it.baseId-number
 *
 * callback(e)-e:jquery//clickitem
 * */
websystem.prototype.navlistChange=function(it,callback){
    var _this=this;
    function ints(it,callback){
        var t_this=this;
        this.len=$(''+it.navName+'').find(''+it.navListName+'').length;
        this.nowId=-1;
        var ob=[];
        $(''+it.navName+'').find(''+it.navListName+'').each(function(i){
            ob.push($(this));
            $(this).bind("tap",function(e){
                if(_this.ismoving){
                    return;
                }
                if($(this).index()==t_this.nowId){
                    return;
                }
                //callback($(this),nowId);
                idToShow($(this).index());
                e.preventDefault();
                e.stopPropagation();
            });
        });
        idToShow(it.baseId);
        function idToShow(ids){
            if(t_this.nowId!=-1){
                ob[t_this.nowId].removeClass(it.froceName);
            }
            callback(ob[ids],t_this.nowId);
            ob[ids].addClass(it.froceName);
            t_this.nowId=ids;
            var t=$(window).scrollTop();
            $(window).scrollTop(t-1);
            $(window).scrollTop(t);

        }

        this.setIdToDo=function(ids){
            idToShow(ids);
        }
        this.buttonArray=ob;
    }


    return new ints(it,callback);
}

/*
 * navChangeName==string被顯示的對象
 * */
websystem.prototype.navChangeDisplayBlock=function(it,callback){
    this.navlistChange(it,function(ob,oldid){
        $(''+it.navName+'').find(''+it.navChangeName+'').eq(oldid).css({"display":"none"});
        $(''+it.navName+'').find(''+it.navChangeName+'').eq(ob.index()).css({"display":"block"});
        if(callback){
            callback();
        }
    });
}


websystem.prototype.ajaxLoaditem=function(url,callback){
    var _this=this;
    _this.ismoving=true;
    $.ajax({type: "GET",
        url: url,
        dataType: "text",
        success: function(e){
            callback(e);
            _this.ismoving=false;
        }});
}

websystem.prototype.setbacktop=function(){
    var _this=this;
    if($(".hbacktop").length<=0){
        $("body").append('<div class="hbacktop"><img src="cssimage/indeximg/backtop.png" /></div>');
    }
    if($(".hbacktop").length>0){
        $(".hbacktop").bind("tap",function(e){
            $(window).scrollTop(0);
            e.preventDefault();
            e.stopPropagation();
        });
        $(window).bind("scrollstop",function(){
            //console.log(_this.h,$(window).scrollTop());
            if($(window).scrollTop()>_this.h){
                $(".hbacktop").css({"display":"block"});
            }else{
                $(".hbacktop").css({"display":"none"});
            }
        });
    }

}

//点一下换一波图
websystem.prototype.clickToChangeShow=function(beChangeItem,clickButton){
    if(beChangeItem.length<=1){
        beChangeItem.css({"display":"block"});
        return;
    }

    var ary=[];
    var nowids=-1;
    var isLocalMove=false;
    beChangeItem.each(function(){
        ary.push($(this));
    });
    clickButton.bind("tap",function(){
        var tgids=nowids+1;
        if(tgids>(ary.length-1)){
            tgids=0;
        }
        idToShow(tgids);
    });
    idToShow(0);
    function idToShow(newids){
        if(isLocalMove){
            return;
        }
        isLocalMove=true;
        if(nowids!=-1){
            TweenLite.set(ary[nowids],{"display":"none","opacity":0});
        }
        TweenLite.set(ary[newids],{"display":"block","opacity":0,onComplete:function(){
            TweenLite.to(ary[newids],.5,{"opacity":1,onComplete:function(){
                nowids=newids;
                isLocalMove=false;
                var t=$(window).scrollTop();
                $(window).scrollTop(t-1);
                $(window).scrollTop(t);
                //$("body").scrollTop(t);
                /*if(typeof ($("body").lazyload)=='undefined'){
                    return;
                }
                ary[nowids].find("img.lazyloadnew").lazyload({
                    appear : function(elements, settings) {

                    },
                    load : function(elements, settings) {
                        var tg=$(this);
                        if((tg.width()/tg.height())<1){
                            tg.css({"width":"auto","height":tg.parents(".hItemShowImg").width(),"display":"inline"});
                        }
                    }
                });*/

            }});
        }});

    }
}

websystem.prototype.indexNavControl=function(it){
    $(".hIndexLeftNavShowContentModule").css({"opacity":0});
    $(".hIndexLeftNavInfoList").each(function(s){
        var _this=$(this);
        var nowLen;
        var ary;
        var jsid;
        $(this).find(".hIndexLeftNavInfoListContent").each(function(t){
            if(t==0){
                jsid=0;
                ary=[];
                nowLen=0;
                ary.push($('<div class="hIndexLeftNavInfoListContentPar"></div>'));
            }
            nowLen+=$(this).outerHeight(true);
            /*if(s==1){
                console.log(nowLen,$(this).outerHeight(true));
            }*/
            if(nowLen>560){
                jsid++;
                nowLen=0;
                ary.push($('<div class="hIndexLeftNavInfoListContentPar"></div>'));
                nowLen+=$(this).outerHeight(true);
            }
            ary[jsid].append($(this));
        });
        for(var v=0;v<ary.length;v++){
            _this.append(ary[v]);
        }
    });

    //$(".hIndexLeftNavShowContentModule").eq(0).css({opacity: 1,"zIndex":3});
    //return;
    var $menu = it;
    var nowRow;

    $(".indexLeftNavBoxButton a").each(function(){

        if($(this).attr("style")!=undefined){
            $(this).data({"c":true});
        }
    });
    var hha=$menu.menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu,
        exitMenu:function(e){
            var ss=e.pageX-$menu.offset().left;
            if((ss>$menu.outerWidth()-5)){
                return false;
            }else{
                return true;
            }
        },
        rowSelector: ">.indexLeftNavBox"
    });

    $(".hIndexLeftNavShowContentModule").mouseleave(function(e){
        var ss=e.pageX-$(this).offset().left;
        if(ss>10){
            $(this).css({opacity: 0,"zIndex":1});
            if(nowRow){
                nowRow.find(".indexLeftNavBoxMask").css({display: "none"});
                if(nowRow.find(".hindexleftNavjiaobiao").length>0){
                    nowRow.find(".hindexleftNavjiaobiao").css({display: "none"});
                }else{
                    nowRow.find("a").each(function(){
                        if(!$(this).data("c")){
                            $(this).css({"color":"#333"});
                        }
                    });
                    nowRow.find(".hiconfont").css({"color":"#333"});

                }


            }
            $(".indexLeftNav").removeClass("indexLeftNavshadow");
            hha.mouseleaveMenu();
        }
    });

    function activateSubmenu(row) {

        var $row = $(row),
            $submenu = $(".hIndexLeftNavShowContentModule").eq($row.index());
        nowRow=$row;
        // Show the submenu
        $submenu.css({opacity: 1,"zIndex":3});

        // Keep the currently activated row's highlighted look
        $row.find(".indexLeftNavBoxMask").css({display: "block"});
        if($row.find(".hindexleftNavjiaobiao").length>0){
            $row.find(".hindexleftNavjiaobiao").css({display: "block"});
        }else{
            nowRow.find("a").each(function(){
                if(!$(this).data("c")){
                    $(this).css({"color":"#239cdc"});
                }
            });
            //$row.find("a").css({"color":"#239cdc"});
            $row.find(".hiconfont").css({"color":"#239cdc"});
        }
        if(!$row.hasClass("indexLeftNavBoxBg")){
            $(".indexLeftNav").addClass("indexLeftNavshadow");
        }

    }

    function deactivateSubmenu(row) {

        var $row = $(row),
            $submenu = $(".hIndexLeftNavShowContentModule").eq($row.index());

        // Hide the submenu and remove the row's highlighted look
        $submenu.css({opacity: 0,"zIndex":1});
        $row.find(".indexLeftNavBoxMask").css({display: "none"});
        if($row.find(".hindexleftNavjiaobiao").length>0){
            $row.find(".hindexleftNavjiaobiao").css({display: "none"});
        }else{
            //$row.find("a").css({"color":"#333"});
            nowRow.find("a").each(function(){
                if(!$(this).data("c")){
                    $(this).css({"color":"#333"});
                }
            });
            $row.find(".hiconfont").css({"color":"#333"});
        }

        $(".indexLeftNav").removeClass("indexLeftNavshadow");
    }
}

/*
 * it.froceClass
 * it.baseClass
 * it.hoverItem:juqyerObj
 * */
websystem.prototype.mouseenterAddMove=function(it){
    if(it.hoverItem.find(".indexTvreboLeftConentSmallItemTitle").length>0){
        it.hoverItem.each(function(){
            $(this).find(".indexTvreboLeftConentSmallItemTitle").css("top",($(this).height()-$(this).find(".indexTvreboLeftConentSmallItemTitle").height())/2);
        });
    }

    if(this.islowIe()){
        it.hoverItem.mouseenter(function(){
            var tg=$(this);
            it.hoverItem.each(function(i){
                if(i==it.hoverItem.index(tg)){
                    $(this).addClass(it.froceClass);
                }else{
                    $(this).removeClass(it.froceClass);
                }
            });
        });
    }else{
        it.hoverItem.mouseenter(function(){
            var tg=$(this);
            it.hoverItem.each(function(i){
                //console.log(it.hoverItem.index(tg));
                if(i==it.hoverItem.index(tg)){
                    TweenMax.to($(this),.3,{className:it.baseClass+' '+it.froceClass});
                }else{
                    TweenMax.to($(this),.3,{className:it.baseClass});
                }
            });
        });
    }

}

websystem.prototype.maodianPageMove=function(){
    var bePage=[];
    var clickList=[];
    var flightname="flightname";
    if($(".hindexProjectListConent .hindexProjectListBox").length<=0){
    	return;
    }
    $(".rightFixNavButton .rightFixNavButtonLink").each(function(ids){
        $(this).data({"id":ids});
        clickList.push($(this));
        //.rightFixNavButtonLink:hover{background-color: #fb4255; color: #ffffff;}
        //.rightFixNavButtonLink:hover a{ color: #ffffff;}
        $(this).hover(function(){
            TweenLite.to($(this),.3,{"backgroundColor":"#fb4255"});
            TweenLite.to($(this).find("a"),.3,{"color":"#ffffff"});
        },function(){
            if(!$(this).hasClass(flightname)){
                TweenLite.to($(this),.3,{"backgroundColor":"#ffffff"});
                TweenLite.to($(this).find("a"),.3,{"color":"#3c3c3c"});
            }
        });
        $(this).bind("tap",function(){
            idToMoveTarget($(this).data("id"));
        });
    });
    
    for(var s=0;s< $(".rightFixNavButton .rightFixNavButtonLink").length;s++){
        bePage.push($(".hindexProjectListConent .hindexProjectListBox").eq(s));
    }
    $(window).bind("scrollstop",stopScrollToDo);

    function stopScrollToDo(){
        var t=$(window).scrollTop();
        var nowid=rangeBackId(t);
        if(nowid!=-1){
            for(var i=0;i<clickList.length;i++){
                if(i==nowid){
                    clickList[i].addClass(flightname);
                    TweenLite.set(clickList[i],{"backgroundColor":"#fb4255"});
                    TweenLite.set(clickList[i].find("a"),{"color":"#ffffff"});
                }else{
                    clickList[i].removeClass(flightname);
                    TweenLite.set(clickList[i],{"backgroundColor":"#ffffff"});
                    TweenLite.set(clickList[i].find("a"),{"color":"#3c3c3c"});
                }
            }
        }else{
            for(var i=0;i<clickList.length;i++){
                clickList[i].removeClass(flightname);
                TweenLite.set(clickList[i],{"backgroundColor":"#ffffff"});
                TweenLite.set(clickList[i].find("a"),{"color":"#3c3c3c"});
            }
        }
    }

    function idToMoveTarget(ids){
        var t=Math.floor(bePage[ids].offset().top-$(window).height()/2+200);
        for(var i=0;i<clickList.length;i++){
            if(i==ids){
                clickList[i].addClass(flightname);
                TweenLite.set(clickList[i],{"backgroundColor":"#fb4255"});
                TweenLite.set(clickList[i].find("a"),{"color":"#ffffff"});
            }else{
                clickList[i].removeClass(flightname);
                TweenLite.set(clickList[i],{"backgroundColor":"#ffffff"});
                TweenLite.set(clickList[i].find("a"),{"color":"#3c3c3c"});
            }
        }
        TweenLite.to(window,.5,{scrollTo:t,onComplete:function(){
            stopScrollToDo();
        }});
    }

    function rangeBackId(ids){
        var rrr=-1;
        for(var i=0;i<bePage.length;i++){
            var tg=bePage[i];
            if(!tg){
                return -1;
            }
            /*if(tg.offset()==undefined){
                return -1;
            }*/
            if(ids>=(tg.offset().top-$(window).height()/2+195)&&ids<(tg.offset().top+tg.outerHeight(true)-$(window).height()/2+195)){
                rrr=i;
                break;
            }
        }
        return rrr;
    }

}

websystem.prototype.islowIe=function(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if(Sys.ie){
        if (Sys.ie=="6.0"||Sys.ie=="7.0"){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

//---ajaxgengxin
websystem.prototype.update=function(tg){
    tg.find("div").each(function(i){
        hcmd.setBgColr($(this));
        hcmd.setLinktoHref($(this));
    });

    tg.find("img.lazyloadnew").lazyload({
        data_attribute:"kitten",
        appear : function(elements, settings) {

        },
        load : function(elements, settings) {
            var tg=$(this);
            if((tg.width()/tg.height())<1){
                tg.css({"width":"auto","height":tg.parents(".hItemShowImg").width(),"display":"inline"});
            }
        },skip_invisible : false
    });

    //---滚动
    if(tg.find(".silderNav").length>0){
        tg.find(".silderNav").each(function(i){
            if($(this).hasClass("hindexbannerBox0")){
                hcmd.setslick($(this),{
                    //setColorDiv:$(".setColorChange"),
                    autoplay: true,
                    speed:1000,
                    controlPos:[605,602],
                    autoplaySpeed: 5000,
                    dots:true
                });
            }else{
                hcmd.setslick($(this),{
                    autoplay: true,
                    autoplaySpeed: 5000,
                    dots:true
                });
            }

        });
    }




    if(tg.find(".hindexhuiyuanConentShowIconList .hindexhuiyuanConentShowIconListItem").length>0){
        tg.find(".hindexhuiyuanConentShowIconList .hindexhuiyuanConentShowIconListItem").hover(function(){
            var _this=$(this);
            TweenLite.to(_this.find(".hindexhuiyuanConentShowIconListItemTitel"),.2,{color:"#239CDC"});
            TweenMax.to(_this.find(".hindexhuiyuanConentShowIconListItemImg"),.2,{top:-10});
        },function(){
            var _this=$(this);
            TweenMax.to(_this.find(".hindexhuiyuanConentShowIconListItemImg"),.2,{top:0});
            TweenLite.to(_this.find(".hindexhuiyuanConentShowIconListItemTitel"),.2,{color:"#424242"});
        });
    }

    if(tg.find(".hindexProjectListBoxLeftConent1 .foodIconList").length>0){
        tg.find(".hindexProjectListBoxLeftConent1 .foodIconList").hover(function(){
            var _this=$(this);
            TweenLite.to(_this.find(".foodIconListText a"),.2,{color:"#239CDC"});
            TweenMax.to(_this.find(".foodIconListImg"),.2,{top:-10});
        },function(){
            var _this=$(this);
            TweenMax.to(_this.find(".foodIconListImg"),.2,{top:0});
            TweenLite.to(_this.find(".foodIconListText a"),.2,{color:"#424242"});
        });
    }

    if(tg.find(".hindexProjectListBoxLeftConent2ListContentimg").length>0){
        tg.find(".hindexProjectListBoxLeftConent2ListContentimg img").hover(function(){
            var _this=$(this);
            TweenMax.to(_this,.5,{top:-10});
        },function(){
            var _this=$(this);
            TweenLite.to(_this,.5,{top:0});
        });
    }
}

//---字幕滚动
websystem.prototype.zimugundong=function(tg){
    if(tg.find("div").length<=1){
        return;
    }
    domove();
    function domove(){
        TweenLite.to(tg.find("div").eq(0),1,{marginTop:tg.find("div").eq(0).outerHeight(true)*-1,delay:2,onComplete:function(){
            var s=tg.find("div").eq(0);
            tg.append(s);
            s.css({"marginTop":0});
            domove();
        }});
    }
}
