app.templates = {};

app.templates.main = _.template(
  //#header
  '<div class="large-12 medium-12 columns">' + '<h1>Get On Out</h1>' + '</div>');

// #mainMap
app.templates.map = _.template(
  '<div class="large-12 columns nopad">' + '<div id="map_canvas">' + '</div>' + '</div>');

// #footerForm
app.templates.footerForm = _.template(
  '<div class="large-12 columns">' + '<hr />' + '<h5>Find an event and get on out!</h5>' + '<form>' + 

  '<div class="row">' + '<div class="large-4 medium-4 columns">' + '</div>' 
  + '<label>Select a date</label>' + '<select>' + '<option value="date"><%= Date %></option>' + '</select>' + '</div>' + 

  '<div class="row">' + '<div class="large-4 medium-4 columns">' + '</div>' 
  + '<label>Select type of event</label>' + '<select>' + '<option value="activity"><%= Activity %></option>' + '</select>' + '</div>'


   + '</form>' + '</div>');

app.templates.dateItem = _.template(
  '<option value="date"><%= Date %></option>');

app.templates.getoutItem = _.template(
  '<option value="activity"><%= Activity %></option>');

app.templates.mapRadius = _.template(
  '<option value="distance"><%= Distance %></option>');

app.templates.footerButton = _.template(
  '<div class="large-12 columns">' + 
        '<p>' + 
          '<a href="#" class="goButton small radius button">Get On Out</a>' +
        '</p>' +       
      '</div>'
  );