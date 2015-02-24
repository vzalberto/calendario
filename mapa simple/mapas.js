var map;
var userPosition;

function initialize() {
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(66,6)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function getLocation(){
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(updatePosition);
    else
        alert('Tu navegador es basura');
}

function updatePosition(position){
  userPosition = position;
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);