_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

app.templates = {};

//#header
app.templates.header = _.template(
  '<div class="logo"><img src="img/gologo.png" width="90" height="90"></div>');

// #datePicker
app.templates.datePicker = _.template(
  '<div class="row inputs">' + 
  	  '<div class="field-one">' +
	  		'<div class="when">When Do You Want to Get Out?</div>' + generateOptions(7) +
	  '</div>' +
	  '<div class="field-two">' + 
	  	  '<div class="what">What Do You Want to Do?</div>' + 
		  '<select id="categorySelect" onChange="applyFilter()">' + 
		  	  '<option value="9">Show All</option>' +
		  	  '<option value="0">Performances</option>' +
			  '<option value="1">Group Events</option>' +
			  '<option value="2">Learning</option>' +
			  '<option value="3">Sports</option>' +
			  '<option value="4">Other</option>' + 
		  '</select>' + 
	  '</div>' + 
	  '<div class="search">' +
	  	'<div class="lookin">Search Events</div>' +
	  	'<input type="text" id="searchBox" placeholder="Get Out">' + 
	  '</div>' + 
  '</div>');

// #eventList
app.templates.eventList = _.template(
  '<div id="sorts"></div>'
);