

/* findLazyImg
 * verson 0.0.1 --04.23
 * 触发不可见图片的lazyload事件,如在ie低版本中失效,改用下一种
 * */
(function($){
    $.fn.extend({
        findLazyImg:function(){
            $(this).each(function(){
                $(this).find('img').trigger('lazyload')
            });
            return this
        }
    })
})(jQuery);

/* triggerLazyImg
 * verson 0.0.1 --04.23
 * 是直接加载图片,必定生效
 * */
(function($){
    $.fn.extend({
        triggerLazyImg:function(){
            $(this).each(function(i,n){
                $.each($(n).find('img'),function(i,that){
                    var imgSrc = $(that).attr('data-original');
                    $(that).attr({'src':imgSrc})
                });
            });
            return this
        }
    })
})(jQuery);

/* imgAdaptive
 * verson 0.0.1 --04.23
 * 系统图片自适应居中
 * */
(function ($) {
    $.fn.imgAdaptive = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            adaptiveImages:$(this),     //需要被自适应大小的图片元素
            parentWidth:180,            //父元素的宽度
            parentHeight:180            //父元素的高度
        };

        var options = $.extend(defaultOption, opts);

        $.each(options.adaptiveImages,function(i,n){
            var that = n;
            var aImage = new Image();
            aImage.onload = function(){
                var pWidth = options.parentWidth,
                pHeight = options.parentHeight,
                dWidth = aImage.width,
                dHeight = aImage.height,
                dProportion = dWidth / dHeight,
                disWidth = (pWidth - dWidth < 0) ? (pWidth - dWidth) : 0,
                disHeight = (pHeight - dHeight < 0) ? (pHeight - dHeight) : 0,
                xWidth, xHeight;
                if (disWidth < 0 || disHeight < 0) {
                    if (disWidth < disHeight) {
                        xWidth = dWidth + disWidth;
                        xHeight = dHeight + disWidth / dProportion
                    } else {
                        xHeight = dHeight + disHeight;
                        xWidth = dWidth + disHeight * dProportion
                    }
                } else {
                    xWidth = dWidth;
                    xHeight = dHeight;
                }
                var left = pWidth/2-xWidth/2, top = pHeight/2-xHeight/2;
                $(that).css({display:'block',position:'absolute',left:left+'px',top:top+'px',width:xWidth+'px',height:xHeight+'px'});
            };
            aImage.src = $(n).attr('data-original') || $(n).attr('src');
        });
    }
})(jQuery);

/* autoSliderV
 * verson 0.0.1 --04.23
 * 纵向自动轮播,eg:footer部分的公告
 * */
(function ($) {
    $.fn.autoSliderV = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            time:3000,
            copy:null,
            timer:null
        };

        var options = $.extend(defaultOption, opts);

        var autoSliderVfuns = {};

        autoSliderVfuns.autoSlide = function(){
            options.copy = $(this).children().eq(0).clone();
            $(this).children().eq(0).animate({'height':'0','opacity':'0'},'200','',function(){$(this).remove()});
            $(this).append(options.copy);
        };

        options.timer = setInterval(autoSliderVfuns.autoSlide.bind(this),3000);

        $(this).bind('mouseenter',function(){
            clearInterval(options.timer);
            options.timer = null;
        });

        $(this).bind('mouseleave',function(){
            options.timer = setInterval(autoSliderVfuns.autoSlide.bind(this),3000);
        })

    }
})(jQuery);

/* autoSliderH
 * verson 0.0.2 --05.14
 * 横向自动轮播,eg:header部分logo右边的小banner
 * */
