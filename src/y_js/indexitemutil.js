/*deal itemimage*/
 function getItemImg(itc,type)
{
	var iimg = 'http://cdnimg.ocj.com.cn/item_images/item';
	iimg += '/' + itc.substring(0,2);
	iimg += '/' +  itc.substring(2,4);
	iimg += '/' +  itc.substring(4);
	iimg += '/' +  itc + type + '.jpg';
	return iimg;	
}

 function  getIcons(obj)
{
		var icons = "";
		
		if(obj.promo_dc_gb != null && obj.promo_dc_gb != ''){
			icons += '<span class="htipcx">促</span>'; 
		}
		
		if(obj.dc_amt > 0){
			icons += '<span class="htipquan">券</span>';	
		}
		
		if(obj.gift_item_code == '1'){
			icons += '<span class="htipzeng">赠</span>';	
		}
		//积 icon 最前面放最后面
		if(obj.save_amt > 0){
/* 				obj.isTVLive == 'tv' ? icons += '<span class="htipjf">积</span><span class="htipjfFont"> '+ obj.save_amt +'</span>':icons += '<span class="htipjf">积</span>';	
 */			
	//		icons += '<span class="htipjf">积</span>';	

		}
		/*if(obj.item_ven_code == '103971'){
			icons += '<span class="htipkrozy">韩国直邮</span>';	
		}*/
		return icons;
}	

 function  getitemhtml(obj)
{
		var domain_id = '';
		domain_id = '' + obj.seq_shop_num + '_' + obj.seq_temp_num + '_' + obj.seq_temp_corner_num + '_' + obj.set_num + '_' + obj.seq_temp_corner_tgt_num + '_WASTE';
	 	var itemhtml='<div class="hindexProjectListBoxrightItemList">'
		+ '<div class="hCommonItem">'+getBigIcons(obj)+'<div class="hItemShowImg"><a href="/detail/'+obj.sitem_code+'?domain_id='+domain_id+'" target="_blank">'
		+'<img data-kitten="'+obj.item_image+'" title="'+obj.item_name+'" src="http://cdnimg.ocj.com.cn/common/mobile_phone/cssimage/indeximg/imglogo.png" class="lazyloadnew" /></a></div>'
		+'<div class="hItemShowTitle"><a href="/detail/'+obj.sitem_code+'?domain_id='+domain_id+'" target="_blank">'+subItemName2(obj,30)+'</a></div>'
		+'<div class="hItemShowMoney"><span>￥</span>'+obj.last_sale_price
	 	+'<del>'+(obj.cust_price > 0 && obj.cust_price * 1 >obj.last_sale_price * 1 ?'￥'+obj.cust_price :'')+'</del>'
		+'<div class="hyouhuiicon">'
		+getIcons(obj)
		+'</div></div>'
		+'</div></div>';
		return itemhtml;
}

 function  getpricehtml(obj)
{
	 	var pricehtml='<div class="hItemShowMoney"><span>￥</span>'+obj.last_sale_price
			 	+'<del>'+(obj.cust_price * 1 > 0 && obj.cust_price * 1 >obj.last_sale_price * 1 ?'￥'+obj.cust_price :'')+'</del>'
				+'<div class="hyouhuiicon">'
				+getIcons(obj)
				+'</div></div>';
	 	if(pricehtml <= 0){
	 		return "";
	 	}
		return pricehtml;
}

 function subItemName2(obj,length)
{
		var web_desc = obj.web_desc;
		var promo_last_name=obj.promo_last_name;
		
		var str = "";
		if (promo_last_name != null &&promo_last_name!='') {
			str+="<font color=\"#239CDC\">"
			+"<b>[" + promo_last_name + "]</b>"
			+"</font>";
		}
		
		if(web_desc != null && web_desc != ''){
			if (obj.font_color != null && obj.font_color != '') {
				if ("O"==obj.font_color) {
						str+="<font color=\"#fe5f1e\">";
				} else if ("R"==obj.font_color) {
						str+="<font color=\"#FF0000\">";
				} else if ("B"==obj.font_color) {
						str+="<font color=\"#239CDC\">";
				} else if ("P"==obj.font_color) {
						str+="<font color=\"#dd127a\">";
				}
		}
		if ("Y" == obj.bold_yn) {
				str+="<b>";
		}
		if ("Y" == obj.under_line_yn) {
				str+="<u>";
		}
		str+="[" + web_desc + "]";
	
		if ("Y" == obj.under_line_yn ) {
				str+="</u>";
		}
		if ("Y" == obj.bold_yn) {
				str+="</b>";
		}
		if (obj.font_color != null && obj.font_color != '') {
				str+="</font>";
		}
			var item_name=str+obj.item_name;
		
			if(item_name.length>length){
				return str + obj.item_name.substr(0,length);
			}
			return str +item_name;
		}else{
			var item_name=obj.item_name;
			if(item_name.length>length){
				item_name=obj.item_name.substr(0,length);
			}
			return str+item_name;
		}
}
function getBigIcons(obj){
		var bigIcon = '';
		/* var flag = 1;
		if('Y' == obj.is_ljlj && obj.co_dc > 0 && flag == 1){
			
			bigIcon = 	' <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolordierjian">'+
	        				'<div class="hindexCommodityTipTitle"><span>2.6</span>折</div>'+
	        				'<div class="hindexCommodityTipIntro">第二件</div>'+
	        				'</div></div>';
			flag = 0;
		}else if('Y' == obj.is_ljlj && flag == 1){
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolordierjian">'+
	            			'<div class="hindexCommodityTipTitle"><img src="common/mobile_phone/cssimage/indeximg/dierjianlogo.png" /></div>'+
	            			'<div class="hindexCommodityTipIntro">第二件</div>'+
	            			'</div></div>';
			flag = 0;
		}else if('Y' == obj.is_zhg && obj.co_dc > 0 && flag == 1){
			
			bigIcon = 	' <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolortvgou">'+
							'<div class="hindexCommodityTipTitle"><span>'+obj.co_dc+'</span>折</div>'+
							'<div class="hindexCommodityTipIntro">TV商品</div>'+
							'</div></div>';
			flag = 0;
			
		}else if('Y' == obj.is_zhg && flag == 1){
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolortvgou">'+
				    		'<div class="hindexCommodityTipTitle"><img src="common/mobile_phone/cssimage/indeximg/tvgouwulogo.png" /></div>'+
				    		'<div class="hindexCommodityTipIntro">TV商品</div>'+
							'</div></div>';
			flag = 0;
		}else if('Y' == obj.is_tuan && obj.co_dc > 0 && flag == 1){
				bigIcon = 	' <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolorhaioutuan">'+
				'<div class="hindexCommodityTipTitle"><span>'+obj.co_dc+'</span>折</div>'+
				'<div class="hindexCommodityTipIntro">嗨鸥团</div>'+
				'</div></div>';	
		flag = 0;
		
		}else if('Y' == obj.is_tuan && flag == 1){
		
		bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolorhaioutuan">'+
				'<div class="hindexCommodityTipTitle"><img src="common/mobile_phone/cssimage/indeximg/haiyoutuanlogo.png"/></div>'+
				'<div class="hindexCommodityTipIntro">嗨鸥团</div>'+
				'</div></div>';
		flag = 0;
		
		}else if('Y' == obj.is_kr && obj.co_dc > 0 && flag == 1){
			
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolorhanguoguan">'+
							'<div class="hindexCommodityTipTitle"><span>'+obj.co_dc+'</span>折</div>'+
							'<div class="hindexCommodityTipIntro">韩国馆</div>'+
							'</div></div>';
			flag = 0;
			
		}else if('Y' == obj.is_kr && flag == 1){
			
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolorhanguoguan">'+
							'<div class="hindexCommodityTipTitle"><img src="common/mobile_phone/cssimage/indeximg/hanguoguanlogo.png"/></div>'+
							'<div class="hindexCommodityTipIntro">韩国馆</div>'+
							'</div></div>';
			flag = 0;
		}else if('Y' == obj.is_tv && obj.co_dc > 0 && flag == 1){
			
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolortvgou">'+
							'<div class="hindexCommodityTipTitle"><span>'+obj.co_dc+'</span>折</div>'+
							'<div class="hindexCommodityTipIntro">TV商品</div>'+
							'</div></div>';
			flag = 0;
			
		}else if('Y' == obj.is_tv && flag == 1){
			
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolortvgou">'+
				    		'<div class="hindexCommodityTipTitle"><img src="common/mobile_phone/cssimage/indeximg/tvgouwulogo.png" /></div>'+
				    		'<div class="hindexCommodityTipIntro">TV商品</div>'+
							'</div></div>';
			flag = 0;
			
		}else if('Y' == obj.is_food  && obj.co_dc > 0 && flag == 1){
			
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolormeishiguan">'+
			                '<div class="hindexCommodityTipTitle"><span>'+obj.co_dc+'</span>折</div>'+
			                '<div class="hindexCommodityTipIntro">美食馆</div>'+
			                '</div></div>';
			 flag = 0;
		}else if('Y' == obj.is_food && flag == 1){
			
			bigIcon = 	'  <div class="hCommonItemTipL"><div class="hindexCommodityTipBox bgcolormeishiguan">'+
	        				'<div class="hindexCommodityTipTitle"><img src="common/mobile_phone/cssimage/indeximg/meishiguanlogo.png" /></div>'+
	        				'<div class="hindexCommodityTipIntro">美食馆</div>'+
	        				'</div></div>';
			flag = 0;
		} */
		return bigIcon;
}
function getlinkURL(obj){
	var linkstr = '';
	if(obj.connect_type_cd!=null){
		if(obj.connect_type_cd=='1' || obj.connect_type_cd=='4'){
			if(obj.connect_tgt_addr!=null && obj.connect_tgt_addr!=''){
				linkstr = obj.connect_tgt_addr;
			}
		}else if(obj.connect_type_cd=='2'){
			linkstr = '/detail/'+obj.connect_tgt_addr;
		}else if(obj.connect_type_cd=='3'){
			linkstr = 'javascript:;';
		}
	}else if(obj.connect_tgt_addr!=null && obj.connect_tgt_addr!=''){
		linkstr = obj.connect_tgt_addr;
	}else if(obj.item_code!=null && obj.item_code!=''){
		linkstr = '/detail/'+obj.item_code;
	}
	if(linkstr=='' || linkstr=='null'){
		linkstr = 'javascript:;';
	}
	return linkstr;
}
			