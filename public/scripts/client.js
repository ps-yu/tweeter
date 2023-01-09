/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $("#error").hide();
  $('form').on('submit', onSubmit);
  loadTweets();
});
/*
@parmater = Array of objects containing user information
calls createTweeterElement funnction for each object
Use return value and appends it to the ".tweeter-container"
*/
const renderTweets = function(tweets){
  const container = $('.tweets-container').empty();
  for (let user_data of tweets){
    const $tweet = createTweetElement(user_data);
    container.prepend($tweet);
  }
}

/*
@parameter {object}: data that contains tweet information
return html template literal to be added in the "".tweets-container"
*/

/*
 * preventing XSS  
 */
const createTweetElement = function(tweet){
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  return $(`<article class="tweet">
  <header>
  <section>
    <section>
      <img src = ${tweet.user.avatars}>
      <p> ${tweet.user.name} </p>
    </section>
    
    <p> ${tweet.user.handle}</p>
  </section>
  <p>${escape(tweet.content.text)}</p>
  </header>
  <footer>
    <p>${timeago.format(tweet.created_at)}</p>
    <p class = "footer-symbols">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </p>
  </footer>
</article>`)
}

/**
 description: Submits the new tweet when the submit button is clicked.
 */
const onSubmit = function(event){
  event.preventDefault();
  const data = $(this).serialize();
  $("#error").slideUp();

  /**
   * Checking the length of the form before submitting
   */
  const target = $(this).parent().find('#tweet-text').val().length;
  if (target > 140){
    $("#error").slideDown(function(){
      $("#error-msg").text("That's too many words!!")
    })
  } else if (target <= 0) {
    $("#error").slideDown(function(){
      $("#error-msg").text("Don't be shy! Please Write Something")
    })
  } else {
    $.ajax({
      url : "/tweets",
      type: 'POST',
      data
    })
    .then(loadTweets);
    $(this).trigger("reset");
    $(this).parent().find(".counter").text(140);
  }
}

/**
 * path : localhost:8080/tweets
 * load more tweets to be used by the createTweetElement
 */

const loadTweets = function(){
  $.ajax('/tweets', {method: 'GET'})
    .then(data => {
      renderTweets(data);
  })  
}