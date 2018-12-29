ocj.myocj = {
  bannerBarFn : function () {
    var ie6 = !-[1,]&&!window.XMLHttpRequest;
    var doc = document,
        oDivBar = $(".pv_myocj_oclub_banner_bar"),
        toogle = $(".pv_myocj_oclub_toogle div.toogle")[0];
    toogle.onclick = function (){
      switch(ie6){
        case true : 
          if(this.className == 'toogle toogle_on'){
            oDivBar.show();
          } else {
            oDivBar.hide();
          }
        break;

        case false :
          if(this.className == 'toogle toogle_on'){
            oDivBar.show();
          } else {
            oDivBar.hide();
          }
        break;
      }
    }
  },

  myinfo : function () {
    //get dom
    var modBtn    = $(".mobile_telephone_mod")[0],
        veriBtn   = $(".mobile_telephone_veri")[0],
        mobileNum = $(".mobile_num")[0],
        mobileNew = $(".mobile_num_new")[0],
        submit    = $(".mobile_telephone_sub")[0],
        mb_div    = $(".mb_veri_div")[0],
        veriTime  = $(".veri_time")[0],
        veriSec   = $(".seconds")[0];
    //event
    modBtn.onclick = function(){
      this.className = "mobile_telephone_mod off";
      mobileNum.className = "mobile_num off";
      mobileNew.className = "basic2 mobile_num_new";
      veriBtn.className = "button mobile_telephone_veri";
      mb_div.className = "pv_myocj_myinfo_item clear_float mb_veri_div";
    };
    veriBtn.onclick = function(){
      // var seconds = 180;
      // veriBtn.style.color = "gray";
      // veriBtn.setAttribute("disabled");
      // veriTime.className = "veri_time";
      // var timer = setInterval(function (){
      //   seconds--;
      //   veriSec.innerText = seconds;
      //   if(seconds==0){
      //     veriBtn.style.color = "black";
      //     veriBtn.removeAttribute("disabled");
      //     veriTime.style.color = "gray";
      //     veriSec.style.color = "gray";
      //     clearInterval(timer);
      //   }
      // },1000);
    };
    $(".mobile_telephone_veri").click(function(){
      $(".mod").fadeIn();
    });
    $(".mod .close").click(function(){
      $(".mod").fadeOut();
    });
    $(".mod .cancel").click(function(){
      $(".mod").fadeOut();
    });
    $(".e_mod").click(function(){
      $(".e_mod_c").fadeIn();
    });
    $(".e_mod_c .close").click(function(){
      $(".e_mod_c").fadeOut();
    });
    $(".e_mod_c .cancel").click(function(){
      $(".e_mod_c").fadeOut();
    });
    $(".e_mod_c .confirm").click(function(){
      $(".e_mod_c").fadeOut();
      $(".e_mod_s").fadeIn();
    });
    $(".e_mod_s .confirm").click(function(){
      $(".e_mod_s").fadeOut();
    });
    $(".e_mod_s .close").click(function(){
      $(".e_mod_s").fadeOut();
    });
  },

  r20140520: function(){
    var mm = $(".mmore"),i;
    for(i=0; i<mm.length; i++){
      mm[i].onmouseover = function(){
        this.getElementsByTagName("span")[0].className = "more_title on";
      };
      mm[i].onmouseout = function(){
        this.getElementsByTagName("span")[0].className = "more_title";
      };
    };
  }

};

(function(){
	  $(document).ready(function(){
	    var ie6 = !-[1,]&&!window.XMLHttpRequest;
	    var doc = document,
	        oDivBar = $(".pv_myocj_oclub_banner_bar"),
	        toogle = $(".pv_myocj_oclub_toogle div.toogle")[0];
	    if(toogle){
	      toogle.onclick = function (){
	        switch(ie6){
	          case true :
	            if(this.className == 'toogle toogle_on'){
	              oDivBar.show();
	            } else {
	              oDivBar.hide();
	            }
	            break;

	          case false :
	            if(this.className == 'toogle toogle_on'){
	              oDivBar.show();
	            } else {
	              oDivBar.hide();
	            }
	            break;
	        }
	      }
	    }
	  });
	})();

ocj.myocj['complaint'] = {
  initApply: function(){
    var result = $('.pv_myorder_complaint');
    result.delegate('span','click',function(){
      var index = $(this).attr('data');
      result.trigger('show_process',index)
    });
    result.bind('show_process',function(e,index){
      result.find("span[data='" + index + "']").parents('tr').toggleClass('cur');
      result.find(".process[data='" + index + "']").toggleClass('process_cur');
    });
  }
};
ocj.myocj['myinvoice'] = {
  initApply: function()
  {
    var tObj = $('.pv_myocj_myinvoice_apply');
    var tAddressTypeChange = function()
    {
      var tAddressTypeValue = 0;
      tObj.find('input.address_type').each(function(){ if (this.checked) tAddressTypeValue = this.value; });
      tObj.find('.textarea_address').hide();
      tObj.find('.textarea_address_' + tAddressTypeValue).show();
	  jQuery.ajax({ 
			type: "POST",
			url: "selectMgroupDo.jhtml",
			dataType: "json",
			data: {"area_lgroup": area_lgroup},
			success: function(data){ 
				
			}
	  }); 
    };
    tObj.find('input.type').click(function(){
      var tThisObj = $(this);
      tObj.find('.invoice_item').removeClass('invoice_item_on');
      tObj.find('.invoice_item').find('div.textarea').hide();
      tThisObj.parent().parent().parent().addClass('invoice_item_on');
      tThisObj.parent().parent().parent().find('div.textarea').show();
      if(tObj.find('.invoice_item')[0].className!="invoice_item invoice_item_on"){
        tAddressTypeChange();
      }
    });
    tObj.find('input.address_type').click(function(){ tAddressTypeChange(); });
    var valPerson = tObj.find('.val_person');
    var titleCompanyTip = tObj.find('input[name=title]');
    var titleCompany = tObj.find('span.word');
    var titleChoose = tObj.find('label.label_1').add(tObj.find('label.label_2'));
    titleChoose.click(function(){
      var index = titleChoose.index($(this));
      if(index==0){
        titleCompanyTip.val("个人");
        valPerson.show();
        titleCompanyTip.hide();
        titleCompany.hide();
      }
      else {
        titleCompanyTip.val("");
        valPerson.hide();
        titleCompanyTip.show();
        titleCompany.show();
      }
    })
  }
};


