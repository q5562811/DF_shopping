$(document).ready(function(){var $slide=$('.slide');var $slide_inner=$('.slide_inner');var $slide_list=$('.slide_list');var li_sum=$slide_list.find('li').length;var $first_li=$slide_list.find('li:first');var $last_li=$slide_list.find('li:last');var li_width=$('.slide_list').find('li:first').width();var ul_width;var current=0;function gotoPage(target){var distance=li_width*target*(-1);$slide_inner.stop().animate({left:distance},500,function(){if(target==0){$slide_inner.css({'left':-li_width*(li_sum-2)});target=li_sum-2}else if(target==li_sum-1){$slide_inner.css({'left':-li_width});target=1};current=target;$('.pg .cur').text(current+' ')})};$('.prev').bind('click',function(e){e.preventDefault();gotoPage(current-1)});$('.next').bind('click',function(e){e.preventDefault();gotoPage(current+1)});$slide_list.append($first_li.clone()).prepend($last_li.clone());li_sum=$slide_list.find('li').length;ul_width=li_width*li_sum;$('.slide_list').css({'width':ul_width+'px'});$slide_inner.css({'left':-1*li_width});current=1;$('.pg .gl').text(' '+li_sum-2);$('.pg .cur').text(current+' ');var loop;loop=setInterval(function(){gotoPage(current+1)},6000);$slide.hover(function(){if(loop){clearInterval(loop)}},function(){loop=setInterval(function(){gotoPage(current+1)},6000)});$('.slide .next').mouseenter(function(){$(this).find('.bg').stop().animate({'right':'0'},200,function(){$(this).find('.pg').fadeIn()});$(this).find('.icon').addClass('on')}).mouseleave(function(){$(this).find('.pg').css({'display':'none'});$(this).find('.bg').stop().animate({'right':'-41px'},200);$(this).find('.icon').removeClass('on')});$('.slide .prev').mouseenter(function(){$(this).find('.bg').stop().animate({'left':'0'},200,function(){$(this).find('.pg').fadeIn()});$(this).find('.icon').addClass('on')}).mouseleave(function(){$(this).find('.pg').css({'display':'none'});$(this).find('.bg').stop().animate({'left':'-41px'},200);$(this).find('.icon').removeClass('on')})});