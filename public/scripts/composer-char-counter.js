$(document).ready(() => {
  $('textarea').on('input', function(){
    let target = $(this).parent().find('.counter')
    target.text( 140 - $(this).val().length)
    if (target.text > 0){
      target.css ({'color' : '#e60505'});
    }
})
});

