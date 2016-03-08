//Install the Express Server with npm install express
//Run the server with the command node filename.js (in this case node backend.js)
console.log("Starting Express Server....");

//shows the required module
var express = require("express");
var path = require('path');
var parser = require('body-parser');

var webserver = express();
webserver.use(parser.urlencoded({extended:true}));

var server;

//Starts the Server on 8080 port
server = webserver.listen(8080, function(){
	console.log("Server Started");
});

//Allows to configure the application web context
//http://127.0.0.1:8080
webserver.get("/", function(request, response){
	response.send("Good job, you are listening for request on your web server.");
});

//http://127.0.0.1:8080/test/context
webserver.get("/test/context", function(request, response){
	response.send("<strong>Test</strong> context");
});

//http://127.0.0.1:8080/test/context/withParameters?plane=airbus&age=26
webserver.get("/test/context/withParameters", function(request, response){
	response.send("your plane is "+request.query.plane+" and your age is "+request.query.age);
});

//allows to load a file with the html code
//http://127.0.0.1:8080/form
webserver.get("/form", function(request, response){
	response.sendFile(path.resolve("../client/home.html"));
});

//to manage variables with POST you need install body-parser module
//install body-parser module with the command npm install body-parser
webserver.post("/enter", function(request, response){
	response.send("you submited the form with user: "+request.body.username+" and password: "+request.body.password);
});
