$(document).ready(function() {
	Chat.login = function() {
		if ($("#chatLogin").val() === "" || $("#chatPasswd").val() === "") {
			Materialize.toast('Enter login credentials!', 2000)
			return
		}
		var credentials = {
			"username": btoa($("#chatLogin").val()),
			"password": btoa($("#chatPasswd").val())
		};

		$.ajax({
				type: "POST",
				url: "/api/users/login",
				data: JSON.stringify(credentials),
				contentType: "application/json; charset=utf-8",
				headers: {
					//"Authorization": 	//deleted in order to publish
				},
			})
			.done(function(response, statusCode, xhr) {
				
				//get all necessary data

				Chat.Get.accountInfo()
				Chat.Get.groups()
				Chat.users = Chat.Get.users()
				Chat.users = Chat.users.users
				
				//Chat.readLocalSettings			//TODO execute this after accountInfo is downloaded
				
				Chat.show()
				$("#chatLoginHeader").attr("style", "display:none;")
				$("#chatChatHeader").attr("style", "display:block;")
				Materialize.toast(response, 2000)		//response = login successful
				Chat.logged = true
				Chat.currentUser = $("#chatLogin").val()
				$("#chatVisibleLogin").text(Chat.currentUser)
				$("#chatPasswd").val("") 	//clearing password field
				
				//setting cookie 
				
				var userCookie = "chatUsername="
				userCookie += credentials.username
				document.cookie = userCookie
			})
			.fail(function(response) {
				var p = $("<p>")
				p.attr("class", "red-text")
				p.text("Error: incorrect credentials")
				Materialize.toast(p, 3000)
			})
		return Chat.logged
	}
})