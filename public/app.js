var map;
var initialize = function () {

  // Handler for form submission
  $('form').on('submit', function (e) {
    e.preventDefault();

    // $.get( "/address", {searchTerm: $('.food-type').val()}, function (data) {
    //   // might need to do this
    //    // var data = $.parseJSON(data)

    //   console.log("Got data:", data);
    //   // console.log("data size:", Object.keys(data).length);
    // });

    // Create properties for map with latitude and longitude to Austin
    var mapProp = {
      center: new google.maps.LatLng(30.2729209,97.74438630000003),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Instantiate google maps instance, passing in DOM element and properties
    map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);

    // Create boundaries for the map
    var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(30.343843,-97.744386),
    new google.maps.LatLng(30.272921,-97.744386));
    map.fitBounds(defaultBounds)

    // Ajax call to Yelp API, passing in input field for food type
    $.ajax({
      type: "GET",
      url:'/places',
      "data": {
        searchTerm: $('.food-type').val()
      },
      success: function(data) {
        // On success, pass in JSON objects to addMarker function
        var lat = '';
        var lng = '';
        for(var i = 0; i < data.length; i++) {
          addMarker(data[i]);
          console.log(data[i]['name']);
          console.log(data[i]['location']['city'])
          console.log(data[i]['location']['state_code'])
          console.log(data[i]['location']['country_code'])
        }
      }
    })

  });
};

    google.maps.event.addDomListener(window, 'load', initialize);

    var geocoder= new google.maps.Geocoder();
    var addMarker = function (place) {
      geocoder.geocode(
        {
          "address": place['location']['address'] + ' ' +
            place['location']['city'] + ' ' +
            place['location']['state_code'] + ' ' +
            place['location']['country_code']
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
          }
          console.log(place)

          var hippoimg = ''
          if (place.rating >= 5 ) {
            hippoimg = 'hippo50.png'
          } else if (place.rating == 4.5) {
            hippoimg = 'hippo50.png'
          } else if (place.rating == 4.0) {
            hippoimg = 'hippo35.png'
          } else if (place.rating == 3.5) {
            hippoimg = 'hippo35.png'
          } else if (place.rating <= 3) {
            hippoimg = 'hippo30.png'
          }
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            title: place["name"],
            animation: google.maps.Animation.DROP,
            icon: hippoimg

          });

          var contentFood = "<div class='infoContent'>" +

              "<div class='infoBody'>" +  "<div class='header'>" + place.name + '</div>'  + "<img src ='" + place.rating_img_url+ "'>"  + " " + place.review_count + " reviews <br>" + place.display_phone + "<br>"  + place.location.address +
              "</div>" +
              "<div class='infoImage'>" + "<img src='" + place.image_url + "'>" + " </div>"
            "</div>"

          var infowindow = new google.maps.InfoWindow({
            maxWidth: 900,
            content: contentFood,
          });
            console.log(marker.position);
            console.log(place['name'])

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });

        }
      );
    };


// Animations
$(document).ready(function() {

  $("form").on('submit',function(){
    $(".navLogo").effect( "bounce", {times:6}, 3000 );
    $(".bubble").effect('bounce',{times:6},3000);
    var hippoFood = $('.food-type').val();

    $(".bubble").fadeOut('slow',function(){
      $(".bubble").html("Yummy! Some " + hippoFood + "!");
    }).fadeIn("slow");
  });

});

