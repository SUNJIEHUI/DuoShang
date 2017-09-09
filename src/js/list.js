require(['config'],function(){
	require(['jquery'],function($){



		$('#l_head').load('../html/header.html');
		$('#l_foot').load('../html/footer.html');
		$('#l_nav').load('../html/nav.html',function(){
			


			require(['all'],function(){
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
									<a href="javascript:void(0);"><img class="pic" src="${item.url}"/></a>
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
											<a href="javascript:void(0);"><img class="pic" src="${item.url}"/></a>
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


				//跳转到详情页
	        	$('.g_warp ul').on('click','img',function(){
	        		var id = $(this).closest('li').attr('data-id');
	        		window.location.href = './details.html?id='+id;
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
})