(function($){
    $.fn.autoSliderH = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            time:3000,
            direct:true,          //true表示向右
            arrL:'.left-arrow',
            arrR:'.right-arrow',
            ifArr:true,
            item:'.slider-item',
            lindex:0
        };

        var options = $.extend(defaultOption, opts);
        options.arrL = $(this).find(options.arrL) || null;
        options.arrR = $(this).find(options.arrR) || null;
        options.lwidth = $(this).width();
        options.lheight= $(this).height();
        options.items = $(this).find(options.item);
        options.length = options.items.length;
        options.loldIndex = options.lindex-1;
        options.timer = null;

        if(options.items.length == 1) return false;

        options.items.each(function() {
            var tindex = $(this).index();
            var tleft = tindex>0 ? options.lwidth : 0 ;
            var ttop = tindex>0 ? options.lheight : 0 ;
            $(this).css({
                'left': 0 - tleft + 'px'
            });
        });

        var autoSliderHfuns = {};

        autoSliderHfuns.autoSlide = function(direct){
            if(options.lindex >= options.length - 1){
                options.loldIndex = options.length - 1;
                options.lindex = 0;
            }
            else{
                options.lindex++;
                options.loldIndex = options.lindex - 1;
            }

            if(direct){
                options.items.eq(options.lindex).css({'left': 0 - options.lwidth}).stop(true, true).show().animate({'left': 0},500);
                options.items.eq(options.loldIndex).stop(true, true).show().animate({'left': options.lwidth},500);
            }
            else{
                options.items.eq(options.lindex).css({'left': 0 + options.lwidth}).stop(true, true).show().animate({'left': 0},500);
                options.items.eq(options.loldIndex).stop(true, true).show().animate({'left': 0 - options.lwidth},500);
            }
        };

        options.lTimer = setInterval(autoSliderHfuns.autoSlide.bind(this,options.direct),options.time);

        $(this).bind('mouseenter',function(){
            clearInterval(options.lTimer);
            options.lTimer = null;
        });

        $(this).bind('mouseleave',function(){
            options.lTimer = setInterval(autoSliderHfuns.autoSlide.bind(this,options.direct),3000);
        });

        if(options.ifArr) {
            options.arrL.click(function(){
                autoSliderHfuns.autoSlide(true);
            });
            options.arrR.click(function(){
                autoSliderHfuns.autoSlide(false);
            })
        }
    }
})(jQuery);

/* sliderFade
 * verson 0.0.4 --05.26
 * 标准轮播(箭头+圆点+渐隐)
 * 1.内容+箭头 (首页楼层里的图片banner)
 * 2.内容+箭头+圆点 (cj special)
 * 3.内容+箭头+页码 (头部购物车展开,最近看过和大家在看)
 * */
(function ($) {
    $.fn.sliderFade = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            MainGift : $(this),                                  //整个轮播盒子
            MainGiftArrs: null,                                  //箭头
            MainGifts: null,                                     //被切换的元素
            MainGiftIndex: 0,                                    //初始状态显示的元素,一般都是0
            ifAutoPlay: false,                                   //是否自动播放
            ifDots: false,                                       //是否需要圆点
            playTime:6000,                                       //自动切换时间
            dotsBox: '.dots',                                    //放置圆点的盒子(如果有圆点)
            arrNext: '.g-arr-next',                              //右箭头
            arrPrev: '.g-arr-prev',                              //左箭头
            ifPage: false,                                       //是否显示切换页码
            pageBox: '.page',                                    //用于放置切换页面的盒子,
            ifLoop:true,                                         //是否循环切换
            leftBorder:null,                                     //第几个的时候不能按左切换
            rightBorder:null                                     //第几个的时候不能右切换
        };

        var options = $.extend(defaultOption, opts);
        options.MainGifts = options.MainGift.find(options.MainGifts);
        options.MainGiftArrs = options.MainGift.find(options.MainGiftArrs);
        options.arrNext = options.MainGiftArrs.filter(options.arrNext);
        options.arrPrev = options.MainGiftArrs.filter(options.arrPrev);
        options.pageBox = options.MainGift.find(options.pageBox);
        options.length = options.MainGifts.length-1;
        options.MainGifts.eq(0).css({
            'opacity':'1',
            'display':'block',
            'filter':'alpha(opacity=100)'
        }).triggerLazyImg();

        if(options.ifDots) {
            options.dotsBox = options.MainGift.find(options.dotsBox);
            for(var i=0; i<=options.length; i++){
                options.dotsBox.append($('<span>'))
            }
            options.dots = options.dotsBox.children();
            options.dots.eq(0).addClass('cur')
        }

        if(options.ifPage) {
            options.pageBox.html('<span>1</span>/'+options.MainGifts.length)
        }

        if(options.MainGifts.length==1) {
            options.MainGiftArrs.hide();
            return false
        }

        var slider = {};

        slider.MainGiftShow = function(index){
            options.MainGifts.eq(options.MainGiftIndex).stop().animate({opacity:0},300,'',function(){$(this).hide()});
            options.MainGifts.eq(options.MainGiftIndex).find('img').stop().animate({opacity:0},300);
            options.MainGifts.eq(index).show().triggerLazyImg().stop().animate({opacity:1},300);
            options.MainGifts.eq(index).find('img').stop().animate({opacity:1},300);
            if(options.dots) options.dots.eq(index).addClass('cur').siblings().removeClass('cur');
            if(options.pageBox) options.pageBox.html('<span>'+(Number(index)+1)+'</span>/'+options.MainGifts.length)
        };
		
		if(options.ifAutoPlay){
            options.autoPlay = setInterval(function(){
				/*options.arrNext.click();*/
                nextItem();
            },options.playTime);
            options.MainGift.hover(function(){
                clearInterval(options.autoPlay);
                options.autoPlay = null
            },function(){
                options.autoPlay = setInterval(function(){
                    /*options.arrNext.click();*/
					nextItem();
                },options.playTime);
            });
        }

        /*options.arrNext.click(function(){
            var indexShow = options.MainGiftIndex==options.length ? 0: options.MainGiftIndex+1;
            if(indexShow == options.leftBorder && !options.ifLoop) return false;
            slider.MainGiftShow(indexShow);
            options.MainGiftIndex = options.MainGiftIndex==options.length ? 0: options.MainGiftIndex+1;
            return false
        });*/
		
		options.arrNext.on('click',nextItem);
		
		function nextItem(){
		   var indexShow = options.MainGiftIndex==options.length ? 0: options.MainGiftIndex+1;
           if(indexShow == options.leftBorder && !options.ifLoop) return false;
           slider.MainGiftShow(indexShow);
           options.MainGiftIndex = options.MainGiftIndex==options.length ? 0: options.MainGiftIndex+1;
           return false	
		}
		
        options.arrPrev.click(function(){
            var indexShow = options.MainGiftIndex==0 ? options.length: options.MainGiftIndex-1;
            if(indexShow == options.rightBorder && !options.ifLoop) return false;
            slider.MainGiftShow(indexShow);
            options.MainGiftIndex = options.MainGiftIndex==0 ? options.length: options.MainGiftIndex-1;
            return false
        });

        if(options.dots) {
            options.dots.mouseenter(function(){
                var indexShow = $(this).index();
                slider.MainGiftShow(indexShow);
                options.MainGiftIndex = indexShow
            });
        }
    }
})(jQuery);

