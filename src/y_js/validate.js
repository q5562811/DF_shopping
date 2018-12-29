// JavaScript Document
$(document).ready(function() {
  $('.field .hock').focus(function(){
	$(this).addClass('blue');  
  }).blur(function(){
	$(this).removeClass('blue');   
  });
  
  /* 侦听键盘输入 */
  var toggleControl = function(event){
	var curobj = $(event.target);
	if(curobj.val()!=''){
	  curobj.siblings('.input_control').addClass('input_control_show');   
	}else{
	  curobj.siblings('.input_control').removeClass('input_control_show');
	  curobj.removeClass('error');
	  curobj.siblings('.input_control').removeClass('input_control_error');
	}  
  };
  
  $('.hock').bind('keyup',toggleControl);
  
  
  /* 侦听黏贴 */
  var pasteControl = function(event){
	var el = $(event.target);
	setTimeout(function() {
	  var text = $(el).val();
	  if(text!=''){
		el.siblings('.input_control').addClass('input_control_show');    
	  }else{
		el.siblings('.input_control').removeClass('input_control_show');
		el.removeClass('error');
		el.siblings('.input_control').removeClass('input_control_error');
	  }
	}, 100);
  };
  $('.hock').bind('paste',pasteControl);
  
  
  /* 清空输入 */
  $('.input_control').click(function(event){
   event.preventDefault();
   $(this).siblings('.hock').removeClass('error');
   $(this).siblings('.hock').addClass('blue');
   $(this).siblings('.hock').val('');
   $(this).siblings('.hock').focus();
   $(this).removeClass('input_control_show');
   $(this).removeClass('input_control_error');
  })
}) //end ready