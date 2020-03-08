$(document).ready(function() {
	Chat.logout = function() {
		$.ajax({
				type: "GET",
				url: "/api/users/logout"
			})
			.done(function(response, statusCode) {

				Materialize.toast(response, 2000)
				$("#chatVisibleLogin").text("logged out")
				$("#chatLoginHeader").attr("style", "display:block;")
				$("#chatChatHeader").attr("style", "display:none;")
				Chat.logged = false
				Chat.firstTime = true
			})
			.fail(function(response) {
				var p = $("<p>")
				p.attr("class", "red-text")
				p.text("Failed to log out: " + JSON.stringify(response))
				$("#chatLoginHeader").attr("style", "display:block;")
				$("#chatChatHeader").attr("style", "display:none;")
				Materialize.toast(p, 2000)
			})
			.always(function(response) {
				Chat.hide()
					//reseting user downloaded data
				Chat.currentUser = Chat.downloaded = Chat.me = Chat.h = Chat.activeConversation = Chat.activeConversationNo = Chat.users = undefined
				$("#chatSwitchChats").html("")
				$("#chatMessages").html("")
				$("#chatVhatName").text("Messages")
				document.cookie = "chatUsername=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"

				//reseting style
				$("link")[4].href = "css/font/default.css"
				$("link")[3].href = "css/colors/default.css"
				Chat.collectionItemClass = "collection-item blue-grey-text darken-3"
				Chat.collectionItemClass_p = "blue-grey-text"
				Chat.myMsgStyle = "float:right;"
			})
	}
})