/* sliderTpl
 * verson 0.0.2 --05.19 (箭头不隐藏+自动播放)
 * 无缝滚动型轮播
 * 1.只有圆点,没有箭头 (楼层展开的logo部分)
 * 2.只有箭头,没有圆点 (首页嗨鸥团子菜单展开)
 * 3.既有圆点,又有箭头 (暂无实例)
 * *前面一段是检测对css3 transition的支持
 * */
(function($){
    $.support.transition = (function(){
        var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;

        return support;
    });
})(jQuery);
(function ($) {
    $.fn.sliderTpl = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            slider : $(this),                                     //整个轮播元素
            sliderContentBox : 'div.box',                         //移动的盒子(在这个元素上添加transition或left)
            silderContent: 'li',                                  //单个轮播元素选择器
            arrClassCommon:'arr',                                 //添加的箭头的类名
            arrClass:'g-arr',                                     //添加的箭头的类名(左右分别加上-next或-prev)
            btnUlClass:'',                                        //添加的选项的ul的类名
            btnClass:'',                                          //添加的选项(圆点)的类名
            btnCurClass:'',                                       //当前选中的圆点的类名
            ifArr:false,                                          //是否使用箭头轮播
            ifBtns:true,                                          //是否使用圆点轮播
            ifCenter:false,                                       //圆点是否居中
            btnWidth:16,                                          //单个圆点的宽度,只有在ifCenter属性为true的时候,这个参数才有意义
            ifArrAuto:false,                                      //箭头是否一直显示,还是鼠标放上去的时候才显示
            ifAutoPlay:false,                                     //是否自动播放
            playTime:6000,                                        //自动播放间隔
            moveTime:800
        };
        var options = $.extend(defaultOption, opts);
        options.sliderContentBox = options.slider.find(options.sliderContentBox);
        options.sliderContent = options.sliderContentBox.find(options.silderContent);
        options.sliderWidth = options.sliderContent.eq(0).width();
        options.sliderLength = options.sliderContent.length;

        var slider = {};
        slider.ifTransition = $.support.transition();
        slider.selIndex = [];
        slider.newIndex = 0;

        slider.addArr = function(){
            for(var i=0; i<2; i++){
                var a=$('<div>');
                a.addClass(options.arrClassCommon);
                if(i==0) {
                    a.addClass(options.arrClass+'-next');
                    a.attr({'mark':'hover','hover_Class':options.arrClass+'-next-on'});
                    options.arrRight = a;
                    options.arrRight.bind('click',this.showNext.bind(this))
                }
                if(i==1) {
                    a.addClass(options.arrClass+'-prev');
                    a.attr({'mark':'hover','hover_Class':options.arrClass+'-prev-on'});
                    options.arrLeft = a;
                    options.arrLeft.bind('click',this.showPrev.bind(this))
                }
                options.slider.append(a);
                if(options.ifArrAuto) a.css({'display':'block'})
            }
            return this
        };

        slider.addBtns = function(){
            var ul = $('<ul>');
            ul.addClass(options.btnUlClass).addClass('clearfix');
            for(var i=0; i<options.sliderLength; i++){
                var li = $('<li>');
                ul.append(li);
                li.attr({selData:i});
                li.text(i+1);
                li.bind('mouseover',this.moveIndexSel.bind(this));
                if(i==0) li.addClass(options.btnCurClass);
                this.selIndex.push(li)
            }
            options.slider.append(ul);
            if(options.ifCenter) {
                ul.css({'marginLeft':-options.btnWidth*options.sliderLength/2+'px'});
            }

            return this
        };

        slider.addFirstCopy = function(){
            return options.sliderContentBox.append(options.sliderContent.eq(0).clone()),this;
        };

        slider.bindArr = function(){
            options.slider.bind({'mouseenter':this.showArr.bind(this),'mouseleave':this.hideArr.bind(this)})
        };

        slider.showArr = function(){
            options.arrLeft.show();
            options.arrRight.show()
        };

        slider.hideArr = function(){
            if(options.ifArrAuto) return this;
            options.arrLeft.hide();
            options.arrRight.hide()
        };

        slider.showNext = function(){
            this.newIndex == options.sliderLength ? this.fixFirst.call(this) : this.next.call(this)
        };

        slider.next = function(){
            this.ifTransition ? options.sliderContentBox.css({transform:'translate3d(-'+options.sliderWidth*(this.newIndex+1)+'px, 0, 0)','transition':options.moveTime+'ms',left:0}) : options.sliderContentBox.stop().animate({left:'-'+options.sliderWidth*(this.newIndex+1)+'px'},options.moveTime);
            this.showIndex.apply(this,[(++this.newIndex==options.sliderLength ? 0: this.newIndex)]);
        };

        slider.fixFirst = function(){
            this.newIndex = 0;
            this.ifTransition ? options.sliderContentBox.css({'transition-duration':'0s',transform:'translate3d(0, 0, 0)'}) : options.sliderContentBox.stop().css({left:'0'});
            setTimeout(this.showNext.bind(this),null)
        };

        slider.showPrev = function(){
            this.newIndex==0 ? this.fixLast.call(this) : this.prev.call(this)
        };

        slider.prev = function(){
            this.ifTransition ? options.sliderContentBox.css({transform:'translate3d(-'+options.sliderWidth*(this.newIndex-1)+'px, 0, 0)','transition':options.moveTime+'ms',left:0}) : options.sliderContentBox.stop().animate({left:'-'+options.sliderWidth*(this.newIndex-1)+'px'},options.moveTime);
            this.showIndex.apply(this,[--this.newIndex]);
        };

        slider.fixLast = function(){
            this.newIndex = options.sliderLength;
            this.ifTransition ? options.sliderContentBox.css({'transition-duration':'0s',transform:'translate3d(-'+options.sliderWidth*options.sliderLength+'px, 0, 0)'}) : options.sliderContentBox.stop().css({left:'-'+options.sliderWidth*options.sliderLength+'px'});
            setTimeout(this.showPrev.bind(this),null)
        };

        slider.showIndex = function(i){
            if (options.ifBtns) this.selIndex[i].addClass(options.btnCurClass).siblings().removeClass(options.btnCurClass);
        };

        slider.moveIndexSel = function(e){
            var ele = $(e.currentTarget);
            var i = Number(ele.attr('selData'));
            this.showIndex.apply(this,[i]);
            this.ifTransition ? options.sliderContentBox.css({transform:'translate3d(-'+options.sliderWidth*i+'px, 0, 0)','transition':options.moveTime+'ms'}) : options.sliderContentBox.stop().animate({left:'-'+options.sliderWidth*i+'px'},options.moveTime);
            this.newIndex = i;
            return this
        };

        slider.clearInter = function(){
            clearInterval(options.autoPlay);
            options.autoPlay = null;
            return this
        };

        slider.setInter = function(){
            options.autoPlay = setInterval($.proxy(this.showNext,this),options.playTime);
            return this
        };

        slider.autoPlay = function(){
            slider.setInter.call(this);
            options.slider.bind('mouseenter',this.clearInter.bind(this));
            options.slider.bind('mouseleave',this.setInter.bind(this));
        };

        slider.init = function(){
            options.ifBtns ? this.addBtns.call(this) : $.noop;
            options.ifArr ? this.ifArrInit.call(this) : $.noop;
            options.ifAutoPlay ? this.autoPlay.call(this) : $.noop;
        };

        slider.ifArrInit = function(){
            this.addArr.call(this).addFirstCopy.call(this).bindArr.call(this);
        };

        slider.init.call(slider);
    }
})(jQuery);

