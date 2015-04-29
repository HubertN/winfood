// Animations
$(document).ready(function() {

  $("button").on('click',function(){
    $(".navLogo").effect( "bounce", {times:6}, 3500 );
    var hippoFood = $('.food-type').val();
    $(".bubble-text").fadeOut(1500,function(){
      $(".bubble-text").html("Yummy! Some " + hippoFood + "!");
    }).fadeIn(1500);

    $('b').fadeOut('slow');
    $('#input-1').css('padding','1px');
  });

});
