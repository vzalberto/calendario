var map;
var userPosition;
  
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
  
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(66,6)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  embedSearchBox(map);
 
}

function getLocation(){
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(updateMapCenter);
    else
        alert('Tu navegador es basura');
}

function updateMapCenter(position){
  userPosition = position;
  map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  map.setZoom(15);
}


function embedSearchBox(map){

  var markers = [];

   // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
}