/* pullDown
 * verson 0.0.1 --04.23
 * 下拉菜单
 * 1.鼠标接触立即展开,离开收起,箭头改变方向(头部myocj)
 * 2.鼠标接触后延时展开,离开收起,箭头改变方向(头部购物车)
 * 3.鼠标点击后展开,再次点击收起(暂无案例)
 * */
(function ($) {
    $.fn.pullDown = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            ifArr:false,                      //是否有需要改变方向的箭头
            arrDown:'icon-arrow-down8',       //向下的箭头的类名(收起时状态)
            arrUp:'icon-arrow-up7',           //想上的箭头的类名(展开时状态)
            arr:'.icon-arr',                  //箭头
            ifDelay:false,                    //是否延迟触发
            pullWay:'mouseenter',             //点击触发下拉还是鼠标覆盖触发下来
            timer:null,                       //定时器
            hoverClass:'hover',               //展开时给dl添加的类名
            delay:400,                        //延迟时间
            btn:null                          //点击展开或者收起的按钮,默认就是菜单本身
        };

        var options = $.extend(defaultOption, opts);
        options.arr = $(this).find(options.arr);
        options.btn = options.btn ? $(this).find(options.btn) : $(this);

        var pullDownFuns = {};


        pullDownFuns.open = function(){
            $(this).find('dl').addClass(options.hoverClass);
            if(options.ifArr){
                options.arr.removeClass(options.arrDown).addClass(options.arrUp)
            }
        };
        pullDownFuns.close = function(){
            $(this).find('dl').removeClass(options.hoverClass);
            if(options.ifArr){
                options.arr.addClass(options.arrDown).removeClass(options.arrUp)
            }
        };

        pullDownFuns.togglePull = function(){
            $(this).find('dl').toggleClass(options.hoverClass);
            if(options.ifArr){
                if (options.arr.hasClass(options.arrDown)){
                    options.arr.removeClass(options.arrDown).addClass(options.arrUp)
                }
                else if (options.arr.hasClass(options.arrUp)) {
                    options.arr.addClass(options.arrDown).removeClass(options.arrUp)
                }
            }
        };

        if(options.pullWay=='mouseenter'){
            $(this).bind('mouseenter',function(){
                $(this).triggerLazyImg();
                if(options.ifDelay){
                    options.timer = setTimeout(pullDownFuns.open.bind(this),options.delay)
                }
                else {
                    pullDownFuns.open.call(this)
                }
            });

            $(this).bind('mouseleave',function(){
                if(options.ifDelay){
                    clearTimeout(options.timer);
                    options.timer = null
                }
                pullDownFuns.close.call(this)
            });
        }
        else if (options.pullWay=='click'){
            options.btn.bind('click',function(){
                $(this).triggerLazyImg();
                pullDownFuns.togglePull.call(this);
                return false
            });
        }
    }
})(jQuery);

