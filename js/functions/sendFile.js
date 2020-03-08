function chatSendFile() {	//input onchange must have function declared before body loads
	Chat.sendFile()
}

//TODO extend string max-length to let images to be uploaded

$(document).ready(function() {
	Chat.sendFile = function() {
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
			Materialize.toast('The File APIs are not fully supported in this browser.',2000);
			return;
		}

		var input = $("#chatAttachment")[0]
		if (!input) {
			Materialize.toast("Uhm, couldn't find the fileinput element.",2000);
		} else if (!input.files) {
			Materialize.toast("This browser doesn't seem to support the `files` property of file inputs.",2000);
		} else {
			chatfile = input.files[0];
			chatfr = new FileReader();
			chatfr.onload = sendImageInBase64;
			chatfr.readAsDataURL(chatfile);
		}
	}

	function sendImageInBase64() {
		if (Chat.activeConversation === undefined) {
			Materialize.toast("Select proper conversation", 2000)
			return
		}

		if (Chat.currentUser === undefined) {
			Chat.logout()
			Materialize.toast("An error occurred. Please log in", 2000)
		}

		var msg = {
			creationTime: Chat.Get.timeStamp(),
			target: Chat.activeConversationNo,
			msg: "<img>" + chatfr.result
		}
		$("#chatMsg").val("").focus()

		$.ajax({
				type: "POST",
				url: "/api/chat/messages/private/" + Chat.activeConversationNo,
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
				var img = new Image()
				img.src = (msg.msg).substr(5)
				img.setAttribute("class", "materialboxed")
				img.setAttribute("height:", "100")
				li.append(img)
				$("#chatMessages").append(li)
				li.prepend(p)
				$('#chatMessages').scrollTop(999999999999999999)
				$('.materialboxed').materialbox();
				$("#chatMsg").focus()
				Materialize.toast("Message sent", 2000)
			})
			.fail(function(response) {
				Materialize.toast("An error occurred while sending message", 2000)
			});
	}
})