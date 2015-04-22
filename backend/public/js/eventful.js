var lat = 45.536500;
var lng = -122.648413;
 
var eventfulRes = {}; // will become duck object retrieved from server
 
function setRes(data,status,jqXHR) {
    //duck = JSON.parse(data);
    eventfulRes = data;
    console.log('results saved to variable: eventfulRes:');
    

}
 
 
function loadResults(date) {

    $.get('/api/' + date,'',setRes,'json');
}


console.log('run: loadResults(date)  to retrieve results from node.js server');




function successFn(coll,res,opts) {
	console.log('Woot!');
	console.log('Response data: ');
	console.log(res);
	console.log('Collection is now: ');
	console.log(coll.models);
}


// Single model:
var eventModel = Backbone.Model.extend({
	url: '/api'
});



var Coll = Backbone.Collection.extend({
	model: eventModel,
	url:'/api/2015042000',//IDEALLY
/*
	sync: function(meth,model,opts) {
		console.log('Collection sync...');
		console.log(meth);
		console.log(model);
		console.log(opts);

	}
*/
});

var coll = new Coll();


console.log('run  coll.fetch()   then   coll.models');
// EXERCISE: fix it!
// (Hint: the server is representing the object's id differently from Backbone.
// Change the server to feed Backbone the ids it expects.)



// ACTIVITY: explore sync...

