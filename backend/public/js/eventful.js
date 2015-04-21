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


console.log('run: loadResults()  to retrieve results from node.js server');




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
	url:'/api/2015042000',
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


console.log('list(), model.attributes, model.save(), list(), model.attributes');
console.log('model.save(), model.fetch()');
console.log('coll.fetch(), coll.models');
console.log('coll.fetch({success:successFn}),');
console.log('populate(), coll.models');
console.log('coll.fetch()_                        ');// problem: some ids are gone!
// EXERCISE: fix it!
// (Hint: the server is representing the object's id differently from Backbone.
// Change the server to feed Backbone the ids it expects.)



// ACTIVITY: explore sync...

