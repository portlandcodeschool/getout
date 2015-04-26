var HeaderView = Backbone.View.extend({
  el: '#header',
  render: function() {
    console.log('your header has loaded');

    this.$el.html(app.templates.header({}));
    
  }
});


var DatePickerView = Backbone.View.extend({
  el: '#datePicker',
  render: function() {
    console.log('your datepicker has loaded');

    this.$el.html(app.templates.datePicker());
    
  }
});

var EventListView = Backbone.View.extend({
  el: '#eventList',
  render: function() {
    console.log('your event list has loaded');

    this.$el.html(app.templates.eventList());
    
  }
});

$(function () {
  app.headerView = new HeaderView({});
  app.datePickerView = new DatePickerView({});
  app.eventListView = new EventListView({});

  app.headerView.render();
  app.datePickerView.render();
  app.eventListView.render();
});




var app = {};