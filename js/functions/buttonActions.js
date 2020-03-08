$(document).ready(function() {
	$("#chatLog-in").on("click", function() {
		Chat.login()
	})

	$("#chatLog-off").on("click", function() {
		Chat.logout()
	})

	$("#chatSwitchChats").on("click", "li", function(event) {
		if($(this).index() !== 0)
			Chat.switchChats($(this))
		else
			event.stopPropagation()
	})

	$("#chatSend").on("click", function() {
		Chat.send()
	})

	$("#chatOpenAdminPanel").on("click", function() {
		Chat.AdminPanel.open()
	})

	$("#chatAdminPanelClose").on("click", function() {
		Chat.AdminPanel.close()
	})

	$("#chatMsg").focusin(function() {
		$(document).keypress(function(e) {
			if (e.which == 13) {
				Chat.send()
			}
		});
	})

	$("#chatMsg").focusout(function() {
		$(document).unbind("keypress")
	})

	$("#chatPasswd").focusin(function() {
		$(document).keypress(function(e) {
			if (e.which == 13) {
				Chat.login()
			}
		});
	})

	$("#chatPasswd").focusout(function() {
		$(document).unbind("keypress")
	})

	$("#chatOpenChat").on("click", function() {
		$("#chatSwitchChats").empty()
		Chat.addUsersView()
		$("#chatFirstLi input").on("focusin", function() {
			Chat.search()
		})

		$("#chatFirstLi input").on("focusout", function() {
			$(document).unbind("keyup")
			$(document).unbind("keypress")
		})
	})

	$("#chat label i").on("click", function() {
		$("#chatAttachment").click()		//fake input type=file imitates hidden input
	})

	$("#chatRoundedCorners").on("click", function() {
		switch($("#chatRoundedCorners").prop("checked")){
			case true:{
				$("#chatMessages")[0].style.borderRadius = "10px"
				$("#chatMsg")[0].style.borderRadius = "10px"
				break;
			}
			case false:{
				$("#chatMessages")[0].style.borderRadius = "2px"
				$("#chatMsg")[0].style.borderRadius = "3px"
				break;
			}
		}
	})
	
	Chat.firstTime = true		//read local saved settings only when chat is opened for the first time
	$("#chatSlide").on("click",function(){
		if(Chat.firstTime){
			Chat.readLocalSettings()
			Chat.firstTime = false
		}
		if (!Chat.me.email)		//give one more chance when user opens chat before accountInfo is downloaded from server
			Chat.firstTime = false
	})
})