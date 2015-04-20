var places = new Backbone.GoogleMaps.LocationCollection([
    {
      "id": "E0-001-079824824-3@2015042018",
          "lat": "45.5442",
          "lng": "-122.643",
          "startTime": "18:00:00",
          "startDate": "2015-04-20",
          "price": null,
          "title": "Senior Book Club",
          "categories": [
              "Education",
              "Art Galleries &amp; Exhibits",
              "Literary &amp; Books"
          ],
          "city": "Portland",
          "performers": [],
          "url": "http://portland.eventful.com/events/senior-book-club-/E0-001-079824824-3@2015042018?utm_source=apis&utm_medium=apim&utm_campaign=apic",
          "venueAddress": "4043 NE Fremont St",
          "venueName": "Beaumont SUN Community School MS",
          "venueUrl": "http://portland.eventful.com/venues/beaumont-sun-community-school-ms-/V0-001-007726946-4?utm_source=apis&utm_medium=apim&utm_campaign=apic"
    },
    {
      "id": "E0-001-081147879-8@2015042018",
          "lat": "45.4946327",
          "lng": "-122.6306607",
          "startTime": "18:30:00",
          "startDate": "2015-04-20",
          "price": null,
          "title": "Music - Recorder Level 1",
          "categories": [
              "Concerts &amp; Tour Dates"
          ],
          "city": "Portland",
          "performers": [],
          "url": "http://portland.eventful.com/events/music-recorder-level-1-/E0-001-081147879-8@2015042018?utm_source=apis&utm_medium=apim&utm_campaign=apic",
          "venueAddress": "3350 SE Francis St.",
          "venueName": "Community Music Center",
          "venueUrl": "http://portland.eventful.com/venues/community-music-center-/V0-001-000358870-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
    }
  ]);

$(document).ready(function() {
    var mapOptions = {
      center: new google.maps.LatLng(45.523452, -122.676207),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
          
    // Instantiate map
    var map = new google.maps.Map($('#map_canvas')[0], mapOptions);
    
    // Render Markers
    var markerCollectionView = new Backbone.GoogleMaps.MarkerCollectionView({
      collection: places,
      map: map
    });
    markerCollectionView.render();
  });