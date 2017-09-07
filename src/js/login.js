require(['config'],function(){
	require(['jquery'],function($){



		//加载尾部
		$('#l-foot').load('../html/footer.html',function(){
			//尾部修改遮罩
			$('#_foot').append($('<div/>').addClass('zhe'));
			$('.foot-top').append($('<img src="../img/login4.jpg"/>').addClass('tu'))
			


			//判断cookie是否需要自动登录
			var cookies = document.cookie.split('; ');
			var username;
			var password;
			cookies.forEach(function(item){
				var arr = item.split('=');
				if(arr[0] === 'username'){
					username = arr[1];
					//console.log(username);
				}
				if(arr[0] === 'password'){
					password = arr[1];
					//console.log(password);
				}
			})
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
					console.log(xhr.responseText);
					if(xhr.responseText == 'true'){
						console.log(666);
						location.href = '../index.html';
					}else{}
				}
			}
			xhr.open('get','../js/php/login.php?username='+username+'&password='+password,true);
			xhr.send(null);



			//登录验证
			$('button').on('click',function(){
				var user = $($('input')[0]).val();
				var psw = $($('input')[1]).val();
				if(user != '' && psw != ''){
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(){
						if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
							console.log(xhr.responseText);
							if(xhr.responseText == 'true'){
								//自动登录、保存cookie
								if($($('input')[2]).prop('checked')){
									var now = new Date();
									now.setDate(now.getDate() + 7);
									document.cookie = 'username=' + user + ";path = /" + ';expires=' + now.toString();
									document.cookie = 'password=' + psw + ";path = /" + ';expires=' + now.toString();
								}
								location.href = '../index.html';
							}else{
								alert('用户名/密码有误');
							}
						}
					}
					xhr.open('get','../js/php/login.php?username='+user+'&password='+psw,true);
					xhr.send(null);
				}
			})
		})
	})
})