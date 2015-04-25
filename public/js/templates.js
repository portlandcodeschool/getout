_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

app.templates = {};

//#header
app.templates.header = _.template(
  '<div class="large-12 medium-12 columns">' + '<h1>Get On Out</h1>' + '</div>');

// #datePicker
app.templates.datePicker = _.template(
  '<div class="large-12 columns">' + '<hr />' + '<h5>Find an event and get on out!</h5>' + '<form>' + 
  '<div class="row">' + 
  '<div class="large-6 medium-6 columns">' + '<label>Select a date</label>' + generateOptions(7) + '</div>' + 
  '<div class="large-6 medium-6 columns">' + '<label>Select type of event</label>' + '<select>' + '<option value="activity">Live Music</option><option value="activity">DJ Music</option><option value="activity">Theater</option><option value="activity">Comedy</option>' + '</select>' + '</div>' + 
  '</form>' + '</div>');

// #eventList
app.templates.eventList = _.template(
  '<div class="large-12 columns"></div>'
);