$(document).ready(function() {

  // create an event listener
  $("#tweet-text").on('input', function() {
    
    // this is the tweet text
    let count = $(this)
    let length = count.val().length;

    if(length > 140 ) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

    $('.counter').val(140 - length);

  });

});