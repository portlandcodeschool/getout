var map;

var lat = 45.536500;
var lng = -122.648413;
var markerArray = []; //stores Markers. When we wipe the map, we empty this array


//----------------------------
// Google Maps API code
//----------------------------

//Initialize map
function initialize() {
  console.log('MAPS!');
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(lat, lng)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

//----------------------------
// Google Maps API functions (mostly marker stuff)
//----------------------------

function addMarker(lat,lng,desc,icon) {
	var infowindow = new google.maps.InfoWindow({
		content: desc
	});

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		//animation: google.maps.Animation.DROP,
		map: map,
		icon: icon
	});

	markerArray.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}

function clearMapMarkers() {
	markerArray.forEach(function (m) {
		m.setMap(null);
	})
	markerArray = [];

}

//----------------------------
// BackBone Stuff
//----------------------------


//Event backbone model. Has 'renderToMap' function which just adds a marker to map.
var eventModel = Backbone.Model.extend({
	visible: false,
	renderToMap: function() {
		this.visible = true;
		var desc = '<h1>' + this.attributes.title + '</h1>';
		desc+= '<br><strong>Time: </strong>' + this.attributes.startTime;
		desc+= '<br><strong>Venue: </strong>' + this.attributes.venueName;
		desc+= '<br><a href="' + this.attributes.url + '" target="blank">More details ...';
		addMarker(this.attributes.lat, this.attributes.lng,desc);
	}
});

//Collection that holds markers.  pulls from server with .fetch() call in dateSelect function *below*
var EventCollection = Backbone.Collection.extend({
	model: eventModel,
	url:'/api',
	renderAll: function() {
		clearMapMarkers();
		this.each(function(m,i) {
			m.renderToMap();
		});
		console.log('markers placed on map..');
	}

});

function fetchSuccess(coll, res, opts) {
	console.log($('#date').val() + ' EVENTS SUCCESSFULLY RECEIVED: ');
	coll.renderAll();

}

function fetchError(coll, res, opts) {
	console.log($('#date').val() + ' ERROR RECEIVING EVENTS ');
}


var coll = new EventCollection();


//----------------------------
// Rest of code
//----------------------------
function dateSelect() {
	var selected = $('#date').val();
	var fetchParam = { 
		reset: true,
		data: $.param({ date: selected}), //ripped from SO
		success: fetchSuccess,
		error: fetchError
	}
	coll.fetch(fetchParam);
}


coll.models.forEach(function (m) {   





	});









