$(document).ready(function() {
	Chat.chatLoginCheck = function() {
		var result = false
		$.ajax({
				type: "GET",
				url: "/api/users/loginCheck"
			})
			.done(function(response, statusCode) {
				result = true;
				console.log("User is logged in");
			})
			.fail(function(response) {
				result = false;
				console.log("Logged of");
			});
		return result
	}
})