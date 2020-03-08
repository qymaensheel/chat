$(document).ready(function() {

	$("#chatOpenChat").attr("style", "display:none;")
	$("#chatRest").attr("style", "display:none;")
	Chat.logged = false //bool telling if someone is logged in or not
	Chat.activeConversation = undefined //name of active conversation
	Chat.currentUser = undefined //email of current logged user
	Chat.users = undefined //array containing id's of avaliable users

	//style helping variables

	Chat.collectionItemClass = "collection-item blue-grey-text darken-3" //messages style patterns
	Chat.collectionItemClass_p = "blue-grey-text"
	Chat.myMsgStyle = "float:right;"

	//initialization of side chat

	$("#chatSlide").attr("data-activates", "chat")
	$('#chatSlide').sideNav({
		menuWidth: 350,
		edge: 'right',
		draggable: true
	});

	//initialization of settings panel/group list


	$('#chatAdminPanel').modal({
		dismissible: false
	});

	//checking if user is logged in

	$.ajax({
			type: "GET",
			url: "/api/users/loginCheck"
		})
		.done(function(response, statusCode) {

			Chat.logged = true;
			console.log("User is logged in");
			Chat.users = Chat.Get.users()
			Chat.Get.accountInfo()
			Chat.users = Chat.users.users //shortening path
			Chat.Get.groups() //get all groups with members to object Chat.groups
		})
		.fail(function(response) {
			Chat.logged = false;
			console.log("User is logged of");
		})
		.always(function(response) {
			switch (Chat.logged) {
				case true:
					{
						//hide login panel, show chat
						$("#chatOpenChat").attr("style", "display:block;")
						$("#chatRest").attr("style", "display:block;")

						//read cookie to check if session has expired
						var user = ""
						var name = "chatUsername=";
						var cookie = document.cookie;
						var ca = cookie.split(';');
						for (var i = 0; i < ca.length; i++) {
							var c = ca[i];
							while (c.charAt(0) == ' ') {
								c = c.substring(1);
							}
							if (c.indexOf(name) === 0) {
								user = c.substring(name.length, c.length);
								break
							}
							user = "";
						}
						if (user === "") {
							Chat.logout()
							break
						}
						$("#chatVisibleLogin").text(atob(user))
						Chat.currentUser = atob(user)
						$("#chatLoginHeader").attr("style", "display:none;")
						$("#chatChatHeader").attr("style", "display:block;")
						Materialize.toast('Welcome back!', 2000)
						//Chat.readLocalSettings()
						break;
					}
				case false:
					{
						$("#chatLoginHeader").attr("style", "display:block;")
						$("#chatChatHeader").attr("style", "display:none;")
						Materialize.toast('Log in to use chat.', 2000)
						break;
					}
			}
		})
})