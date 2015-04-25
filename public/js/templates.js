var app = {};

app.templates = {};

//#header
app.templates.header = _.template(
  '<div class="large-12 medium-12 columns">' + '<h1>Get On Out</h1>' + '</div>');

// #mainMap
app.templates.map = _.template(
  '<div class="large-12 columns nopad">' + '<div id="map_canvas">' + '</div>' + '</div>');

app.templates.categories = _.template(
  '<select>' + 
  '<option value="Art Galleries &amp; Exhibits"></option>' + 
  '<option value="Concerts &amp; Tour Dates"></option>' + 
  '<option value="Education"></option>' + 
  '<option value="Food &amp; Wine"></option>' + 
  '<option value="Health &amp; Wellness"></option>' + 
  '<option value="Kids &amp; Family"></option>' + 
  '<option value="Museums &amp; Attractions"></option>' + 
  '<option value="Outdoors &amp; Recreation"></option>' + 
  '<option value="Performing Arts"></option>' + 
  '<option value="Sports"></option>' + 
  '</select>');

// #footerForm
app.templates.footerForm = _.template(
  '<div class="large-12 columns">' + '<hr />' + '<h5>Find an event and get on out!</h5>' + '<form>' + 

  '<div class="row">' + 
  '<div class="large-6 medium-6 columns">' + '<label>Select a date</label>' + '<select>' + '<option value="date"><%= Date %></option>' + '</select>' + '</div>' + 
  '<div class="large-6 medium-6 columns">' + '<label>Select type of event</label>' + '<select>' + '<option value="activity"><%= Activity %></option>' + '</select>' + '</div>' + 
  '</form>' + '</div>');

app.templates.dateItem = _.template(
  '<option value="date"><%= Date %></option>');

app.templates.getoutItem = _.template(
  '<option value="activity"><%= Activity %></option>');

app.templates.footerButton = _.template(
  '<div class="large-12 columns">' + 
        '<p>' + 
          '<a href="#" class="goButton small radius button">Get On Out</a>' +
        '</p>' +       
      '</div>'
  );