//Install the Express Server with npm install express
//Run the server with the command node filename.js (in this case node start.js)
console.log("Starting Express Server....");

var express = require("express");
var webserver = express();

var votes = {}

//express().use allows to use middlewares for each request
webserver.use(express.static("public"));

//GET /votes
webserver.get("/votes", function(request, response){
	response.json(votes);
});

//POST /vote/<id>
webserver.post("/vote/:id", function(request, response){
	var id = request.params.id;
	if(votes[id] === undefined){
		votes[id] = 1;
	}else{
		votes[id] = votes[id] + 1;
	}
	
	response.json({votes:votes[id]});
});

server = webserver.listen(3000, function(){
	console.log("Server Started on 3000 port");
});






