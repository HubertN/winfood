// Animations
$(document).ready(function() {

  // Handler for button click
  $("button").on('click',function(){
    // Bounce the hippo logo
    $(".navLogo").effect( "bounce", {times:15}, 5500);
    // Fades in new speech bubble text
    var hippoFood = $('.food-type').val();
    $(".bubble-text").fadeOut(1500,function(){
      $(".bubble-text").html("Yummy! Some " + hippoFood + "!");
    }).fadeIn(1500);

    // Fades out placeholder input text, and adjust padding
    $('b').fadeOut('slow');
    $('#input-1').css('padding','1px');
  });

  // Modal functions
  function openInstructions() {
    // Instruction text
    $('#instruction-modal').empty();
    var paragraph1 = document.createElement('p');
    var paragraph2 = document.createElement('p');
    var paragraph3 = document.createElement('p');
    var paragraph4 = document.createElement('p');
    paragraph1.innerHTML = "Welcome to Win-Food! If you want to find some good places to eat in down-town Austin, you have come to the right place. Type in a food item in the input box and then click Get Food!";
    paragraph2.innerHTML = "A map will display on the screen with hippos. Hippos represent places to eat and you can click on a hippo to get more information about that place.";
    paragraph3.innerHTML = "Larger hippos represent Higher ratings. Smaller hippos have lower ratings, but you might still want to check them out :).";
    paragraph4.innerHTML = "Dont worry though, our hippo have very high standards. Click on the buttons below to try out an example.";

    $('#instruction-modal').append(paragraph1);
    $('#instruction-modal').append(paragraph2);
    $('#instruction-modal').append(paragraph3);
    $('#instruction-modal').append(paragraph4);

    $('#instruction-modal').dialog({
      resizable: false,
      modal: true,
      title: "Instructions",
      height: 370,
      width: 500,
      show: 'fade',
      hide: 'drop',
      buttons: {
        "IceCream": function() {
            $('.food-type').val('IceCream');
            $('.getFood').click();
            $(this).dialog('close');
        },
        "Pizza": function() {
            $('.food-type').val('Pizza');
            $('.getFood').click();
            $(this).dialog('close');
        },
      }
    });

  }

  function openAbout() {
    $('#about-modal').empty();
    var paragraph1 = document.createElement('p');
    var paragraph2 = document.createElement('p');
    var anchor = document.createElement('a');
    paragraph1.innerHTML = "Win Food was created by Hubert Nguyen. It was built using Ruby with the Sinatra framework, jQuery, jQuery UI, Google Maps API and the Yelp API.";
    paragraph2.innerHTML = "He can be reached at : ";
    anchor.innerHTML = "Hubert Nguyen";
    anchor.setAttribute('href','http://hubert-nguyen.com');

    $('#about-modal').append(paragraph1);
    $('#about-modal').append(paragraph2);
    $('#about-modal').append(anchor);

    $('#about-modal').dialog({
      resizable: false,
      modal: true,
      title: "About",
      height: 270,
      width: 500,
      show: 'fade',
      hide: 'drop',
    });

  }

  // Event handler for opening modal
  $('#instructions').click(openInstructions);
  $('#about').click(openAbout);
});
