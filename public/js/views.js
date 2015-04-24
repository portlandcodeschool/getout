var app = {};

var SubView = Backbone.View.extend({
  initialize: function() {
  },
  render: function() {
  }
});


var MainView = Backbone.View.extend({
  el: '#mainContent',


  initialize: function() {
    this.headerView = new SubView({el:"#header"});
    this.mapView = new SubView({el:"#mainMap"});
    this.footerView = new SubView({el:"#footerForm"});
    this.submitView = new SubView({el:"#footerSubmit"})
  },
  render: function() {
    var test = this.$el.html();
    test = this.$el.html('Print out something');
  }


});

var mainView;
function go() {
  mainView = new MainView();
};

$(go);