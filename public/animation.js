// Animations
$(document).ready(function() {

  $("button").on('click',function(){
    $(".navLogo").effect( "bounce", {times:6}, 3000 );
    $(".bubble").effect('bounce',{times:6},3000);
    var hippoFood = $('.food-type').val();

    $(".bubble").fadeOut('slow',function(){
      $(".bubble").html("Yummy! Some " + hippoFood + "!");
    }).fadeIn("slow");
  });

});
