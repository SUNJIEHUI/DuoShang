require(['config'],function(){
	require(['jquery'],function($){



		$('#l_head').load('../html/header.html');
		$('#l_foot').load('../html/footer.html');
		$('#l_nav').load('../html/nav.html',function(){


			require(['all'],function(){



				//获取商品数据
				var params = location.search.substring(1).split('&');
				var g_id = params[0].split('=')[1];
				var price;
				$.ajax({
					type:'GET',
					url:'../js/php/cart.php',
					data:'gId='+g_id,
					success:function(data){
						res = JSON.parse(data);
						price = res.price;
						$('.t_warp h1').html(res.name);
						$('.c_big').attr('src',res.url);
						$('.c_big').siblings('ul').find('img:even').attr('src',res.url);
						$('.c_left div')[1].innerHTML = `<p>≥1件</p>
														<p>${res.price}<b>分销价</b></p>
														`
						$('.c_left div').eq(2).find('em').eq(0).html(res.qty);
						$('.c_left div').eq(2).find('b').eq(0).html('￥'+(res.price*1+20).toFixed(2));
						$('.s_bottom div').eq(1).find('a').html(res.price);
					}
				})



				//展示图替换
				$('.c_right li img').on('mouseenter',function(){
					var s_url = $(this).prop('src');
					$(this).parent().siblings().find('img').css('border','1px solid #e7e7e7');
					$(this).css('border','1px solid red');
					$('.c_big').prop('src',s_url);
				})
				/*var imgUrl = $('.c_big').prop('src');
				console.log(imgUrl)
				$('.zoom img').prop('src',imgUrl);*/



				//显示价格
				var jia = $('.s_bottom .jia');
				var jian = $('.s_bottom .jian');
				var input = $('.s_bottom div').eq(1).find('input');
				var num;
				for(var i=0;i<jia.length;i++){
					jia.eq(i).on('click',function(){
						num = $('.c_submit p').eq(0).find('b').html();
						num = num*1+1;
						$('.c_submit p').eq(0).find('b').html(num);
						$('.c_submit p').eq(0).find('em').html(num*(price*1000)/1000);
					})
				}
				for(var i=0;i<jian.length;i++){
					jian.eq(i).on('click',function(){
						if($(this).siblings('input').val()<=0){
						num = $('.c_submit p').eq(0).find('b').html();
							num = num*1-0;
						}else{
							num = num*1-1;
						}
						if($('.c_submit p').eq(0).find('b').html()=='0'){
							$('.c_submit p').eq(0).find('b').html('0');
						}else{
							$('.c_submit p').eq(0).find('b').html(num);
						}
						$('.c_submit p').eq(0).find('em').html(num*(price*1000)/1000);
					})
				}



				//数量
				$('.jia').on('click',function(){
					var num = $(this).siblings('input').val()*1;
					num++;
					$(this).siblings('input').val(num);
				})
				$('.jian').on('click',function(){
					var num = $(this).siblings('input').val()*1;
					num--
					if(num<=0){
						num = 0;
					}
					$(this).siblings('input').val(num);
				})



				$('.c_submit p').eq(1).find('a').eq(1).on('click',function(){
					var cookies = document.cookie.split('; ');
					var username;
					var password;
					cookies.forEach(function(item){
						var arr = item.split('=');
						if(arr[0] === 'username'){
							username = arr[1];
						}
						if(arr[0] === 'password'){
							password = arr[1];
						}
					})
					$.ajax({
						type:'GET',
						url:'../js/php/login.php',
						data:'username='+username+'&password='+password,
						success:function(data){
							if(data==='true'){
								if($('.c_submit p').eq(0).find('b').html()!='0'){

									var url = $('.c_big').attr('src');
									var name = $('.t_warp').find('h1').html();
									var pri = $('.c_left div').eq(1).find('p').eq(1).text().replace('分销价','');
									var qty = $('.c_submit p').eq(0).find('b').html();
									var price = Number(pri);
									//console.log(price);
									$.ajax({
										type:'GET',
										url:'../js/php/details.php',
										data:'username='+username+'&url='+url+'&name='+name+'&price='+price+'&qty='+qty,
										success:function(data){
											if(data=='true'){
												var big = $('.c_big');
												var img = big.clone();
												var car = $('.buycar');
												img.css({'z-index':99,'width':big.offset().width,'position':'absolute','top':big.position().top,'left':big.position().left})
												$('.right').append(img);
												console.log(car[0].offsetTop);
												img.animate({
													'width':20,
													'height':20,
													'top':window.scrollY,
													'left':car.position().left
												},1000,function(){
													img.remove();
												})
												//alert('已放进购物车');
											}
										}
									})
								}
							}else{
								if(confirm('请登录')){
									location.href = '/html/login.html';
								}
							}
						}
					})
				})
			})
		})
	})
})