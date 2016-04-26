/**
 * This module allows to encapsulate some web services and functionalities and then import them at server
 */
// client for tvmaze services
var tvmaze = require('tv-maze')

var express = require('express')

var router = express.Router()
var client = tvmaze.createClient()

var Vote = require('../model/Vote.js')

function addVotes (shows, callback) {
  Vote.find({}, function (err, votes) {
    if (err) {
      shows = shows.map(function (show) {
        show.count = 0
        return show
      })
    }
    shows = shows.map(function (show) {
      var votesFiltered = votes.filter(function (vote) {
        return vote.showId === show.id
      })
      show.count = votesFiltered[0] ? votesFiltered[0].count : 0
      return show
    })
    callback(shows)
  })
}

// GET shows
router.get('/shows', function (request, response) {
  client.shows(function (err, shows) {
    if (err) {
      return response.sendStatus(500).json(err)
    }
    addVotes(shows, function (showsWithVotes) {
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

    addVotes(shows, function (showsWithVotes) {
      response.json(showsWithVotes)
    })
  })
})

// GET /votes
router.get('/votes', function (request, response) {
  Vote.find({}, function (err, docs) {
    if (err) {
      return response.sendStatus(500).json(err)
    }
    response.json(docs)
  })
})

// POST /vote/<id>
router.post('/vote/:id', function (request, response) {
  var id = request.params.id
  Vote.findOne({showId: id}, function (err, doc) {
    if (err) {
      return response.sendStatus(500).json(err)
    }
    if (doc) {
      doc.count = doc.count + 1
      doc.save(function (err) {
        if (err) {
          return response.sendStatus(500).json(err)
        }
        response.json(doc)
      })
    } else {
      var vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(function (err) {
        if (err) {
          return response.sendStatus(500).json(err)
        }
        response.json(vote)
      })
    }
  })
})

module.exports = router
