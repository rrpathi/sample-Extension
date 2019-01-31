	$(document).ready(function(){
		$("#success").hide();
		$("#show_content").hide();
			chrome.storage.local.get('jwt_token',function(data){
				if(data == null || data.jwt_token == null){
					console.log('show login');
					$("#show_content").show();
					$("#login").click(function(e){
						e.preventDefault();
						var email = $("#email").val();
						var password = $('#password').val();
						$.ajax({
							type:'POST',
							url:'http://localhost:3000/api/login',
							data: {email: email,password:password},
							success:function(response){
								if(response.status === 'ok'){
									$("#show_content").hide();
									$("#success").show();
									chrome.storage.local.set({'jwt_token': response.token}, function() {
										console.log('token Saved Success');
									});
								}
							}
						});
					});
				}else{
					$("#success").show();
					$("#show_content").hide();

				}
			});
	});