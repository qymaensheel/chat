$(document).ready(function() {
  Chat.switchChats = function(that) {
    Chat.h = undefined
    if (Chat.logged) {
      $('#chatSwitchChats li').each(function(i) { //clear search input before dropdown opens
        if ($(this).index() !== 0) {
          $(this).attr("style", "display:list-item")
        } else {}
      })
      $("#chatFirstLi input").val("")
      $("#chatMsg").val("")
      var index = that.index() - Chat.me.groups.length
      if (index < Chat.me.groups.length) { //detect if conversation is group or private

        //  GROUP

        Chat.isGroup = true //used to select proper sending endpoint
        $("#chatChatName").text(Chat.groups[Chat.me.groups[that.index() - 1]].groupName)
        Chat.activeConversation = Chat.groups[Chat.me.groups[that.index() - 1]].groupName

        Chat.h = Chat.Get.groupMessages(that.index())
        Chat.activeConversationNo = that.index()
        if (Chat.h == -1) {
          Chat.logout()
        } else {
          $("#chatMessages").empty()

          for (var i = 0; i < Chat.h.messages.length; i++) {
            var li = $("<li>")
            var p = $("<p>")
            p.text(Chat.users[Chat.h.messages[i].author].name + " " + Chat.users[Chat.h.messages[i].author].surname)
            //if this is my message, add float:right;
            if (Chat.users[Chat.h.messages[i].author].name == Chat.me.name && Chat.users[Chat.h.messages[i].author].surname == Chat.me.surname)
              li.attr("style", Chat.myMsgStyle)
            li.attr("class", Chat.collectionItemClass)
            li.addClass("tooltipped") //tooltip - date shown on li:hover
            li.attr("data-position", "left")
            li.attr("data-tooltip", Chat.Get.dateFromStamp(Chat.h.messages[i].creationTime))
            li.attr("data-delay", "200")
            p.attr("class", Chat.collectionItemClass_p)
            if (Chat.h.messages[i].msg.slice(0, 5) != "<img>") {
              li.text(Chat.h.messages[i].msg)
            } else {
              var img = new Image()
              img.src = ((Chat.h.messages[i].msg).substr(5))
              img.setAttribute("class", "materialboxed")
              img.setAttribute("height", "100")
              li.append(img)
            }
            $("#chatMessages").append(li)
            li.prepend(p)
            $('#chatMessages').scrollTop(999999999)
            $('.materialboxed').materialbox();
            $("#chatMsg").focus()
          }
          $('#chat .tooltipped').tooltip({
            delay: 200
          });

        }
      } else {

        //  PRIVATE

        Chat.isGroup = false
        $("#chatChatName").text(Chat.users[index].name + " " + Chat.users[index].surname)
        Chat.activeConversation = Chat.users[index].name + " " + Chat.users[index].surname

        Chat.h = Chat.Get.messages(index)
        if (Chat.h == -1)
          Chat.logout()
        $("#chatMessages").empty()

        for (var i = 0; i < Chat.h.messages.length; i++) {
          var li = $("<li>")
          var p = $("<p>")
          p.text(Chat.Get.dateFromStamp(Chat.h.messages[i].creationTime))
          if (Chat.users[Chat.h.messages[i].author].name == Chat.me.name && Chat.users[Chat.h.messages[i].author].surname == Chat.me.surname)
            li.attr("style", Chat.myMsgStyle)
          li.attr("class", Chat.collectionItemClass)
          p.attr("class", Chat.collectionItemClass_p)
          if (Chat.h.messages[i].msg.slice(0, 5) != "<img>") {
            li.text(Chat.h.messages[i].msg)
          } else {
            var img = new Image()
            img.src = ((Chat.h.messages[i].msg).substr(5))
            img.setAttribute("class", "materialboxed")
            img.setAttribute("height", "100")
            li.append(img)
          }

          $("#chatMessages").append(li)
          li.prepend(p)
          $('#chatMessages').scrollTop(999999999)
          $('.materialboxed').materialbox();
          $("chatMmsg").focus()
        }
      }
      Chat.activeConversationNo = index

    } else
      Materialize.toast("You need to log in to use Chat", 2000)
  }
})