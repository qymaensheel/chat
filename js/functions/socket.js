$(document).ready(function() {
  
  //TODO 
  Chat.socket = function() {
    var socket = io.connect('http://localhost:8000')
    socket.on('connection_ack', function() {
      socket.emit('groups', JSON.stringify({
        userID: Chat.me.id
      }));
    });

    function recievePrivate(data) {
      if (Chat.activeConversationNo + 1 - Chat.me.groups.length == data.author_id) {
        var li = $("<li>")
        var p = $("<p>")
        p.text(Chat.Get.dateFromStamp(data.date))
        li.attr("class", Chat.collectionItemClass)
        p.attr("class", Chat.collectionItemClass_p)
        if (data.msg.slice(0, 5) != "<img>") {
          li.text(data.msg)
        } else {
          var img = new Image()
          img.src = ((data.msg).substr(5))
          img.setAttribute("class", "materialboxed")
          img.setAttribute("height", "100")
          li.append(img)
        }
        $("#chatMessages").append(li)
        li.prepend(p)
        $('#chatMessages').scrollTop(999999999)
        $('.materialboxed').materialbox();
        $("#chatMsg").focus()
      } else
        Materialize.toast("New Message from " + Chat.users[data.author_id] + "!", 2000)
    }

    function recieveGroup(data) {
      if (Chat.activeConversationNo + 1 == data.group_id) {
        var li = $("<li>")
        var p = $("<p>")
        p.text(Chat.Get.dateFromStamp(data.date))
        li.attr("class", Chat.collectionItemClass)
        p.attr("class", Chat.collectionItemClass_p)
        li.addClass("tooltipped")
        li.attr("data-position", "left")
        li.attr("data-tooltip", Chat.Get.date())
        li.attr("data-delay", "200")
        if (data.msg.slice(0, 5) != "<img>") {
          li.text(data.msg)
        } else {
          var img = new Image()
          img.src = ((data.msg).substr(5))
          img.setAttribute("class", "materialboxed")
          img.setAttribute("height", "100")
          li.append(img)
        }
        $("#chatMessages").append(li)
        li.prepend(p)
        $('#chatMessages').scrollTop(999999999)
        $('.materialboxed').materialbox();
        $("#chatMsg").focus()
        $('#chat .tooltipped').tooltip({
          delay: 200
        });
      } else
        Materialize.toast("New Message from " + Chat.users[data.author_id] + "!", 2000)
    }
  }
})