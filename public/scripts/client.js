/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
/*
@parmater = Array of objects containing user information
calls createTweeterElement funnction for each object
Use return value and appends it to the ".tweeter-container"
*/
const renderTweets = function(tweets){
  for (let user_data of tweets){
    const $tweet = createTweetElement(user_data);
    $('.tweets-container').append($tweet);
  }
}

/*
@parameter = data object
creates html template literal to be added in the "".tweets-container"
*/

const createTweetElement = function(tweet){
  return $(`<article class="tweet">
  <header>
  <section>
    <img src = ${tweet.user.avatars}>
    <p> ${tweet.user.handle}</p>
  </section>
  <p>${tweet.content.text}</p>
  </header>
  <footer>
    <p>${tweet.created_at}</p>
    <p >
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </p>
  </footer>
</article>`)
}

$(document).ready(() => {
  renderTweets(data);
});
