/**
 * allows to use realtime functionality for votes system
 */

var Vote = require('../model/Vote')

function incrementVote (id, callback) {
  Vote.findOne({ showId: id }, (err, doc) => {
    if (!err && doc) {
      doc.count = doc.count + 1
      doc.save(function (err) {
        if (err) {
          return callback(err)
        }
        callback(null, doc)
      })
    } else {
      var vote = new Vote()
      vote.showId = id
      vote.count = 1
      vote.save(function (err) {
        if (err) {
          return callback(err)
        }
        callback(null, vote)
      })
    }
  })
}

function addVotes (shows, callback) {
  getVotes(function (err, votes) {
    if (err) votes = []

    shows = shows.map(function (show) {
      var vote = votes.filter(function (vote) {
        return vote.showId === show.id
      })
      show.count = vote[0] ? vote[0].count : 0
      return show
    })
    callback(shows)
  })
}

function getVotes (callback) {
  Vote.find({}, function (err, docs) {
    if (err) {
      return callback(err)
    }

    callback(null, docs)
  })
}

module.exports = {
  getVotes: getVotes,
  addVotes: addVotes,
  incrementVote: incrementVote
}
