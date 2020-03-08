$(document).ready(function() {
  Chat.search = function() {
    $(document).keyup(function(e) {
      if ($("#chatFirstLi input").val() === "") {
        //reset all list items if search field is empty
        $('#chatSwitchChats li').each(function(i) {
          if ($(this).index() !== 0) {
            $(this).attr("style", "display:list-item")
          } else {}
        })
      }
      var sub = $("#chatFirstLi input").val()   //substring is refreshing at every key pressed
      sub = sub.toLowerCase()
      $('#chatSwitchChats li').each(function(i) {
        if ($(this).index() !== 0) {
          var str = $(this).text()
          str = str.toLowerCase()
          if (str.includes(sub))
            $(this).attr("style", "display:list-item;")
          else
            $(this).attr("style", "display:none;")
        } else {}
      })
    })
  }
})