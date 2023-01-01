//Function responsible for counting character
$(document).ready(() => {
  $('textarea').on('input', function(){
    let target = $(this).parent().find('.counter')
    target.text( 140 - $(this).val().length)
    console.log($(this).val().length)
    if ($(this).val().length > 140){
      target.css ({'color' : '#f7490f'});
    } else {
      target.css({'color': '#545149'})
    }
})
});

