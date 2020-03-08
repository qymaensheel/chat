$(document).ready(function() {
  Chat.appendGroups = function() {
    Chat.me.groups = []
    for (var i = 1; Chat.groups[i] !== undefined; i++) { //Read all groups list to find where user belongs to
      for (var j = 0; j < Chat.groups[i].users.length; j++) {
        if (Chat.groups[i].users[j] == Chat.me.id) {
          Chat.me.groups.push(i)
        }
      }
    }

    for (var i = 0; i < Chat.me.groups.length; i++) { //append group names to dropdown "Chat with" before private conversation
      var li = $("<li>")
      var a = $("<a>")
      var bq = $("<blockquote>")
      bq.attr("style", "margin:0;padding-left:1rem;border-left:5px solid #607d8b")
      a.attr("href", "#")
      bq.text(Chat.groups[Chat.me.groups[i]].groupName)
      a.append(bq)
      li.append(a)
      $("#chatSwitchChats").append(li)
    }
  }
})