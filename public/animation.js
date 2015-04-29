// Animations
$(document).ready(function() {

  // Handler for button click
  $("button").on('click',function(){
    // Bounce the hippo logo
    $(".navLogo").effect( "bounce", {times:8}, 3500 );
    // Fades in new speech bubble text
    var hippoFood = $('.food-type').val();
    $(".bubble-text").fadeOut(1500,function(){
      $(".bubble-text").html("Yummy! Some " + hippoFood + "!");
    }).fadeIn(1500);

    // Fades out placeholder input text, and adjust padding
    $('b').fadeOut('slow');
    $('#input-1').css('padding','1px');
  });

});
