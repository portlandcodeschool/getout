    
var map;
function initMap() {
    console.log('2222');
    var lat = 45.536500;
    var lng = -122.648413;
    var myCenter = new google.maps.LatLng(lat, lng);
    function initialize() {
      var mapOptions = {
        zoom: 14,
        center: myCenter
      };
      map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
    }



    function addMarker(lat,lng,desc) {
      var infowindow = new google.maps.InfoWindow({
          content: desc
      });

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map//,
          //title: 'Uluru (Ayers Rock)'
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }


    
    function addResults(arr) {
      arr.forEach(function (event) {
        var desc = '<h2><a href="' + event.url[0] + '" target="_blank">' + event.title[0] + '</a></h2><br>';
        desc += event.description + '<br>';
        desc += '<strong>Time: </strong>' + event.start_time[0].split(' ')[1];
        desc += '<br><strong>Venue: </strong>' + event.venue_name[0];
        var eLat = Number(event.latitude);
        var eLng = Number(event.longitude);
        addMarker(eLat, eLng, desc);
      });
    }
}
    google.maps.event.addDomListener(window, 'load', initMap);	
$(document).foundation();