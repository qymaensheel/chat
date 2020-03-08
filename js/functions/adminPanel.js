/*
 *   Admin panel concept has been removed for simplified preview of available groups
 *    TODO groups scroll
 */

$(document).ready(function() {
  Chat.AdminPanel = {
    open: function() {
      $("#chatAdminPanelFieldLeft").empty()
      for (var i = 1; Chat.groups[i] !== undefined; i++) {
        var h = $("<h5>")
        h.text(Chat.groups[i].groupName)
        $("#chatAdminPanelFieldLeft").append(h)
        var ul = $("<ul>")
        for (var j = 0; j < Chat.groups[i].users.length; j++) {
          var li = $("<li>")
          li.text(Chat.users[Chat.groups[i].users[j]].name + " " + Chat.users[Chat.groups[i].users[j]].surname)
          ul.append(li)
        }
        $("#chatAdminPanelFieldLeft").append(ul)
      }
      if (!Chat.localSettings.colors) {
        $("#chatColors-dark")[0].checked = true
      }
      switch (Chat.localSettings.font) {
        case 2:
          {
            $("#chatFont-bigText")[0].checked = true
            break
          }
        case 3:
          {
            $("#chatFont-wideMsg")[0].checked = true
            break
          }
      }
      if (Chat.localSettings.rounded) {
        $("#chatRoundedCorners")[0].checked = true
      }
    },
    close: function() {
      $("#chatAdminPanel").modal("close")

      var fonts = []
      var font = 1 //default
      fonts[0] = $("#chatFont-default")[0].checked
      fonts[1] = $("#chatFont-bigText")[0].checked
      switch (fonts) {
        case [true, false]:
          {
            font = 1
            break;
          }
        case [false, true]:
          {
            font = 2
            break;
          }
        case [false, false]:
          {
            font = 3
            break;
          }
      }
      var settingsName = Chat.me.email
      var settings = {
        colors: $("#chatColors-default")[0].checked,
        font: font,
        rounded: $("#chatRoundedCorners")[0].checked
      }
      if(settings != Chat.localSettings){
      
        localStorage.setItem(settingsName, JSON.stringify(settings))
        Chat.localSettings = settings

        Materialize.toast("New settings has been updated successfully.", 3000)
          //$('#chatSlide').sideNav('show');
      }
    }
  }
})