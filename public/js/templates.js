_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

app.templates = {};

//#header
app.templates.header = _.template(
  '<div class=""><h1>Get On Out</h1></div>');

// #datePicker
app.templates.datePicker = _.template(
  '<h5>Find an event and get on out!</h5>' + 
  '<div class="row">' + 
	  '<label>Select a date</label>' + generateOptions(7) + 
	  '<div class=".col-xs-12 .col-sm-6 .col-lg-12">' + 
	  	  '<label>Select type of event</label>' + 
		  '<select>' + 
		  	  '<option value="activity">Live Music</option>' +
			  '<option value="activity">DJ Music</option>' +
			  '<option value="activity">Theater</option>' +
			  '<option value="activity">Comedy</option>' + 
		  '</select>' + 
		 '</div>' + 
	  '</form>' + 
  '</div>');

// #eventList
app.templates.eventList = _.template(
  '<div class="large-12 columns"></div>'
);