
$(function(){
    $('html,body').scrollTop('0');
    var gLazyImages = $( 'img[data-original]').css({display:'block',background:'url(http://cdnimg.ocj.com.cn/common/theme/v1/images/bg.loading.1.gif) no-repeat 50% 50%'});
    $( 'img[data-original]:visible' ).imglazyload({
        event : 'scroll',
        fadeIn: true,
        attr : 'data-original'
    });

    gLazyImages.not('img:visible').one( 'lazyload', function(){
        $(this).imglazyload({attr : 'data-original'});
    });

    if(typeof (hcmd)=='undefined'){
        hcmd=new websystem();
        hcmd.update($("body"));
    }
    $(".silderNavNoControl").each(function(i){
        hcmd.setslick($(this),{
            autoplay: true,
            autoplaySpeed: 5000,
            arrows:false,
            dots:true
        });
    });
    
    $('.g-header-tv-table').find('img.adaptive').imgAdaptive({parentWidth:60,parentHeight:60});

    $(".g-logo-slider").autoSliderH({time:2000,direct:false,ifArr:false});

    /*ocj-family功能暂时不上线 start*/
    /*
    var gLogosBox = $('.g-header-logos-box');
    var gLogos = $('.g-header-logos');

    $( '.g-family' ).bind('click',function(){
        if($(this).find('b').hasClass('icon-arrow-down9')) {
            $(this).find('b').removeClass('icon-arrow-down9').addClass('icon-arrow-up8');
            gLogos.triggerLazyImg();
            gLogosBox.stop().animate({'height':'81px'});
            gLogos.stop().animate({'top':'0px'});
        }
        else {
            $(this).find('b').removeClass('icon-arrow-up8').addClass('icon-arrow-down9');
            gLogosBox.stop().animate({'height':'0'});
            gLogos.stop().animate({'top':'-81px'});
        }
    });
     */
    /*ocj-family功能暂时不上线 end*/

    var gHeaderMenu = $('.g-header-menu');
    var allCatalog = gHeaderMenu.find('.g-all-catalog');
/*    var allCatalogTab = gHeaderMenu.find('.g-all');
    gHeaderMenu.delegate('.g-all','click',function(e){
        if(allCatalogTab.hasClass('cur')){
            allCatalogTab.find('b').addClass('icon-arrow-down9').removeClass('icon-arrow-up8')
        }
        else {
            allCatalogTab.find('b').removeClass('icon-arrow-down9').addClass('icon-arrow-up8');
            var allCatalogTop = ifHeaderBannerClose ? 116 : 196;
            $('body').scrollTop(allCatalogTop);
        }
        allCatalog.toggle();
        allCatalog.triggerLazyImg();
        $(this).toggleClass('cur');
        return false
    });*/
 /*   gHeaderMenu.delegate('.close-menu','click',function(e){
        allCatalog.toggle();
        allCatalogTab.toggleClass('cur');
        if(allCatalogTab.hasClass('cur')){
            allCatalogTab.find('b').removeClass('icon-arrow-down9').addClass('icon-arrow-up8')
        }
        else {
            allCatalogTab.find('b').addClass('icon-arrow-down9').removeClass('icon-arrow-up8')
        }
        return false
    });*/
    //这句会导致点击分类的链接不跳转,但如果不写,会造成点击分类的空白处,分类会收起
    /*
    gHeaderMenu.delegate('.g-all-catalog','click',function(e){
        return false
    });
    */
/*    $('body').bind('click',function(){
        allCatalog.hide();
        if(allCatalogTab.hasClass('cur')){
            allCatalogTab.removeClass('cur');
            allCatalogTab.find('b').removeClass('icon-arrow-up8').addClass('icon-arrow-down9')
        }
        else {
            return
        }
    });*/


    /*销售排行榜功能,暂不上线 start*/
    /*
    var gHotList = $('.g-hotlist');
    var gHotListUl = gHotList.find('ul');
    var gHotListIndex = 0;

    gHotList.bind('mouseenter',function(){
        clearInterval(gHotListAutoSlide);
        gHotListAutoSlide = null;
        $(this).find('.g-hotlist-content').css({'border':'1px solid #495164','height':'206px','boxShadow':'2px 2px 0 rgba(0,0,0,0.1)'});
        gHotListUl.stop().css({'top':'-1px',left:'-1px'})
    });

    gHotList.bind('mouseleave',function(){
        $(this).find('.g-hotlist-content').css({'border':'none','height':'22px','boxShadow':'none'});
        gHotListUl.css({'top':-gHotListIndex*20+'px',left:'0'});
        gHotListAutoSlide = setInterval(function(){
            gHotListIndex = gHotListIndex==9 ? 0 : ++gHotListIndex;
            gHotListAuto(gHotListIndex);
        },3000)
    });

    var gHotListAuto = function(i){
        if(i==0){
            gHotListUl.stop().css({'top':'20px'}).animate({'top':'0'},150);
        }
        gHotListUl.animate({'top':-i*20+'px'},150);
    };

    var gHotListAutoSlide = setInterval(function(){
        gHotListIndex = gHotListIndex==9 ? 0 : ++gHotListIndex;
        gHotListAuto(gHotListIndex);
    },3000);
     */
    /*销售排行榜功能,暂不上线 end*/


    var settleupProducts = $('.g-settleup-content').find('.product-content').sliderFade({MainGiftArrs: '.arr', MainGifts: '.list', MainGiftIndex: 0, arrNext:'.g-arr-next-small', arrPrev:'.g-arr-prev-small', ifPage:true});

    var settleupProductsImgs = settleupProducts.find('img.adaptive').imgAdaptive({parentWidth:60,parentHeight:60});

    var gHeaderCart = $('.g-header-mycart').pullDown({ifDelay:true,ifArr:true});

    var gHeaderOcj = $('.g-myocj').pullDown({ifArr:true});

    var gHeaderWeixin = $('.g-weixin').pullDown({ifArr:false});

    var gLocationChange = $('.g-area');
    var gAreaDone = $('.g-area-done ');
    gLocationChange.find('.change').bind('click',function(){
        if($(this).hasClass('change-done')){
            gAreaDone.show();
            return false
        }
        $(this).parents('dl').toggleClass('hover');
        return false
    });
    gAreaDone.find('.close').bind('click',function(){
        gAreaDone.hide();
        return false
    });
    gAreaDone.find('.ok').bind('click',function(){
        gAreaDone.hide();
        return false
    });
    gLocationChange.find('li').find('span').bind('click',function(){
        gLocationChange.find('li').find('span').removeClass('cur');
        gLocationChange.find('.g-cur-area').html($(this).text());
        $(this).addClass('cur');
        $(this).parents('dl').toggleClass('hover');
        return false
    });

    $('body').bind('click',function(){
        gLocationChange.find('dl').removeClass('hover');
    });

    var gTimeNow = new Date();
    var gTimeNowDate = gTimeNow.getDate();
    var gTimeNowMouth = gTimeNow.getMonth()+1;
    var gTimeNowDay = gTimeNow.getDay();
    switch(gTimeNowDay){
        case 0:
            gTimeNowDay = '日';
            break;
        case 1:
            gTimeNowDay = '一';
            break;
        case 2:
            gTimeNowDay = '二';
            break;
        case 3:
            gTimeNowDay = '三';
            break;
        case 4:
            gTimeNowDay = '四';
            break;
        case 5:
            gTimeNowDay = '五';
            break;
        case 6:
            gTimeNowDay = '六';
            break;
        default:
            break;
    }
    var gOcjHeaderTime = $('.g-header-time');
    gOcjHeaderTime.find('.mouth').html(gTimeNowMouth);
    gOcjHeaderTime.find('.day').html(gTimeNowDate);
    gOcjHeaderTime.find('b').html('周'+gTimeNowDay);

    //tv节目部分,切换功能,暂未上线.
    var gLiveBox = $('.g-live-box').sliderFade({MainGiftArrs: '.arr', MainGifts: '.live-box', MainGiftIndex: 0, arrNext:'.icon-arrow-right9', arrPrev:'.icon-arrow-left9', ifPage:false, ifLoop:false, leftBorder:3, rightBorder:2});

    gLiveBox.find('.arr').bind('click',function(){
        clearTimeout(window.imgMoveTimeOut);
        $(this).parents('.g-live-box').find('img.move').imageMove({parentWidth : 90, parentHeight: 60, imgWidth: 160, imgHeight: 160});
    });

    gLiveBox.find('.change-channel').find('span[change]').bind('click',function(){
        var index = $(this).attr('change');
        gLiveBox.hide().eq(index).show();
    });

    var gGoTop = $('.g-go-top').add($('.backTopButton')).bind('click',function(){
        $('html,body').scrollTop(0)
    });

    var footerSlide = $('.g-footer-fr-board').find('.notice_box').autoSliderV();

    var headerBanner = $('.g-header-banner').closeNode({closeWay:'up'});

    var ifHeaderBannerClose = false;

    headerBanner.find('.close').bind('click',function(){
        headerBannerSwitch.fadeIn();
        ifHeaderBannerClose = true;
        $.cookie('openbanner', formatDate((new Date()), 'yyyy-MM-dd'), {expires : 1,path : '/'});
//    	jQuery.ajax({
//    		url:"/setDivCookie",
//    		data:{
//    			"type":"openbanner",
//    			"func":"close"
//    		},
//    		success:function(res){}
//    	});
    });

    var headerBannerSwitch = $('.g-banner-switch').hide();

    headerBannerSwitch.bind('click',function(){
        $(this).fadeOut();
        ifHeaderBannerClose = false;
        headerBanner.show().animate({height:'80px','opacity':1});
        $.cookie('openbanner', '');
//      jQuery.ajax({
//    		url:"/setDivCookie",
//    		data:{
//    			"type":"openbanner",
//    			"func":"open"
//    		},
//    		success:function(res){}
//    	});
    });

    var inputTexts = $(':text').defValue();

    var gSearchBar = $('.g-search-box').find('.search-bar').find('input');
    var gSearchBarRelation = $('.g-search-box').find('.relation-search');
    var gSearchBarObj = {
        ifHide : true
    };

    gSearchBar.bind('focus',function(){
        if($(this).val()){
            //显示关联搜索,此时加载数据
            gSearchBarRelation.show();
            gSearchRelations();
        }
        else {
            gSearchBarRelation.hide();
        }
    });

    gSearchBar.bind('keydown',function(){
        setTimeout(function(){
            if(gSearchBar.val()){
                //显示关联搜索,根据输入内容重新加载数据
                gSearchBarRelation.show();
                gSearchRelations();
            }
            else {
                gSearchBarRelation.hide();
            }
        },0);
    });

    gSearchBarRelation.bind('mousedown',function(e){
        gSearchBarObj.ifHide = false;
    });

    gSearchBarRelation.bind('mouseup',function(e){
        gSearchBarObj.ifHide = true;
        gSearchBar.focus();
    });

    gSearchBar.bind('blur',function(e){
        if(gSearchBarObj.ifHide){
            gSearchBarRelation.hide()
        }
    });

    var gSearchRelations = function(){
        var searchLeftMenu = $('.fl-keywords');
        var searchLeftMenuContent = $('.fr-relation');

        searchLeftMenuContent.find('.relation-content').eq(0).triggerLazyImg();
        searchLeftMenuContent.find('img.adaptive').imgAdaptive({parentWidth:160,parentHeight:55});

        searchLeftMenu.menuAim({
            active:searActivate,
            deActive:searDeactivate,
            activeRow:searchLeftMenu.find('li').eq(0),
            leaveMenuHide:false,
            extensionRegion:10,
            wholeMenu:'.relation-search'
        });
        function searActivate(row){
            if($(row).hasClass('no')){
                searchLeftMenu.find('li').css({'width':'538'})
            }
            else {
                searchLeftMenu.find('li').css({'width':'240px'})
            }
            $(row).addClass('cur');
            var menuId = $(row).attr('data-menu');
            var menu = searchLeftMenuContent.find('#'+menuId).show().triggerLazyImg()
        }
        function searDeactivate(row){
            $(row).removeClass('cur');
            var menuId = $(row).attr('data-menu');
            var menu = searchLeftMenuContent.find('#'+menuId).hide();
        }
    };

    //头部tv栏目图片放大缩小特效
    var tvProductImgMove = $('.tv-product').find('.pic').find('img.move').imageMove({parentWidth : 90, parentHeight: 60, imgWidth: 160, imgHeight: 160});

    //搭配切换
    $(".g-assort").autoSliderH({time:5000,item:'.list',direct:false});
    $(".g-assort").find('img.adaptive').imgAdaptive({parentWidth:60,parentHeight:60});
    $(".g-assort").find('span').find('img').bind('click',function(){
        var link = $(this).parents('a').attr('href')     
        window.open(link);
        return false
    })
    $(".g-assort").find('.btn').find('span').hover(function(){
        $(this).css({width:'26px','background-position':'5px 0,0 0'})
    },function(){
        $(this).css({width:'21px','background-position':'0 0,0 0'})
    })

});
