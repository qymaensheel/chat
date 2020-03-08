$(document).ready(function() {
	Chat.send = function() {
		var text = $("#chatMsg").val()
		if (!text)
			return

		if (Chat.activeConversation === undefined) {
			Materialize.toast("Select proper conversation", 2000)
			return
		}

		if (Chat.currentUser === undefined) {
			Chat.logout()
			Materialize.toast("An error occured. Please log in", 2000)
		}

		var msg = {
			creationTime: Chat.Get.timeStamp(),
			target: Chat.activeConversationNo,
			msg: text
		}

		if (!Chat.isGroup) {
			msg.target = Chat.activeConversationNo - Chat.me.groups.length + 1		//all list items minus groups 
			console.log(msg)
			$("#chatMsg").val("").focus()

			$.ajax({
					type: "POST",
					url: "/api/chat/messages/private/" + msg.target,
					data: JSON.stringify(msg),
					contentType: "application/json; charset=utf-8"
				})
				.done(function(response, statusCode) {
					var li = $("<li>")
					var p = $("<p>")
					p.text(Chat.Get.dateFromStamp(msg.creationTime))
					li.attr("class", Chat.collectionItemClass)
					li.attr("style", Chat.myMsgStyle)
					p.attr("class", Chat.collectionItemClass_p)
					li.text(msg.msg)
					$("#chatMessages").append(li)
					li.prepend(p)
					$('#chatMessages').scrollTop(999999999999999999)		//be sure that after sending messages list will be always scrolled down
					$("#chatMsg").focus()
					Materialize.toast("Message sent", 2000)
				})
				.fail(function(response) {
					Materialize.toast("An error occurred while sending message", 2000)
				});
		} else {
			msg.target = Chat.activeConversationNo + 1
			console.log(msg)
			$("#chatMsg").val("").focus()

			$.ajax({
					type: "POST",
					url: "/api/chat/messages/group/" + msg.target,
					data: JSON.stringify(msg),
					contentType: "application/json; charset=utf-8"
				})
				.done(function(response, statusCode) {
					var li = $("<li>")
					var p = $("<p>")
					p.text(Chat.me.name + " " + Chat.me.surname)
					li.attr("class", "collection-item blue-grey-text darken-3")
					li.attr("style", "float:right;")
					p.attr("class", "blue-grey-text")
					li.text(msg.msg)
					li.addClass("tooltipped")
					li.attr("data-position", "left")
					li.attr("data-tooltip", Chat.Get.date())
					li.attr("data-delay", "200")
					$("#chatMessages").append(li)
					li.prepend(p)
					$('#chatMessages').scrollTop(999999999999999999)
					$("#chatMsg").focus()
					Materialize.toast("Message sent", 2000)
					$('#chat .tooltipped').tooltip({
						delay: 200
					});
				})
				.fail(function(response) {
					Materialize.toast("An error occurred while sending message", 2000)
				});
		}
	}
})