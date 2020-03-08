$(document).ready(function() {
  Chat.addUsersView = function() {

    //append search bar to list

    var div = $("<div>")
    var li = $("<li>")
    li.attr("id", "chatFirstLi")
    var inp = $("<input>")
    var icon = $("<i>")
    div.addClass("input-field")
    div.attr("style", "width:100%; height:100%; padding:10px; padding-bottom:2px; padding-right:20px; margin:0;")
    icon.attr("class", "small material-icons prefix")
    icon.text("search")
    inp.attr("type", "text")
    div.append(icon)
    div.append(inp)
    li.append(div)
    $("#chatSwitchChats").append(li)

    //append groups to list before users

    Chat.appendGroups()

    //append users

    for (var i = 1; Chat.users[i] !== undefined; i++) {
      var li = $("<li>")
      var a = $("<a>")
      a.attr("href", "#")
      a.text(Chat.users[i].name + " " + Chat.users[i].surname)
      li.append(a)
      $("#chatSwitchChats").append(li)
    }

    //prevent list hiding when clicking on search bar

    $("#chatSwitchChats").on("click", "input", function(event) {
      event.stopPropagation();
    })
    $("#chatFirstLi").on("click", "input", function(event) {
      event.stopPropagation();
    });
  }
})