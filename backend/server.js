var st = require('st');
var http = require('http');
 
var Router = require("routes-router");
var router = Router(); 
var fs = require('fs');

var eventful = require('./eventful')();



//Example query of eventful (4/20 - 4/27, 10mile radius) - results found in "eventful.results"
//
//eventful.getEvents('2015042000-2015042700', '10');
//
//for MVP, we dont need to make Eventful API calls on demand, only Orchestrate



 router.addRoute("/api/:id", {
		//opts.params.id to access ID
	GET:  function(req,res,opts) {
		console.log("\n---Getting Date---");

		**GREGS CODE**
	     QUERY ORCHESTRATE DB FOR RECORDS /W DATE (stored in variable: opts.id)
	     res.end(JSON.stringify(<<ORCHESTRATE DB RESULTS>>));



	},

});

router.addRoute("/api",{

  GET:  function(req,res,opts) {
      console.log("\n---Getting All---");
     // writeOutput(JSON.stringify(eventful.results));

     **GREGS CODE**
     QUERY ORCHESTRATE DB FOR ALL DATA. 
     res.end(JSON.stringify(<<ORCHESTRATE DB RESULTS>>));
     // res.end(JSON.stringify(eventful.results));
  }
});




router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/index.html' //allows alternative files
}));


 
var server = http.createServer(router);
console.log('server listening on port # 3000');
server.listen(3000);


//This function is just used to create sample data file
// function writeOutput(data) { 

// 		var fs = require('fs');
// 		fs.writeFile("output.json", data, function(err) {
// 	    if(err) {
// 	        return console.log(err);
// 	    }

// 	    console.log("The file was saved!");
// 	}); 
// }








