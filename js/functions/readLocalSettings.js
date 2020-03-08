  /*
   *  Demo of saved local settings: email:"{"colors":bool,"font":int(1,2,3),"rounded":bool}"
   */


$(document).ready(function() {
  Chat.readLocalSettings = function() {
    if (localStorage.getItem(Chat.me.email)) {
      Chat.localSettings = JSON.parse(localStorage.getItem(Chat.me.email))
      if (!Chat.localSettings.colors) {
        Chat.Style.colorsReverse()
      }
      switch (Chat.localSettings.font) {
        case 2:
          {
            Chat.Style.fontBig()
            break
          }
        case 3:
          {
            Chat.Style.fontWide()
            break
          }
      }
      if (Chat.localSettings.rounded) {
        $("#chatMessages")[0].style.borderRadius = "10px"
        $("#chatMsg")[0].style.borderRadius = "10px"
      }
      Materialize.toast("Local settings loaded.",2000)
    } else {
      Materialize.toast("No local settings found.",2000)
    }
  }
})