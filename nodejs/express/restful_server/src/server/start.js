//Install the Express Server with npm install express
//Run the server with the command node filename.js (in this case node start.js)
console.log("Starting Express Server....");

var express = require("express");
var webserver = express();
//import the votes api module
var votesAPI = require('./api/votes_api.js');

//express().use allows to use middlewares for each request
webserver.use(express.static("public"));
//allows to use the votes api module
webserver.use('/api',votesAPI);


server = webserver.listen(3000, function(){
	console.log("Server Started on 3000 port");
});






