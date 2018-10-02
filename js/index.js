$(function() {
  var lastId,
    topMenu = $("#myNavbar"),
    topMenuHeight = topMenu.outerHeight()-315,
    // All list items
    menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
     scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
      });

      // Bind click handler to menu items
      // so we can get a fancy scroll animation
      menuItems.click(function(e){
      var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 :        $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});
  // Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
  
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }         
  });
  
  //clicking on footer navigation
  $("footer ul a").on('click', function(){
          $(".nav").find(".active").removeClass("active");
    var menuItem = $(this).text();
    var item = '.nav a:contains("'+menuItem+'")';
    $(item).parent().addClass("active");
  });
  
     /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
 //  $("nav a").click(function(evn){
//        evn.preventDefault();
//        $('html,body').scrollTo(this.hash, this.hash); 
//    });
  
  
var maxLen =140;
var charLeft=140;
var msgText = "You have 140 characters left."
var errorMsg ="Invalid data";
var charsLeftMsg = $('#charsLeft');
charsLeftMsg.text(msgText);

$('.error').hide();
var errorFlag = false;
  
  //message length check
$('#message').on('keypress keyup paste blur change', function() {
    if (!$.msgLengthCheck($(this).val())) {
        charsLeftMsg.addClass('red');
        msgText = 'You have exceeded maximum message length.';
        $(this).focus();
    }
      else 
       { 
        charsLeftMsg.removeClass('red');
        msgText = 'You have '+charLeft+' characters left.';
        
      }
      charsLeftMsg.text(msgText);  
    });
  
  $('#send').on('click', function(){
    $('.error').show();
    $('.error').hide();
    $('.error').addClass('red');
    var name = $("input#name");
    var email = $("input#email");
    var message = $("textarea#message");
    var subject = $("input#subject");
    var field;
    if (!$.emptyFieldValidation(name.val())) {
      field = name;
      errorMsg = "Please enter your name";
      errorFlag = true;
    } 
    else  {
      if (!$.emptyFieldValidation(email.val())) {
        field = email;
        errorMsg = "Please enter your email";
        errorFlag = true;
      }
      else {
       if (!$.emailValidation(email.val())) {
        field = email;
        errorMsg = "Please enter a valid email address";
        errorFlag = true;
       }  
       else {
          if (!$.emptyFieldValidation(subject.val())) {
            field = subject;
            errorMsg = "Please enter your message subject";
            errorFlag = true;
          } 
          else {
            if (!$.emptyFieldValidation(message.val())) {
              field = message;
              errorMsg = "Please enter your email message";
              errorFlag = true;
            }
          }
       }
      }
    }   
    if (errorFlag){
      field.parent().find('label.error').text(errorMsg);
      field.parent().find('label.error').show();
      field.focus(); 
    }
    else  {
      alert('Message has been sent '+name.val());
    }
  });

$.emptyFieldValidation = function(fieldValue) {
      if (fieldValue == '') {
        return false;
      }
    return true;
  } 
  
$.msgLengthCheck = function(msg) {
        var msgLen = msg.length;
        //var charLeftMsg = $(this)
      if ( msgLen > maxLen ) {
             return false;
       }
        else {
          charLeft = maxLen - msgLen;
          return true;
          //var msgTxt = 'You have '+charLeft+' characters left.';
          //$('#msgLeft').text(msgTxt);
        }
      };
  

$.emailValidation = function(sEmail) {
   var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
  } ;

  
  

  
})