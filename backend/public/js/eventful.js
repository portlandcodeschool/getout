var lat = 45.536500;
var lng = -122.648413;
 
var eventfulRes = {}; // will become duck object retrieved from server
 
function setRes(data,status,jqXHR) {
    //duck = JSON.parse(data);
    eventfulRes = data;
    console.log('results saved to variable: eventfulRes');
}
 
 
function loadResults() {


    $.get('/api','',setRes,'json');
    console.log('Results received');
}


console.log('run: loadResults()  to retrieve results from node.js server');