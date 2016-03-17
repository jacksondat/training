/**
 * This module allows to encapsulate some web services and functionalities and then import them at server
 */

var express = require('express');
var router = express.Router();

var votes = {};

//GET /votes
router.get("/votes", function(request, response){
	response.json(votes);
});

//POST /vote/<id>
router.post("/vote/:id", function(request, response){
	var id = request.params.id;
	if(votes[id] === undefined){
		votes[id] = 1;
	}else{
		votes[id] = votes[id] + 1;
	}
	
	response.json({votes:votes[id]});
});

module.exports = router;


