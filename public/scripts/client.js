/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Escape functions to avoid XSS attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) { 
    const $tweet = $(` <section class="previous-tweet">
      <header class="tweet-header">
        <div class="name-img"> 
          <div class="previous-tweet-img">
            <img src=${tweet.user.avatars}> 
          </div>
          <div class="name"> ${tweet.user.name} </div>
        </div>
        <div class="nameTag"> ${tweet.user.handle}</div>
      </header>
      <article class="tweet-text">${escape(tweet.content.text)}</article>
      <footer class="tweet-footer">
        <div section="tweet-footer-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
        ${timeago.format(tweet.created_at)}
      </footer>
    </section>`);
    return $tweet;
  };
  
  const renderTweets = function(tweets) {

    console.log('TWEETS: ', tweets);
    for (let tweet of tweets) {
      $('.show-tweet').prepend(createTweetElement(tweet));
    }
  };

  const clearEmpty = function() {
    $('.alertEmptyTweet').slideUp('slow');
    $('.alertTooMany').slideUp('slow');
  }

  $('#submitTweet').on('submit', function(event) {
    // stops refreshing not redirection
    event.preventDefault();
    let form = $(event.target)
    console.log('FORM: ', form)

    // 1st argument is selector, 2nd argument inside this
    const input = $('#tweet-text', form)
    let length = input.val().length;

    if (length === 0 || typeof length === null) {
      console.log('ALERT')
      $('.alertEmptyTweet').slideDown('slow');
      setTimeout(clearEmpty, 5000);
    } else if (length > 140) {
      $('.alertTooMany').slideDown('slow');
      setTimeout(clearEmpty, 5000);
    } else {
      const tweetData = form.serialize();
      console.log('Tweet data ', tweetData)
      $.post('/tweets', tweetData)
      // Clears counter
      $('.counter').val(140);
      //clears tweet
      input.val('');
      //clears all tweets
      $('.show-tweet').html('')
      $('.loading-spinner').show()
      setTimeout(loadTweets, 100)
      // loadTweets();
    }
  
  });

  const loadTweets = function() {
    
    $('.alertEmptyTweet').slideUp('slow');
    $('.alertTooMany').slideUp('slow');
    $.ajax('/tweets', { method: 'GET'})
    .then(function (result){
      console.log('Result:', result);
      renderTweets(result);
      $('.loading-spinner').hide()
    });

  }

  $('.alertEmptyTweet').hide();
  $('.alertTooMany').hide();
  loadTweets();

});