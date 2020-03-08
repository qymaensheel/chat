$(document).ready(function() {
  Chat.hide = function() {
    
    //hide chat elements
    
    $("#chatOpenChat").attr("style", "display:none;")
    $("#chatRest").attr("style", "display:none;")
  }

  Chat.show = function() {
    
    //show chat elements
    
    $("#chatOpenChat").attr("style", "display:block;")
    $("#chatRest").attr("style", "display:block;")
  }
})