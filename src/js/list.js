require(['config'],function(){
	require(['jquery'],function($){



		$('#l_head').load('../html/header.html');
		$('#l_foot').load('../html/footer.html');
		$('#l_nav').load('../html/nav.html',function(){
			
			
			//请求数据
			var page = 1;
			var qty = 10;
			var last = page;
			$.ajax({
				type:'GET',
				url:'../js/php/list.php',
				data:'pageNo='+page+'&qty='+qty,
				success:function(res){
					var ul = $('.g_warp ul');
					//console.log(ul);
					res = JSON.parse(res);
					console.log(res);
					ul[0].innerHTML = res.data.map(function(item){
						return `
							<li data-id="${item.id}">
								<a href="#"><img class="pic" src="${item.url}"/></a>
								<p>
			                    	${item.name}
								</p>
								<div class="l_qty">
									<a href="#">女人志</a>
									<img src="/img/list12.gif"/>
									<span>${item.qty}件</span>
								</div>
								<div class="price">
									<span>￥${item.price}</span>
									<i>立即上架</i>
								</div>
							</li>	
						`
					}).join('');
					/*page++;
					qty+=10;*/
				}
			})
			
			
			$(window).on('scroll',function(){
				if($(this).scrollTop() >= ($(document.body).height()-$(window).height())-300/* && last !== page*/){
				console.log(666);
					$.ajax({
						type:'GET',
						url:'../js/php/list.php',
						data:'qty='+qty,
						success:function(res){
							var ul = $('.g_warp ul');
							//console.log(ul);
							res = JSON.parse(res);
							//console.log(res);
							ul[0].innerHTML = res.data.map(function(item){
								return `
									<li data-id="${item.id}">
										<a href="#"><img class="pic" src="${item.url}"/></a>
										<p>
					                    	${item.name}
										</p>
										<div class="l_qty">
											<a href="#">女人志</a>
											<img src="/img/list12.gif"/>
											<span>${item.qty}件</span>
										</div>
										<div class="price">
											<span>￥${item.price}</span>
											<i>立即上架</i>
										</div>
									</li>	
								`
							}).join('');
							/*last = page;
							console.log(Math.ceil(res.total/res.qty));
							if(page<Math.ceil(res.total/res.qty)){*/
								//page++;
								//console.log(page);
								qty+=10;
							//}
						}
					})
				}
			})


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



			//轮播图
			for(var i=0;i<$('.lunbo1 li').length;i++){
				$('.lunbo1 li').eq(i).css('backgroundImage','url(/img/list'+(i+1)+'.jpg)')
			}
			var idx = 0;
			var ul = $('.lunbo1 ul');
			var timer;
			$('.lunbo1 li').eq(idx).css('display','block');

			function show(){
				timer = setInterval(function(){
					idx++;
					if(idx >= $('.lunbo1 li').length){
						idx = 0;
					}
					$('.lunbo1 li').eq(idx).fadeIn(1000).siblings().fadeOut(1000);
				},3000)
			}
			show();

			ul.on('mouseenter',function(){
				clearInterval(timer);
			}).on('mouseleave',function(){
				show();
			})
		})
	})
})