require(['config'],function(){
	require(['jquery','lunbo'],function($,lb){



		//引入模块
		$('#h_head').load('./html/header.html');
		$('#h_foot').load('./html/footer.html');
		$('#h_nav').load('./html/nav.html',function(){



			//显示用户名称
			var cookies = document.cookie.split('; ');
			var username;
			cookies.forEach(function(item){
				var arr = item.split('=');
				if(arr[0] === 'username'){
					username = arr[1];
					console.log(username);
				}
				$('.reglogin').find('p').html(username);
			})



			//二级菜单移入触发
			var li = $('.allClass').children().eq(1).children().children();
			for(var i=0;i<li.length;i++){
				$(li).eq(i).on('mouseenter',function(){
					$(this).css('backgroundColor','white');
					$div = $('<div/>').addClass('zhezhao');
					$(this).append($div);
					$('.zhezhao').css('backgroundColor','white');
					$(this).children().children().eq(0).css('backgroundImage','url(./img/idx10.png)');
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
					$(this).children().children().eq(0).css('backgroundImage','url(./img/idx6.png)');
					$(this).children().children().eq(1).css('color','white');
					$(this).children().children().eq(3).children().css('color','white');
				})
			}



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
