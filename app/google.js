var map;
var geocoder;
var marker;

function initialize() {
    var mapOptions = { center: new google.maps.LatLng(0.0, 0.0), zoom: 2, mapTypeId: google.maps.MapTypeId.ROADMAP };

    var myOptions = {  center: new google.maps.LatLng(36.835769, 10.247693 ), zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP };

    geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("map"),myOptions);
    google.maps.event.addListener(map, 'click', function(event) { placeMarker(event.latLng); });
}
      
function placeMarker(location) {
    if(marker){ //on vérifie si le marqueur existe
        marker.setPosition(location); //on change sa position
    }else{
        marker = new google.maps.Marker({ //on créé le marqueur
            position: location, 
            map: map
        });
    }
    document.getElementById('lat').value=location.lat();
    document.getElementById('lng').value=location.lng();
    getAddress(location);
}

function getAddress(latLng) {
geocoder.geocode( {'latLng': latLng},
  function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[0]) {
        document.getElementById("address").value = results[0].formatted_address;
      }
      else {
        document.getElementById("address").value = "No results";
      }
    }
    else {
      document.getElementById("address").value = status;
    }
  });
}