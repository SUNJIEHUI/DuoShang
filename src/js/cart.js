require(['config'],function(){
	require(['jquery'],function($){



		$('#l_head').load('../html/header.html');
		//$('#l_foot').load('../html/footer.html');
		$('#l_nav').load('../html/nav.html',function(){
			
			
			
			//二级菜单移入触发
			var li = $('.allClass').children().eq(1).children().children();
			$('.allClass').children().eq(1).css('display','none');
			$('.allClass').on('mouseenter',function(){
				$('.allClass').children().eq(1).css('display','block');
				for(var i=0;i<li.length;i++){
					$(li).eq(i).on('mouseenter',function(){
						$(this).css('backgroundColor','white');
						$div = $('<div/>').addClass('zhezhao');
						$(this).append($div);
						$('.zhezhao').css('backgroundColor','white');
						$(this).children().children().eq(0).css('backgroundImage','url(/img/idx10.png)');
						$(this).children().children().eq(1).css('color','red');
						$(this).children().children().eq(3).children().css('color','#666');
						$(this).children().children().eq(3).on('mouseenter','a',function(){
							$(this).css('color','red');
						}).on('mouseleave','a',function(){
							$(this).css('color','#666');
						})
						$($(this).children()[1]).css('display','block');
					}).on('mouseleave',function(){
						$('.zhezhao').remove();
						$($(this).children()[1]).css('display','none');
						$(this).css('backgroundColor','#222');
						$(this).children().children().eq(0).css('backgroundImage','url(/img/idx6.png)');
						$(this).children().children().eq(1).css('color','white');
						$(this).children().children().eq(3).children().css('color','white');
					})
				}
			}).on('mouseleave',function(){
				$('.allClass').children().eq(1).css('display','none');
			})



			//回到顶部
			$('#backTop').on('click',function(){	
  				$('body,html').animate({scrollTop:0},'fast');
			})



			//右边弹窗
			$('#rightSide').css({top:$(window).height()/2-$('#rightSide').height()/2})
			$('#rightSide span').on('click',function(){
				if($('#rightSide').hasClass('active')){
					$('#rightSide').removeClass('active');
					$('#rightSide').animate({right:-210}).animate({right:-177});
				}else{
					$('#rightSide').addClass('active');
					$('#rightSide').animate({right:-210}).animate({right:0});
				}
			})
			
			
			
		})
	})
})