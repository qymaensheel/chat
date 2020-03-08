$(document).ready(function() {
  Chat.Style = {
    colorsDefault: function() {
      $("link")[3 /*change this after joining to project!!*/ ].href = "css/colors/default.css"
      Chat.collectionItemClass = "collection-item blue-grey-text darken-3"
      Chat.collectionItemClass_p = "blue-grey-text"
      Chat.myMsgStyle = "float:right;"
      $(".collection .collection-item").attr("class", Chat.collectionItemClass)
      $(".collection .collection-item p").attr("class", Chat.collectionItemClass_p)
    },

    colorsReverse: function() {
      $("link")[3 /*change this after joining to project!!*/ ].href = "css/colors/reverse.css"
      Chat.collectionItemClass = "collection-item white-text"
      Chat.collectionItemClass_p = "blue-grey-text text-lighten-5"
      $(".collection .collection-item").attr("class", Chat.collectionItemClass)
      $(".collection .collection-item p").attr("class", Chat.collectionItemClass_p)
    },

    fontDefault: function() {
      $("link")[4 /*change this after joining to project!!*/ ].href = "css/font/default.css"
    },

    fontBig: function() {
      $("link")[4 /*change this after joining to project!!*/ ].href = "css/font/bigText.css"
    },

    fontWide: function() {
      $("link")[4 /*change this after joining to project!!*/ ].href = "css/font/wide.css"
    }
  }
  
  //button actions for styling

  $("#chatColors-default").on("click", function() {
    Chat.Style.colorsDefault()
  })
  $("#chatColors-dark").on("click", function() {
    Chat.Style.colorsReverse()
  })
  $("#chatFont-default").on("click", function() {
    Chat.Style.fontDefault()
  })
  $("#chatFont-bigText").on("click", function() {
    Chat.Style.fontBig()
  })
  $("#chatFont-wideMsg").on("click", function() {
    Chat.Style.fontWide()
  })
})