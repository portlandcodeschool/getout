var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

	fs.readFile('map-test.html', {encoding: 'utf8'} , function (err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
  });
});

console.log('listening on port 3000');
server.listen(3000);
