require(['config'],function(){
	require(['jquery'],function($){
		$('#c_head').load('../html/header.html');
		$('#c_foot').load('../html/footer.html');
		$('#c_nav').load('../html/nav.html',function(){
			


			require(['all'],function(){


				$.ajax({
					type:'GET',
					url:'../js/php/cart1.php',
					success:function(data){


						//数据生成
						var res = JSON.parse(data);
						res.forEach(function(item){
							var tr = $('<tr/>');
							tr.prop('data-id',item.id);
							var zong = item.qty*item.price;
							tr.html(`
									<td class="p1">
										<p>
											<a href="#"><img src="${item.url}"></a>
										</p>
										<h3>
											<a href="#">${item.name}</a>
										</h3>
									</td>
									<td class="p2">
										<span class="u_price">¥${item.price}</span>
									</td>
									<td class="p2">
										<img src="/img/c3.gif">
										<input type="text" value="${item.qty}">
										<img src="/img/c4.gif">
									</td>
									<td class="p2">
										<span class="price">¥${zong}</span>
									</td>
									<td class="p2">
										<a class="deleat" href="#">删除</a>
									</td>
								`)
							$('tbody').append(tr);
						})



						//数量
						$('.p2 img:even').on('click',function(){
							var val = $(this).siblings('input').val();
							if(val>1){
								val--;
							}else{
								val=1;
							}
							$(this).siblings('input').val(val);
							money($(this));
						})
						$('.p2 img:odd').on('click',function(){
							var val = $(this).siblings('input').val();
							val++;
							$(this).siblings('input').val(val);
							money($(this));
						})



						//计算价钱
						function money(a){
							var num = a.siblings('input').parent().siblings().find('.u_price').text().replace('¥','')*a.siblings('input').val();
							a.parent().siblings().find('.price').html('¥'+num);
							he();
						}
						function he(){
							var pri = $('.price');
							var zong = 0;
							for(var i=0;i<pri.length;i++){
								zong += $('.price').eq(i).text().replace('¥','')*1
							}		
							$('.buy strong').html('¥'+zong);
						}
						he();



						//删除商品
						$('.deleat').on('click',function(){
							var id = $(this).closest('tr').prop('data-id');
							$.ajax({
								type:'GET',
								url:'../js/php/cart1.php',
								data:'id='+id,
								success:function(data){
									console.log(data);
								}
							})
							$(this).closest('tr').remove();
						})
					}
				})
			})
		})
	})
})