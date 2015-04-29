var map;
var initialize = function () {

  // Handler for form submission
  $('form').on('submit', function (e) {
    e.preventDefault();

    // Create map properties with latitude and longitude pointing to Austin
    var mapProp = {
      center: new google.maps.LatLng(30.2729209,97.74438630000003),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Instantiate google maps instance, passing in DOM element and map properties
    map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);

    // Create boundaries for the map instance
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
        // On success, pass in JSON objects from yelp API call, to the addMarker function
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

// Pass in initialize function when map loads onto the screen
google.maps.event.addDomListener(window, 'load', initialize);

// Instantiate geocoder instance to transform address to latitude and longitude
var geocoder= new google.maps.Geocoder();

// Function to transform address to marker locations
// Takes one paramter, a yelp JSON Object which contains city, state, and country code
var addMarker = function (place) {
  // geocoder instance, takes in two paramters.
  // 1.) Location to change to lat long coordiantes.
  // 2.) callback function on each location.
  geocoder.geocode(
    {
      "address": place['location']['address'] + ' ' +
       place['location']['city'] + ' ' +
       place['location']['state_code'] + ' ' +
       place['location']['country_code']
    },
    function(results, status) {
      // Call back function on each geocoder result.
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
      }

      // Logic to c hange image size based on yelp rating.
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

      // Instantiate marker object with parameters from geocoder conversion
      // and Yelp JSON object
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map,
        title: place["name"],
        animation: google.maps.Animation.DROP,
        icon: hippoimg
      });

      // Concatenate contents of info box
      var contentFood = "<div class='infoContent'>" +
          "<div class='infoBody'>" +  "<div class='header'>" + place.name + '</div>'  + "<img src ='" + place.rating_img_url+ "'>"  + " " + place.review_count + " reviews <br>" + place.display_phone + "<br>"  + place.location.address +
          "</div>" +
          "<div class='infoImage'>" + "<img src='" + place.image_url + "'>" + " </div>"
        "</div>"

      // Instantiate infowindow object, passing in the concatenated contents
      var infowindow = new google.maps.InfoWindow({
        maxWidth: 900,
        content: contentFood,
      });
        console.log(marker.position);
        console.log(place['name'])

      // Handler, passing in the marker and created infoWindow
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

    }
  );
};
