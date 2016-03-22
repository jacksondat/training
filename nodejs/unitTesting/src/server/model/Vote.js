/**
 * Vote model
 */

var mongoose = require('mongoose')

var voteSchema = new mongoose.Schema({
  showId: {type: Number, require: true, unique: true},
  count: {type: Number, default: 0}
})

module.exports = mongoose.model('Vote', voteSchema)
