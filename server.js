var st = require('st');
var http = require('http');
 
var Router = require("routes-router");
var router = Router(); 
var fs = require('fs');
var db = require('orchestrate')('e88f176f-2c79-4488-a349-718120a5ceda');
var dbCollectionName = 'eventsTable';

var eventful = require('./modules/eventful')();

 //want to update DB?
 //updateDB();




 router.addRoute("/api/:id", {
    //opts.params.id to access ID
  GET:  function(req,res,opts) {
      console.log("\n---Getting One---");
      whenReady(null,res,opts,readData);
  }

});

router.addRoute("/api",{
  GET:  function(req,res,opts) {
      console.log("\n---Getting All---");
      whenReady(null,res,opts,readData);
      console.log(opts);
  }
});




router.addRoute("/*", st({
  path: __dirname + "/public",
  index:'/index.html' //allows alternative files
}));


function whenReady(req,res,opts,CRUDfn) {
  console.log(JSON.stringify(opts,null,2));

  if (!req) { //no request --> respond immediately
    return CRUDfn(res,opts);
  }
  // else must parse JSON body before responding
  parseBodyJSON(req,res,function(err,body) {
    if (err) {
      res.statusCode = 418;// override default 200
      console.log('DOH! Invalid JSON!');
      console.log(err);
      return res.end("Request failed!")
    }
    console.log('body = '+body);
    console.log('type = '+typeof body);
    if (typeof body === 'object')
      console.log(body);

    CRUDfn(res,opts,body);
  });
}

//CRUD functions:
function readData(res,opts) {
  var key = opts.parsedUrl.query.split('=')[1];
  console.log('incoming id: ',key);
  if (key)
    return readOne(res,key);
  else
    return readAll(res);
}

function readAll(res) {
  db.list(dbCollectionName)// promise...
    .then(function(result){
      console.log("Database response:")
      console.log(result.body);
      var values = result.body.results.map(extractValue);
      console.log("Data retrieved");
      console.log(values);
        res.end(JSON.stringify(values)); // send values as JSON
    })
    .fail(function(err){
      console.log("error: "+err);
        });
}

function readOne(res,key) {
  db.get(dbCollectionName,key)
    .then(function(results){
      var value = results.body;
      console.log("Data retrieved");
       console.log(value.events.length);
        res.end(JSON.stringify(value.events)); // send values as JSON
    })
    .fail(function(err){
      console.log("error: "+err);
      })
}

function updateDB() {
  eventful.dbConfig('e88f176f-2c79-4488-a349-718120a5ceda', 'eventsTable');
  eventful.updateDB(8);
}
 
var server = http.createServer(router);
console.log('server listening on port # ' + (process.env.PORT || 3000));
server.listen((process.env.PORT || 3000));


//This function is just used to create sample data file
// function writeOutput(data) { 

//    var fs = require('fs');
//    fs.writeFile("output.json", data, function(err) {
//      if(err) {
//          return console.log(err);
//      }

//      console.log("The file was saved!");
//  }); 
// }








