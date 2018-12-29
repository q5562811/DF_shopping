$(document).ready(function(){
		var sound=new soundPl;
	    sound.init(false);
		var musicPlay_=$.cookie("OCJ_KR_TOGGLEPLAY_PERMANENT_COOKIE");
		//永久不播放
		if(musicPlay_=="N"){
			sound.stop();
		}
		
		var time= getUpdatetime(); //获取当前媒体播放时间
	 	var mpath=getMpath(); //获取当前歌曲路径
	 	var tabindex=getMtabindex();  //指定当前播放的歌曲值 $("ul li").eq(tabindex) 索引从0开始

	 	var  m_jplayer= $("#jquery_jplayer_1");

    	//浏览器兼容性问题
	    var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    
        if(Sys.ie){}
        else
        {
		 	try{
				m_jplayer.jPlayer({
			        ready: function (event) {
		        		if(m_jplayer==null ||  m_jplayer == undefined){
		        			 m_jplayer= $("#jquery_jplayer_1");
		        		}
		        		m_jplayer.jPlayer("setMedia", {
			            	mp3:mpath
			            });
			            
			        }, 
					swfPath: "/common/js/jplayer/",
					wmode: "window",
					supplied: "mp3,mp4",
			        //播放器出错 回调函数  
			        error: function(event) {
			        	 mpath=getMpath();
			        	 time= getUpdatetime(); //获取当前媒体播放时间
						 m_jplayer.jPlayer("setMedia", {
				            	mp3:mpath
				         }).jPlayer("play",parseInt(time));
		
			        },
					ended: function(event) {
						nextJplayer(); //播放下一首
					},
					play: function(time) {
						var drawing_1=getMusicPlayerCookie(); //判断是否已暂停
						
						var tv_url=window.location.href;
						if(tv_url !=null  && tv_url !=undefined  && tv_url.indexOf(".ocj.com.cn/otuans/tvdetail/") > 0 ){ //当前浏览器路径下的不能播放
							drawing_1="N";
							sound.allToClose();
						}
						if("N" == drawing_1){
							m_jplayer.jPlayer("pause");
							sound.stop();
						}else{
							sound.play();
						}
					},
					pause:function(event){
						 sound.stop();
					},
					timeupdate:function(event){
						if(event.jPlayer.status.currentTime !=null  &&   parseInt(event.jPlayer.status.currentTime)>0){
							$.cookie("jplayercurrentime",event.jPlayer.status.currentTime,{path : "/",domain:'.ocj.com.cn'}); 
						}
					}
				});
		 	 }catch(e){
				 //错误信息
			 }
		 	 
		 	if(Sys.ie){  //IE浏览器判断
	        }else{
	        	//添加鼠标焦点移入浏览器窗口事件
				$(window).bind("focus",function(){
						mpath=getMpath();
						time= getUpdatetime(); //获取当前媒体播放时间
						//tabindex=getMtabindex();  //指定当前播放的歌曲值 $("ul li").eq(tabindex) 索引从0开始
						 var tab_path=$("#jp_audio_0").attr("src"); //获取当前歌曲的路径

						 if(getMusicPlayerCookie()=="Y"){
							 //如果当前歌曲路径 不是 cookie中存的路径 重新加载音乐播放去 否则开始播放即可
							 if(tab_path !=mpath){
								 try{
									   m_jplayer.jPlayer("setMedia", {
							            	mp3:mpath
							           }).jPlayer("play",parseInt(time));
								 }catch(e){
									 //错误信息
								 }
							 }else{
								 try{
									 m_jplayer.jPlayer("play",parseInt(time));
								 }catch(e){
									 //错误信息
								 }
							 }
						 }
				});
				
				//添加鼠标焦点移开浏览器窗口事件  
				$(window).bind("blur",function(){
					 try{
						 try{
							m_jplayer.jPlayer("pause");
						 }catch(e){
							 //错误信息
						 }
					 }catch(e){
						 //错误信息
					 }
				});
	        }
        }

	    $(".hsoundPlayerButton").bind("click",function(){
	    	sound.togglePlay(function(drawing){
	    		if(!drawing){
	    			setMusicPlayerCookieByToggle("N");
				  	try{
						m_jplayer.jPlayer("pause");
						
						$.ajax({
							type : "GET",
							url:"/musicplayer/closePlayer",
							dataType:"json",
							data : {
								"m_type":"Y"
							},
							success:function(res){
							}
						});
					 }catch(e){
						 //错误信息
					 }
			  }else{
				  setMusicPlayerCookieByToggle("Y");
				  $.cookie("OCJ_KR_TOGGLEPLAY_PERMANENT_COOKIE", drawing,{path : "/",domain:'.ocj.com.cn'}); 
				  try{
					  m_jplayer.jPlayer("play");
				  }catch(e){
					  //错误信息
				  }
			  }
		   });
	   });
	   
	  //获取当前歌曲播放时间 并且返回
	  function getUpdatetime(){
		time= $.cookie("jplayercurrentime");
		 if(time ==null || time =="null" || time ==NaN ||  time =="NaN"  || time == undefined){
			time="0";
		}
		return time;
	  }
	  
	  function getMpath(){
		 mpath= $.cookie("ocj_jplayer_Mpath"); //获取当前播放歌曲的路径
		 if(mpath ==null || mpath =="" || mpath == undefined){
				mpath=$("#jp_playlist_ul li:first a").attr("m_path"); //获取音乐播放第一首歌曲的路径
				$.cookie("ocj_jplayer_Mpath",mpath,{path : "/",domain:'.ocj.com.cn'});
		 }else{
			//检查 tabindex m_path 是否是当前cookie存储的路径 否则更
			 var tab_index=getMtabindex();
			 var tab_path=$("#jp_playlist_ul li a").eq(parseInt(tab_index)).attr("m_path"); //获取当前歌曲的路径
			 if(tab_path !=mpath){
				 mpath=tab_path;
			 }
			 
	  	}
		 return mpath;
	 };
	  
	 function getMtabindex(){
		 tabindex = $.cookie("ocj_jplayer_tabindex"); //获取当前播放歌曲的tabindex
		 if(tabindex ==null || tabindex =="null" || tabindex ==NaN ||  tabindex =="NaN"  || tabindex == undefined){
			 tabindex=0;
			 $.cookie("ocj_jplayer_tabindex",tabindex,{path : "/",domain:'.ocj.com.cn'});
			 return tabindex;
		 }else{
			 return parseInt(tabindex);
		 }
	 }; 
	 
	 //设置音乐播放器的COOKIE
	 function setMusicPlayerCookieByToggle(drawing){
		  $.cookie("OCJ_KR_TOGGLEPLAY_COOKIE", drawing,{path : "/",domain:'.ocj.com.cn'});
	 };
	 
	 //获取音乐播放器中设置的COOKIE
	 function getMusicPlayerCookie(){
		 //OCJ_KR_TOGGLEPLAY_COOKIE=  OCJ_KR_TOGGLEPLAY_PERMANENT_COOKIE为永久播放
		 var drawing="N";
		 drawing=$.cookie("OCJ_KR_TOGGLEPLAY_PERMANENT_COOKIE");
		 if("N" == drawing){  //已经设置永久不播放
			 	return drawing;
		 }else{
			 	drawing=$.cookie("OCJ_KR_TOGGLEPLAY_COOKIE"); //是否已经暂停播放
		 }
		 return drawing;
	 }

	 
	  function nextJplayer() {
		 tabindex=getMtabindex();
    	 tabindex++;
		 var playlist_size= $("#jp_playlist_ul li").length; //获取音乐列表
		 if(parseInt(playlist_size)<=parseInt(tabindex)){
			tabindex=0;
		 }
		mpath=$("#jp_playlist_ul li a").eq(tabindex).attr("m_path"); //获取下一首歌曲的路径
		$.cookie("jplayercurrentime",0,{path : "/",domain:'.ocj.com.cn'});
		$.cookie("ocj_jplayer_Mpath",mpath,{path : "/",domain:'.ocj.com.cn'});  //获取当前播放歌曲路径
		$.cookie("ocj_jplayer_tabindex",tabindex,{path : "/",domain:'.ocj.com.cn'});//当前播放列表的index
		try{
			m_jplayer.jPlayer("setMedia", {mp3:mpath});
			m_jplayer.jPlayer("play");
		 }catch(e){
			 //错误信息
		}
	 };
	 
	 //永久不播放 function
	 $('#hsoundPlayerAllToClose').click(function(e) {
		 $.cookie("OCJ_KR_TOGGLEPLAY_PERMANENT_COOKIE", "N", { expires : 20*365,path : "/",domain:'.ocj.com.cn'}); //设置永久关闭
		 sound.stop();
		 try{
			 m_jplayer.jPlayer("pause");
		 }catch(e){
			 //错误信息
		 }
		  $.ajax({
			type : "GET",
			url:"/musicplayer/closePlayer",
			dataType:"json",
			data : {
				"m_type":"N"
			},
			success:function(res){
					
				}
			});
	  });

	});

