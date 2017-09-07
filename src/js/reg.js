require(['config'],function(){
	require(['common','jquery'],function(com,$){



		//加载尾部
		$('#reg_foot').load('../html/footer.html',function(){



			//显示随机验证码
			$('.yzm b').on('click',function(){
				randomNum();
			})
			function randomNum(){
				$('.yzm i').html(com.vCode());
			}
			randomNum();



			//密码的可视/隐藏状态
			$('.psw i').on('click',function(){
				if(input2.attr('type')=='password'){
					input2.attr('type','text');
				}else{
					input2.attr('type','password');
				}
			})



			//表单验证、注册
			var input1 = $($('.reg-content input')[0]);
			var input2 = $($('.reg-content input')[1]);
			var input3 = $($('.reg-content input')[2]);
			var input4 = $($('.reg-content input')[3]);
			var flag1=false,flag2=false,flag3=false,flag4=false;
			//帐号
			input1.on('blur',function(){
				var user = input1.val();
				var reg1 = /^1[34578]\d{9}$/
				var reg2 = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
				if(!reg1.test(user) && !reg2.test(user)){
		            input1.css('border','2px solid red');
		            input1.siblings('i').html('手机号码/邮箱不正确');
		        }else{
		        	input1.css('border','1px solid #ccc');
		        	input1.siblings('i').html('');
		        	var xml = new XMLHttpRequest();
		        	xml.onreadystatechange = function(){
		        		if(xml.readyState == 4 && (xml.status == 200 || xml.status == 304)){
		        			if(xml.responseText == 'false'){
		        				input1.siblings('i').html('手机号码/邮箱已被占用');
		        			}else{flag1 = true}
		        		}
		        	}
		        	xml.open('get','../js/php/reg.php?username='+user+'&password='+'',true);
		        	xml.send(null);
		        }
			})
			//密码
			input2.on('blur',function(){
				var psw = input2.val();
				var reg = /^\S{6,20}$/;
				if(!reg.test(psw)){
					input2.css('border','2px solid red');
		            input2.siblings('b').html('6-20位空格以外的字符');
				}else{
					input2.css('border','1px solid #ccc');
		        	input2.siblings('b').html('');
		        	flag2 = true;
				}
			})
			//验证码
			input3.on('blur',function(){
				var num = $('.yzm i').html();
				if(input3.val() != num){
					$('.yzm .reg').html('验证码不正确');
					input3.css('border','2px solid red');
				}else{$('.yzm .reg').html('');input3.css('border','2px solid #ccc');flag3 = true;}
			})
			//协议打勾
			input4.on('change',function(){
				if(input4.prop('checked')){
					input4.siblings('span').css({'color':'black','border':'none'});
					flag4 = true;
				}else{input4.siblings('span').css({'color':'red','border':'1px solid red'});}
			})
			//提交
			$('.reg-content button').on('click',function(){
				var user = input1.val();
				var psw = input2.val();
				if(flag1&&flag2&&flag3&&flag4){
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function(){
						if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
							location.href = '../html/login.html';
						}
					}
					xhr.open('get','../js/php/reg.php?username='+user+'&password='+psw,true);
					xhr.send(null);
				}else{}
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