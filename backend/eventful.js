
var parseString = require('xml2js').parseString;

function initAPI() {
	var e = {
		results: {},
		db: null,
		dbCollection: null,
		params: {
			miRadius: '7',
			lat: '45.536500',
			lng: '-122.648413'
		}
	};

	//Configure Orchestrate database for this evenful module
	e.dbConfig = function(key, table) {
		this.db = require('orchestrate')(key);
		this.dbCollection = table;
	}

	//Updates Orchestrate database with events betwen today and today + dayCount
	e.updateDB = function(dayCount) {

		var today = new Date();
		for (var i = 0; i < dayCount; i++) {
			var cday = new Date();
			cday.setDate(today.getDate() + i);
			var dstr = getDateString(cday);
			e.getEvents(dstr);
		}
	}

	//Pushes events to Orchestrate DB. Each record in Orchestrate is a day
	//where key = date (YYYYMMDD00) with a value "events" that is
	//the array of all events on that day
	e.pushEventsToDB = function(date, data) {
		//key will be date!
		console.log(date + ' events ->  DB');
		this.db.put(this.dbCollection,date,data) //promise...
			.then(function(result){
				console.log(date + ' store SUCCESS!');
			})
			.fail(function(err){
				console.log(date + ' store ERROR: ' + err);
			});
	}

	//Query Eventful for events on cDate
	e.getEvents = function(cDate) { 
		var loc = this.params.lat + ',' + this.params.lng;
		var query = 'http://api.eventful.com/rest/events/search?app_key=7tJ9j6TGcG73XxJX' + '&where=' + loc + '&units=mi&date=' + cDate + '-' + cDate + '&within=' + this.params.miRadius + '&include=categories,price&page_size=100';
		doQuery(query, cDate);

	}

	//Takes Javascript-native Date() object and turns returns Eventful formatted date: YYYYMMDD00
	function getDateString(x) { 
	  var y = (x.getYear() + 1900) + '';
	  var m = (x.getMonth() + 1) + '';
	  var d = x.getDate() + '';
	  m = (m.length == 1) ? ('0' + m) : m;
	  d = (d.length == 1) ? ('0' + d) : d;
	  return y + m + d + '00';
	}

	//Helper function for making http requests to eventful API used in function e.getEvents(cDate)
	function doQuery(query, cDate) {
		var http = require('http');
		var counter = 0;
		var rawResults = [];
		http.get(query, function(response) {
			//console.log('Querying Enventful for events on: ' + cDate + ' at (' + loc + ') in a ' + e.params.miRadius + ' mi radius');
	        console.log('QUERY DATE: ' + cDate);
	        var body = '';
	        response.on('data', function(d) {
	            body += d;
	        });
	        response.on('end', function() { //Initial query completes.
	            parseString(body, function (err, result) {

	            	counter++;
	                rawResults = result.search.events[0].event;
	                var total_pages = result.search.page_count[0];

	                console.log('(' + cDate + ') Results page ' + counter + ' of ' + total_pages + ' received - ' + result.search.total_items[0]);

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
						            	console.log('(' + cDate + ') Results page ' + counter + ' of ' + total_pages + ' received');
						                rawResults = rawResults.concat(aresults.search.events[0].event);
										if (counter == total_pages)
											e.pushEventsToDB(cDate, ParseResults(rawResults));				                
						            });
						        });
						    });
		                }
		            } else {
		            	e.pushEventsToDB(cDate, ParseResults());
		            }
	            });
	        });
	    });	
	}

	//Ran after successful query- refines results
	function ParseResults(rawResults) {
		finalRes = [];
		rawResults.forEach(function (c){
			var newRes = {};
			newRes.e_id = c.$.id;
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

			// var dupe = false;
			// finalRes.forEach(function(x) {
			// 	if (x.id == newRes.id)
			// 		dupe = true;
			// });
			// if (!dupe)
				finalRes.push(newRes);	
		});
		return {events: finalRes};
	}
	return e;
}

module.exports = initAPI;

