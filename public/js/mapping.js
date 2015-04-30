var map;

var lat = 45.536500;
var lng = -122.648413;
//var markerArray = []; //stores Markers. When we wipe the map, we empty this array
var infoWindow = null;

console.log('v2');

var mapStyles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}];
console.log('ee4dddd');
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

  map.setOptions({styles: mapStyles});

  infoWindow = new google.maps.InfoWindow();
}

google.maps.event.addDomListener(window, 'load', initialize);

//----------------------------
// Google Maps API functions (mostly marker stuff)
//----------------------------
function addMarker(lat,lng,desc,img) {

	var iconURL = (img) ? ('icons/' + img) : ('icons/default.png');
	var iconObj = {
	  url: iconURL
   // size: new google.maps.Size(90,50), // the orignal size
   // scaledSize: new google.maps.Size(45,25), // the new size you want to use
   // origin: new google.maps.Point(0, 25) // position in the sprite     		
	}

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		icon: iconObj,
		desc: desc
	});

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(marker.desc);
		infoWindow.open(map,marker);
	});

	return marker;
}



//----------------------------
// BackBone Stuff
//----------------------------


//Event backbone model. Has 'renderToMap' function which just adds a marker to map.
var eventModel = Backbone.Model.extend({
	initialize: function() {
		this.set('visible',true);
		this.myView = new eventView({model: this});

		var desc = '<h3>' + this.attributes.title + '</h3>';
		desc+= '<br><strong>Time: </strong>' + this.attributes.startTime;
		desc+= '<br><strong>Date: </strong>' + this.attributes.date;
		desc+= '<br><br><strong>Venue: </strong>' + this.attributes.venueName;
		desc+= '<br><strong>Address: </strong>' + this.attributes.venueAddress;
		desc+= '<br><br><a href="' + this.attributes.url + '" target="blank">More details ...</a>';
		this.set('marker', addMarker(this.attributes.lat, this.attributes.lng,desc, matchIcon(this)));
	},
	getListHTML: function() {
		var desc = '<strong>' + this.attributes.title + '</strong><br>' +
				   this.attributes.startTime + '<br>' +
				   this.attributes.venueName + '<br>' +
				   this.attributes.venueAddress; + '<br>'
		return desc;

	}
});


var eventView = Backbone.View.extend({
	//el: Table row in list
	events: {
		'click': 'markerFocus'
	},
	markerFocus: function() {
		new google.maps.event.trigger( this.model.attributes.marker, 'click' );
		
	},
	initialize: function() {
		this.model.on('change:visible', this.updateVis, this);
		this.$el.html(this.model.getListHTML());
		this.$el.addClass('modelListItem');
		this.$el.attr('id',this.model.cid);
		this.$el.appendTo($('#eventList'));
	},
	updateVis: function() {
		if (this.model.attributes.visible) {
			this.model.attributes.marker.setMap(map);
			$('#' + this.model.cid).show();
		} else {
			this.model.attributes.marker.setMap(null);
			$('#' + this.model.cid).hide();
		}
	}
});


//Collection that holds markers.  pulls from server with .fetch() call in dateSelect function *below*
var EventCollection = Backbone.Collection.extend({
	model: eventModel,
	url:'/api',
	catGroupings: [["art galleries &amp; exhibits", "museums &amp; attractions", "concerts &amp; tour dates", "performing arts", "nightlife &amp; singles", "film", "festivals", "comedy"],
    				  ["food &amp; wine", "neighborhood", "university &amp; alumni", "holiday"],
    				  ["education", "conferences &amp; tradeshows", "literary &amp; books", "business &amp; networking", "technology"],
    				  ["sports", "outdoors &amp; recreation", "kids &amp; family", "health &amp; wellness"],
    				  ["other &amp; miscellaneous", "pets", "fundraising &amp; charity", "sales &amp; retail"]],
	hideAll: function() {
		this.each(function (m) {
			m.set('visible', false);
		});

	},
	showAll: function() {
		this.each(function (m) {
			m.set('visible', true);
		});
		console.log('markers placed on map..');
	},
	searchEvents: function(query) {
		this.hideAll();
		this.each(function (m) {
			if (m.attributes.title.toLowerCase().indexOf(query) > -1)
				m.set('visible', true);	
		});
	},
	filterEvents: function(catNum) {
		if (catNum == 9) {
			this.showAll();
			return true;
		}
		this.hideAll();
		var catArray = this.catGroupings;
		this.each(function (m) {
			var ar = m.attributes.categories.map(function (z) { return z.toLowerCase(); });
			for (var i = 0; i < ar.length; i++) {
				if (catArray[catNum].indexOf(ar[i]) > -1) {
					m.set('visible', true);
					break;
				}
			}
		});
	}
});



function fetchSuccess(coll, res, opts) {
	console.log($('#date').val() + ' EVENTS SUCCESSFULLY RECEIVED: ');

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
	coll.hideAll();
	coll.fetch(fetchParam);
}

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

function applyFilter() {
	var selected = Number($('#categorySelect').val());
	coll.filterEvents(selected);

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


function gar(o) {
	var r = [];
	for (var key in o) {

		r.push(key);

	}
	return r;
}

function matchIcon(m) {
var imgPairs = {



    "art galleries &amp; exhibits": "exhibitions.png",
    "museums &amp; attractions": "museums.png",
    "concerts &amp; tour dates": "concerts.png",
    "performing arts": "entertainment.png",
    "nightlife &amp; singles": "bars.png",
    "film": "movies.png",
    "festivals": "playgrounds.png",
    "comedy": "karaoke.png",

    // Grouup Events ["food &amp; wine", "neighborhood", "university &amp; alumni", "holiday"]
    "food &amp; wine": "food.png",
    "neighborhood": "residential-places.png",
    "university &amp; alumni": "schools.png",
    "holiday": "parks.png",

    // Learning ["education", "conferences &amp; tradeshows", "literary &amp; books", "business &amp; networking", "technology"]
    "education": "schools.png",
    "conferences &amp; tradeshows": "internet.png",
    "literary &amp; books": "magazines.png",
    "business &amp; networking": "internet.png",
    "technology": "computers.png",

    //SPORTS ["sports", "outdoors &amp; recreation", "kids &amp; family", "health &amp; wellness"]
    "sports": "sports.png",
    "outdoors &amp; recreation": "festivals.png",
    "kids &amp; family": "meetups.png",
    "health &amp; wellness": "swimming-pools.png",

    // Other ["other &amp; miscellaneous", "pets", "fundraising &amp; charity", "sales &amp; retail"]
    "other &amp; miscellaneous": "default.png",
    "pets": "pets.png",
    "fundraising &amp; charity": "tickets.png",
    "sales &amp; retail": "shopping.png"
};
// for (var key in imgPairs) {
// 	var str = key.replace('&amp;','&');
// 	var arr = str.split(' ');
// 	arr.map(function (f) { 
// 		var item = 

// 	 })
// }

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

function searchEvents() {
	var q = $('#searchBox').val().toLowerCase();
	coll.searchEvents(q);

}

function init() {

	$('#searchBox').bind("change paste keyup", searchEvents);
	dateSelect();
}

// var cats = [];
// coll.models.forEach(function (c) {

// 	c.attributes.categories.forEach(function (f) {
// 		var cat = f.toLowerCase();
// 		if (cats.indexOf(cat) == -1) {
// 			cats.push(cat);
// 		}
// 	});
// });