/* closeNode
 * verson 0.0.1 --04.25
 * 关闭某元素 (顶通banner)
 * */
(function ($) {
    $.fn.closeNode = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            closeBtn:'.close',                       //关闭按钮
            closeContent:null,                       //需要被关闭的内容,如果不定义,就是调用插件的元素本身
            closeWay:'hide'                          //被关闭的方式,hide,fade,up
        };

        var options = $.extend(defaultOption, opts);
        options.closeBtn = $(this).find(options.closeBtn);
        options.closeContent = options.closeContent ? $(this).find(options.closeContent) : $(this);

        var closeNodeFuns = {};

        closeNodeFuns.close = function(way){
            switch(way){
                case 'hide':
                    this.closeContent.hide();
                    break;
                case 'fade':
                    this.closeContent.fadeOut();
                    break;
                case 'up':
                    this.closeContent.animate({'height':0,'opacity':0},300,'',function(){$(this).hide()});
                    break;
                default:
                    this.closeContent.hide();
            }
        };

        options.closeBtn.bind('click', closeNodeFuns.close.bind(options,options.closeWay));
    }
})(jQuery);

/* scrollFix
 * verson 0.0.1 --04.25
 * 保持某块元素置顶 (公共右侧二维码客服)
 * */
(function ($) {
    $.fn.scrollFix = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            ele:$(this),                       //需要被固定的元素
            extra:0                            //距离该元素多少距离的时候开始定位
        };

        var options = $.extend(defaultOption, opts);

        options.boundaries = $(this).offset().top;

        var scrollFixFuns = {};

        scrollFixFuns.scroll = function(extra){
            if($(window).scrollTop()+extra >= this.boundaries){
                this.ele.addClass('fixed')
            }
            else {
                this.ele.removeClass('fixed')
            }
        };

        $(window).bind('scroll',  scrollFixFuns.scroll.bind(options,options.extra));
    }
})(jQuery);

