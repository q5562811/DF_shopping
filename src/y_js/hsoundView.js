/**
 * Created by admin on 15/7/14.
 */

    var soundPl=function(){
        this.targetItem;
        this.isPlayering;
        this.tween;

    };

    soundPl.prototype.togglePlay=function(callback){
        if(this.isPlayering){
            this.stop();
            callback(false);
        }else{
            this.play();
            callback(true);
        }
    };

    soundPl.prototype.stop=function(){
        if(!this.targetItem){
            return;
        }
        this.isPlayering=false;
        this.targetItem.find(".hsoundPlayerButton").removeClass("hstop");
        this.targetItem.find(".hsoundPlayerButton").addClass("hplay");
        //TweenLite.set(this.targetItem.find(".hsoundPlayerButton"),{autoAlpha:1});
        if(this.tween){
            this.tween.pause();
        }
    };

    soundPl.prototype.play=function(){
        if(!this.targetItem){
            return;
        }
        this.isPlayering=true;
        this.targetItem.find(".hsoundPlayerButton").addClass("hstop");
        this.targetItem.find(".hsoundPlayerButton").removeClass("hplay");
        if(this.tween){
            this.tween.play();
        }

    };


    soundPl.prototype.showorhidetip=function(bo){
        if(!this.targetItem){
            return;
        }
        if(bo){
            this.targetItem.find(".hsoundPlayerTip").css({"display":"block"});
        }else{
            this.targetItem.find(".hsoundPlayerTip").css({"display":"none"});
        }
    };
    soundPl.prototype.allToClose=function(){
        this.targetItem.css({"display":"none"});
        this.stop();
    };

    soundPl.prototype.init=function(bo){
        var _this=this;
        if($(".hsoundPlayer").length>0){
            _this.targetItem=$(".hsoundPlayer");
        }else{
            _this.targetItem=null;
        }
        if(!_this.targetItem){
            return;
        }
        this.isPlayering=bo;
        this.tween = new TweenMax(this.targetItem.find(".hsoundCd"), 4, {rotation:360,repeat:-1,ease:Linear.easeNone});
        if(_this.isPlayering){
            _this.play();
        }else{
            _this.stop();
        }
        _this.targetItem.find(".hsoundPlayerAllToClose").bind("tap",function(e){
//            _this.allToClose();
        	 _this.stop();
        });
        _this.targetItem.find(".hsoundCd").mouseenter(function(e){
            TweenLite.to(_this.targetItem.find(".hsoundPlayerButton"),.5,{autoAlpha:1});
        });
        _this.targetItem.find(".hsoundPlayerButton").mouseleave(function(e){
            TweenLite.to(_this.targetItem.find(".hsoundPlayerButton"),.5,{autoAlpha:0});

        });

        _this.targetItem.find(".hsoundPlayerBanquanIcon").hover(function(e){
            _this.showorhidetip(true);
        },function(e){
            _this.showorhidetip(false);
        });

        _this.targetItem.find(".hsoundPlayerButton").bind("tap",function(e){
           //_this.togglePlay();
        });
    };



/*
    (function(){
        var it=new soundPl();
        return it;
    })();*/

