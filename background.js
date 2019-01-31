$(document).ready(function(){
	var contextItem = {
		"id":"share_url",
		"title" :"Share Url",
		"contexts":["all"]
	};
	var localStorageUrl = [];
	var localStorageData = {};
	chrome.contextMenus.create(contextItem);
	chrome.contextMenus.onClicked.addListener(function(){
		sendUrl();
	});

	function sendUrl(){
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			var tabURL = tabs[0].url;
			chrome.storage.local.get('jwt_token',function(data){
				if(data.jwt_token == undefined){
					alert('login Again');					
				}else{
					console.log(data.jwt_token);
					$.ajax({
					type:'POST',
					url:'http://localhost:3000/api/addArticle',
					data: {articleUrl: tabURL,jwt_token:data.jwt_token},
					success:function(response){
						console.log(response);
					}
					});
				}
			});
		});
	}


});
	