/* defValue
 * verson 0.0.1 --05.05
 * 文本域默认显示文本 (公共头部搜索条)
 * */
(function ($) {
    $.fn.defValue = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            inputText:$(this),
            changeColor:'#333333',                          //实际输入的内容的颜色
            originalColor:'#333333',                        //默认文本的颜色
            ifFocus:false                                   //是否打开的时候就获得焦点
        };

        var options = $.extend(defaultOption, opts);
        options.defaultVal = $(this).val();

        var defValueFuns = {};

        defValueFuns.setValue = function(){
            this.inputText.css({'color':options.changeColor});
            return this.inputText.val() == options.defaultVal ? this.inputText.val('') : false;
        };
        defValueFuns.clearValue = function(){
            this.inputText[0].value = this.inputText.val() == '' ? options.defaultVal : this.inputText.val();
            this.inputText.css({'color':options.originalColor});
        };

        $(this).bind('focus',  defValueFuns.setValue.bind(options));
        $(this).bind('blur',  defValueFuns.clearValue.bind(options));

        if(options.ifFocus){
            $(this).focus();
        }
    }
})(jQuery);

/* menuAim
 * verson 0.0.1 --05.05
 * 左右菜单计算角度显示选项卡
 * */
(function ($) {

    $.fn.menuAim = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });
        return this;
    };

    function init(opts) {
        var obj = {
            menu: $(this),                    //调用此插件的dom对象
            wholeMenu: $(this),               //整块菜单
            rowSelector: 'li',                //选项的选择器
            direct: 'right',                  //子菜单展开在右侧还是左侧
            extensionRegion: 75,              //上下超出区域的大小
            active: $.noop,                   //触发某项的函数
            deActive: $.noop,                 //取消某项的函数
            leaveMenuHide: true,              //离开菜单是否隐藏所有子菜单
            activeRow: null,                  //当前显示项(rowSelector中的当前项)
            delay: 300,                       //延迟时间
            interTime: 5000,                  //自动切换的间隔时间
            ifAuto: false,                    //是否自动切换
            boxCorner: {}                     //记录菜单四个角的位置
        };
        var options = $.extend(obj, opts);

        options.wholeMenu = $(options.wholeMenu);
        options.menuPosition = options.menu.offset();
        options.boxCorner.leftTop = {x: options.menuPosition.left, y: options.menuPosition.top - options.extensionRegion >= 0 ? options.menuPosition.top - options.extensionRegion : 0};
        options.boxCorner.leftBottom = {x: options.menuPosition.left, y: options.menuPosition.top + options.menu.height() + options.extensionRegion};
        options.boxCorner.rightTop = {x: options.menuPosition.left + options.menu.width(), y: options.boxCorner.leftTop.y};
        options.boxCorner.rightBottom = {x: options.boxCorner.rightTop.x, y: options.boxCorner.leftBottom.y};
        options.rowSelector = options.menu.find(options.rowSelector);
        options.length = options.rowSelector.length;

        var menuAim = {};
        var menuAimAttr = {
            mouseSite: [],                    //存放鼠标位置(记录3次)
            timeOut: null,                    //延迟执行的timeout
            latestLoc: {x: null, y: null},    //记录上一次移动,鼠标的最后的位置
            ifOut: null,                      //鼠标移动的角度是否真正需要进入另外的菜单
            interval: null                    //自动切换的interval
        };

        var menuAimFun = {
            mouseM: function (e) {
                this.mouseSite.push({x: e.pageX, y: e.pageY});
                return this.mouseSite.length > 3 ? this.mouseSite.shift() : $.noop, this
            },
            moveEnterRow: function (e) {
                this.delTimeout.call(this);
                this.ifEnterNow.apply(this, [$(e.currentTarget)]);
            },
            delTimeout: function () {
                if (this.timeOut) {
                    clearTimeout(this.timeOut);
                    this.timeOut = null
                }
            },
            ifEnterNow: function (row) {
                this.delay = this.delayTime.call(this);
                if (this.delay) {
                    this.timeOut = setTimeout(
                    this.ifEnterNow.bind(this, row)
                    , this.delay)
                }
                else {
                    this.active.apply(this, [row])
                }
            },
            delayTime: function () {
                if (!options.activeRow) return 0;
                var firstLoc = this.mouseSite[0];
                var lastLoc = this.mouseSite[this.mouseSite.length - 1];
                if (firstLoc.x < options.boxCorner.leftTop.x || firstLoc.x > options.boxCorner.rightTop.x || firstLoc.y < options.boxCorner.leftTop.y || firstLoc.y > options.boxCorner.leftBottom.y) return 0;
                if (this.latestLoc.x == lastLoc.x && this.latestLoc.y == lastLoc.y) {
                    return 0;
                }
                switch (options.direct) {
                    case 'right':
                        this.ifOut = this.triangleArea.apply(this, [firstLoc, lastLoc, options.boxCorner.rightTop, options.boxCorner.rightBottom]);
                        break;
                    case 'left':
                        this.ifOut = this.triangleArea.apply(this, [firstLoc, lastLoc, options.boxCorner.leftTop, options.boxCorner.leftBottom]);
                        break;
                    case 'top':
                        this.ifOut = this.triangleArea.apply(this, [firstLoc, lastLoc, options.boxCorner.leftTop, options.boxCorner.rightTop]);
                        break;
                    case 'bottom':
                        this.ifOut = this.triangleArea.apply(this, [firstLoc, lastLoc, options.boxCorner.leftBottom, options.boxCorner.rightBottom]);
                        break;
                    default:
                        break;
                }
                if (this.ifOut) return 0;
                if (!this.ifOut) {
                    this.latestLoc.x = lastLoc.x;
                    this.latestLoc.y = lastLoc.y;
                    return options.delay;
                }
                else {
                    return 0
                }
            },
            slope: function (a, b) {
                return Math.abs((a.y - b.y) / (a.x - b.x))
            },
            triangleArea: function (angleMouse_1, angleMouse_2, angle_1, angle_2) {
                return (this.slope(angleMouse_1, angle_1) < this.slope(angleMouse_2, angle_1) && this.slope(angleMouse_1, angle_2) < this.slope(angleMouse_2, angle_2)) ? 0 : 1;
            },
            active: function (row) {
                this.delTimeout.call(this);
                if ((row[0] == options.activeRow[0])) return

                options.deActive(options.activeRow);
                options.active(row);
                options.activeRow = row
            },
            moveLeaveRow: function () {
                this.delTimeout.call(this);
            },
            mouseLeaveMenu: function () {
                this.delTimeout.call(this);
                if (options.leaveMenuHide && options.activeRow) {
                    options.deActive(options.activeRow);
                    options.activeRow = null
                }
                if(options.ifAuto) {
                    menuAim.interval = setInterval($.proxy(menuAim.activeNext, menuAim),options.interTime);
                }
            },
            nextRow: function(){
                var indexNow = options.activeRow.index();
                var indexNext = indexNow == options.length-1 ? 0 : ++indexNow;
                return options.rowSelector.eq(indexNext);
            },
            activeNext: function(){
                this.delTimeout.call(this);
                options.deActive(options.activeRow);
                var rowNext = this.nextRow.call(this);
                options.active(rowNext);
                options.activeRow = rowNext
            },
            clearInter: function(){
                clearInterval(this.interval);
                this.interval = null
            }
        };

        $.extend(menuAim, menuAimAttr);
        $.extend(menuAim, menuAimFun);

        $(document).bind('mousemove', $.proxy(menuAim.mouseM, menuAim));
        options.rowSelector
        .bind({
            'mouseenter': $.proxy(menuAim.moveEnterRow, menuAim),
            'mouseleave': $.proxy(menuAim.moveLeaveRow, menuAim)
        });
        if(options.ifAuto) {
            menuAim.interval = setInterval($.proxy(menuAim.activeNext, menuAim),options.interTime);
            options.wholeMenu.bind('mouseenter',$.proxy(menuAim.clearInter, menuAim))
        }
        options.wholeMenu.bind('mouseleave', $.proxy(menuAim.mouseLeaveMenu, menuAim));

    }
})(jQuery);

