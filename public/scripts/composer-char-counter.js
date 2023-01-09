/**
 * Target: <form>/<textarea>/#tweet-text
 * Changes the value of class("counter") on keyboard input
 * Changes the color of the text when the text exceeds the limit.
 */
$(document).ready(() => {
  $('#tweet-text').on('input', function(){
    let target = $(this).parent().find('.counter')
    target.text( 140 - $(this).val().length)
    if ($(this).val().length > 140){
      target.css ({'color' : '#f7490f'});
    } else {
      target.css({'color': '#f2f3fa'})
    }
})
});