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
    zoom: 14,
    center: new google.maps.LatLng(lat, lng)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

//----------------------------
// Google Maps API functions (mostly marker stuff)
//----------------------------
console.log('icon updddddate');
function addMarker(lat,lng,desc,img) {
	var infowindow = new google.maps.InfoWindow({
		content: desc
	});

	var iconM = (img) ? ('icons/' + img) : null;
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		//animation: google.maps.Animation.DROP,
		map: map,
		//icon: 'icons/' + img
		icon: iconM
		//
	});

	//if (img)


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
		addMarker(this.attributes.lat, this.attributes.lng,desc, matchIcon(this));
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

console.log('find cats')
function getCats() {
	var arr = [];
	coll.models.forEach(function (m) {   

		m.attributes.categories.forEach(function (c) {
			arr.push(c.toLowerCase());


		})

	});

	return arr;
}

function getDateQString(x) { 
	var y = (x.getYear() + 1900) + '';
	var m = (x.getMonth() + 1) + '';
	var d = x.getDate() + '';
	m = (m.length == 1) ? ('0' + m) : m;
	d = (d.length == 1) ? ('0' + d) : d;
	return y + m + d + '00';
}

function getOptionsArray(dayCount) {
	var today = new Date();
	var arr = [];
	for (var i = 0; i < dayCount; i++) {
		var cday = new Date();
		cday.setDate(today.getDate() + i);
		var dQstr = getDateQString(cday);
		var dOptStr = dateFormat(cday, "dddd, mmmm dS, yyyy");
		arr.push([dOptStr,dQstr]);
	}
	return arr;

}



function generateOptions(days) {
	var optsArr = getOptionsArray(days);
	var html = '<select id="date" onChange="dateSelect()">'

	optsArr.forEach(function (o) {
		html += '\n\t<option value="' + o[1] + '">' + o[0] + '</option>';
	})
	html += '\n</select>';
	return html;

}

function matchIcon(m) {
	var imgPairs = {
		"education" : "education.png",
		"food &amp; wine" : "food.png",
		"art galleries &amp; exhibits" : "art.jpg",
		"museums &amp; attractions" : "museum.png",
		"concerts &amp; tour dates" : "concert.png",
		"sports": "sports.png",
		"performing arts" : "performing.png",
		"kids &amp; family" : "family.png",
		"outdoors &amp; recreation" : "outdoor.png",
		"health &amp; wellness" : "wellness.png"
	}
	var cArr = m.attributes.categories.map(function (f) { return f.toLowerCase();});

	for (var i = 0; i < cArr.length; i++) {
		if (imgPairs.hasOwnProperty(cArr[i])) {
			return imgPairs[cArr[i]];
		}
	}

	return null;
}

function getTableRows() {
	var html = "";
	coll.models.forEach(function(f) { 
		var price = (!(f.attributes.price)) ? "FREE" : f.attributes.price;
		html += "\n<tr>";
		html+="\t\n<td>" + f.attributes.title + "</td>";
		html+="\t\n<td>" + f.attributes.venueName + "</td>";
		html+="\t\n<td>" + f.attributes.startTime + "</td>";
		html+="\t\n<td>" + price + "</td>";
		html+="\t\n<td>" + f.attributes.venueAddress + "</td>";
		html+="\n</tr>"
	});

	return html;

}




