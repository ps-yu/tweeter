/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  $('form').on('submit', onSubmit);
  loadTweets();

});
/*
@parmater = Array of objects containing user information
calls createTweeterElement funnction for each object
Use return value and appends it to the ".tweeter-container"
*/
const renderTweets = function(tweets){
  for (let user_data of tweets){
    const $tweet = createTweetElement(user_data);
    $('.tweets-container').prepend($tweet);
  }
}

/*
@parameter {object}: data that contains tweet information
creates html template literal to be added in the "".tweets-container"
*/

const createTweetElement = function(tweet){
  return $(`<article class="tweet">
  <header>
  <section>
    <section>
      <img src = ${tweet.user.avatars}>
      <p> ${tweet.user.name} </p>
    </section>
    
    <p> ${tweet.user.handle}</p>
  </section>
  <p>${tweet.content.text}</p>
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
  $.ajax({
    url : "/tweets",
    type: 'POST',
    data
  })
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