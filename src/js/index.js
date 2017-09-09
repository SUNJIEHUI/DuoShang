require(['config'],function(){
	require(['jquery','lunbo'],function($,lb){



		//引入模块
		$('#h_head').load('./html/header.html');
		$('#h_foot').load('./html/footer.html');
		$('#h_nav').load('./html/nav.html',function(){


			require(['all'],function(){

				$('.allClass').children().eq(1).css('display','block');

				//轮播图一
				$('.lunbo1').carousel({
					imglist:['./img/lunbo1.jpg','./img/lunbo2.jpg','./img/lunbo3.jpg','./img/lunbo4.jpg','./img/lunbo5.jpg'],
					page:'center',
					width:529,
					height:267,
					type:'top'
				});
				//轮播图二
				var ul = $('.lunbo2 ul');
				var height = $('.lunbo2 ul li')[0].offsetHeight;
				var len =  $('.lunbo2 ul li').length;
				var index = 0;
				var timer;
				function move(){
					if(index<0){
						index = len-1;
					}else if(index > $('.lunbo2 ul li').length-1){
						index = 0;
					}
					ul.animate({top:-index*height});
				}
				$('.lunbo2').on('mouseenter',function(){
					clearInterval(timer);
				}).on('mouseleave',function(){
					timer = setInterval(function(){
						index++;
						move();
					},3000);	
				}).trigger('mouseleave');
				$('.lunbo2').on('click','.next',function(){
					index++;
					move();
				}).on('click','.prev',function(){
					index--;
					move();
				})



				//品牌移入触发
				$('#logos li').on('mouseenter',function(){
					var zhe = $('<div/>').addClass('zhe').html('妮维雅');
					$(this).append(zhe);
				}).on('mouseleave',function(){
					$('.zhe').remove();
				})
			})	
		})
	})
})
