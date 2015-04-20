var http = require('http');
var parseString = require('xml2js').parseString;

function initAPI() {
	var e = {
		lat: '45.536500',
		lng: '-122.648413',
		results: []
	};
	var rawResults;

	e.getEvents = function(dateRange, miRadius, lat, lng) { //Pyramid of doom
		var loc = (lat || this.lat) + ',' + (lng || this.lng);
		var cDate = dateRange || 'Today';
		var query = 'http://api.eventful.com/rest/events/search?app_key=7tJ9j6TGcG73XxJX' + '&where=' + loc + '&units=mi&date=' + cDate + '&within=' + miRadius + '&include=categories,price&page_size=100';
		var counter = 0; //counter for pages of results sent by eventful
		http.get(query, function(response) {
			console.log('Querying Enventful for events on: ' + dateRange + ' at ' + loc + ' in a ' + miRadius + ' mi radius');
	        var body = '';
	        response.on('data', function(d) {
	            body += d;
	        });
	        response.on('end', function() { //Initial query completes.
	            parseString(body, function (err, result) {
	            	counter++;
	                rawResults = result.search.events[0].event;
	                var total_pages = result.search.page_count[0];
	                console.log('Results page ' + counter + ' of ' + total_pages + ' received');
	                if (counter != total_pages) { //More than one page of results?
		                for (var i = 2; i <= total_pages; i++) {
		                	http.get(query + '&page_number=' + i, function(response) {
						        var body = '';
						        response.on('data', function(d) {
						            body += d;
						        });
						        response.on('end', function() {
						            parseString(body, function (err, aresults) {
						            	if (err)
						            		console.log('ERROR: ' + err);
						            	counter++;
						            	console.log('Results page ' + counter + ' of ' + total_pages + ' received');
						                rawResults = rawResults.concat(aresults.search.events[0].event);
										if (counter == total_pages)
											ParseResults();				                
						            });
						        });
						    });
		                }
		            } else {
		            	ParseResults();
		            }
	            });
	        });
	    });
	}

	function ParseResults() {
		finalRes = [];
		rawResults.forEach(function (c){
			var newRes = {};
			newRes.id = c.$.id;
			newRes.lat = c.latitude[0];
			newRes.lng = c.longitude[0];
			newRes.startTime = c.start_time[0].split(' ')[1];
			newRes.startDate = c.start_time[0].split(' ')[0];
			newRes.price = null;
			newRes.title = c.title[0];
			newRes.categories = [];
			newRes.city = c.city_name[0];
			newRes.performers = [];
			newRes.url = c.url[0];
			newRes.venueAddress = c.venue_address[0];
			newRes.venueName = c.venue_name[0];
			newRes.venueUrl = c.venue_url[0];

			c.categories[0].category.forEach(function (x) {
				newRes.categories.push(x.name[0]);
			});

			if (c.performers[0] != "") {
				c.performers[0].performer.forEach(function (x) {
					newRes.performers.push(x.name[0]);
				})
			}

			if (c.price[0] != "")
				newRes.price = c.price[0];	

			e.results.push(newRes);	
		});
	}
	return e;
}

module.exports = initAPI;

