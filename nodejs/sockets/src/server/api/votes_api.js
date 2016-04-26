/**
 * This module allows to encapsulate some web services and functionalities and then import them at server
 */
// client for tvmaze services
var tvmaze = require('tv-maze')
var express = require('express')

var router = express.Router()
var client = tvmaze.createClient()

var realtime = require('../lib/realtime')

// GET shows
router.get('/shows', function (request, response) {
  client.shows(function (err, shows) {
    if (err) {
      return response.sendStatus(500).json(err)
    }
    realtime.addVotes(shows, function (showsWithVotes) {
      response.json(showsWithVotes)
    })
  })
})

// GET shows
router.get('/search/shows', function (request, response) {
  client.search(request.query.q, function (err, shows) {
    if (err) {
      return response.sendStatus(500).json(err)
    }

    shows = shows.map(function (show) {
      return show.show
    })

    realtime.addVotes(shows, function (showsWithVotes) {
      response.json(showsWithVotes)
    })
  })
})

// GET /votes
router.get('/votes', function (request, response) {
  realtime.getVotes(function (err, docs) {
    if (err) {
      return response.sendStatus(500).json(err)
    }
    response.json(docs)
  })
})

// POST /vote/<id>
router.post('/vote/:id', function (request, response) {
  var id = request.params.id

  realtime.incrementVote(id, function (err, vote) {
    if (err) {
      return response.sendStatus(500).json(err)
    }
    response.json(vote)
  })
})

module.exports = router