/* imageMove
 * verson 0.0.1 --05.26
 * 图片在框里放大,移动,缩小...(头部tv频道图片)
 * 可以兼容不同尺寸的图片和框,但是前提是,框的宽必须比高要大或者相等
 * */
(function ($,window) {
    $.fn.imageMove = function (opts) {
        this.each(function () {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var defaultOption = {
            parentWidth : 90,                                  //框的宽度
            parentHeight: 60,                                  //框的高度
            imgWidth: 160,                                     //图片的宽度
            imgHeight: 160,                                    //图片的高度
            speed:3000,                                        //图片运动的速度
            stop:1000                                          //运动停顿的时间
        };

        var options = $.extend(defaultOption, opts);

        var ways = {};

        ways.timeOut = null;

        window.imgMoveTimeOut = ways.timeOut;

        ways.stepZero = function(callback){
            $(this).stop().css({'left':'0','top':'0','width':options.parentWidth+'px','height':options.parentWidth+'px','opacity':'1','filter':'alpha(opacity=100)'});
            ways.timeOut = setTimeout(callback.bind(this),options.stop)
        };
        ways.stepOne = function(){
            $(this).animate({'left':options.parentWidth-options.imgWidth+'px','width':options.imgWidth+'px','height':options.imgHeight+'px'},options.speed,function(){ways.timeOut = setTimeout(ways.stepsLoop.bind(this),options.stop)})
        };

        ways.stepTwo = function(callback){
            $(this).animate({'top':-(options.imgHeight-options.parentHeight-(options.parentWidth-options.parentHeight)/2)+'px'},options.speed,callback.bind(this));
        };

        ways.stepThree = function(callback){
            $(this).animate({'left':'0'},options.speed,callback.bind(this));
        };

        ways.stepFour = function(callback){
            $(this).animate({'top':-(options.parentWidth-options.parentHeight)/2+'px'},options.speed,callback.bind(this));
        };

        ways.stepFive= function(callback){
            $(this).animate({'width':options.parentWidth+'px','height':options.parentWidth+'px'},options.speed,callback.bind(this));
        };

        ways.stepSix= function(callback){
            $(this).animate({'width':options.imgWidth+'px','height':options.imgHeight+'px','left':options.parentWidth-options.imgWidth+'px'},options.speed,callback.bind(this));
        };

        ways.stepsLoop = function(){
            ways.stepTwo.call(this,function(){
                ways.timeOut = setTimeout(ways.stepThree.bind(this,function(){
                    ways.timeOut = setTimeout(ways.stepFour.bind(this,function(){
                        ways.timeOut = setTimeout(ways.stepFive.bind(this,function(){
                            ways.timeOut = setTimeout(ways.stepSix.bind(this,function(){
                                ways.timeOut = setTimeout(ways.stepsLoop.bind(this),options.stop)
                            }),options.stop)
                        }),options.stop)
                    }),options.stop)
                }),options.stop)
            })
        };

        ways.stepZero.call(this,ways.stepOne);
    }
})(jQuery,window);










