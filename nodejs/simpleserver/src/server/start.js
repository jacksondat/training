/*
 * Init the server with the command:
 * node start.js
 */

// the 'http' module allows to listen for request and responses on http protocol
var http = require('http');
//the 'assets' local module allows to read files and return its content
var assets = require('./assets.js');

//the createServer function listens for request and responses in the server
var server = http.createServer( function( request, response){
	console.log("I receive a request "+request.url);
	switch (request.url) {
	case '/':
		assets.serveStatic('index.html',function(err,content){
			response.end(content);
		})
		break;
	case '/app.js':
		assets.serveStatic('app.js',function(err,content){
			response.end(content);
		})
		break;
	case '/app.css':
		assets.serveStatic('app.css',function(err,content){
			response.end(content);
		})
		break;
	default:
		response.statusCode = '404';
		response.end('Not Found');
		break;
	}
});

//the 'listen' function allows to start the server
server.listen(3000, function(){
	console.log("Server started. Listen for 3000 port");
});



