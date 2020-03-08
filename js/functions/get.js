$(document).ready(function() {
	Chat.Get = {
		date: function() {
			var d = new Date();
			var n = d.toLocaleDateString();
			n += " | "
			n += d.toLocaleTimeString();
			return n
		},

		dateFromStamp: function(stamp) {
			var d = new Date(stamp);
			var n = d.toLocaleDateString();
			n += " | "
			n += d.toLocaleTimeString();
			return n
		},

		timeStamp: function() {
			var d = new Date();
			var n = d.getTime()
			return n
		},

		groups: function() {
			$.ajax({
					type: "GET",
					url: "/api/chat/groups",
					success: function(data) {
						Chat.groups = data
					}
				})
				.fail(function(response) {
					Materialize.toast(response)
				});
		},

		messages: function(i) {
			var tmp
			$.ajax({
					type: "GET",
					url: "/api/chat/messages/private/" + i.toString(),
					async: false,
					success: function(response) {
						tmp = response
					}
				})
				.fail(function(response) {
					Materialize.toast("An error occurred while downloading messages", 2000)
					tmp = -1
				});
			return tmp
		},

		users: function() {
			var tmp
			$.ajax({
					type: "GET",
					url: "/api/chat/users",
					async: false,
					success: function(response) {
						tmp = response
					}
				})
				.fail(function(response) {
					Materialize.toast("An error occurred while downloading users", 2000)
					tmp = -1
				});
			return tmp
		},

		accountInfo: function() {
			$.ajax({
					type: "GET",
					url: "/api/users/info",
					success: function(response) {
						Chat.me = response
					}
				})
				.fail(function(response) {});
		},
		groupMessages: function(i) {
			var tmp
			$.ajax({
					type: "GET",
					url: "/api/chat/messages/group/" + i.toString(),
					async: false,
					success: function(response) {
						tmp = response
					}
				})
				.fail(function(response) {
					Materialize.toast("An error occurred while downloading messages", 2000)
					tmp = -1
				});
			return tmp
		},

	}
})