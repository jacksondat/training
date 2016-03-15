/*
 * Init the server with the command:
 * node start.js
 */

//the 'fs' module allows to manage files in the server
var fs = require('fs');
// the 'http' module allows to listen for request and responses on http protocol
var http = require('http');

//the createServer function listens for request and responses in the server
var server = http.createServer( function( request, response){
	console.log("I receive a request "+request.url);
	response.end("Hello World with NodeJS");
});

//the 'listen' function allows to start the server
server.listen(3000, function(){
	console.log("Server started. Listen for 3000 port");
});



