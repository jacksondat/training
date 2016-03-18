/**
 * This module allows to encapsulate some web services and functionalities and then import them at server
 */

var express = require('express');
var router = express.Router();

var Vote = require('../model/Vote.js');

//GET /votes
router.get("/votes", function(request, response){
	Vote.find({}, function( err, docs){
		if(err){
			return response.sendStatus(500).json(err);
		}
		response.json(docs);
	});	
});

//POST /vote/<id>
router.post("/vote/:id", function(request, response){
	var id = request.params.id;
	Vote.findOne({showId: id}, function(err, doc){
		if(doc){
			doc.count = doc.count + 1;
			doc.save(function(err){
				if(err){
					return response.sendStatus(500).json(err);
				}
				response.json(doc);
			});
		}else{
			var vote = new Vote();
			vote.showId = id;
			vote.count = 1;
			vote.save(function(err){
				if(err){
					return response.sendStatus(500).json(err);
				}
				response.json(vote);
			});
		}
	});
});

module.exports = router;


