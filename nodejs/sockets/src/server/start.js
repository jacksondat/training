// Install the Express Server with npm install express
// Run the server with the command node filename.js (in this case node start.js)
console.log('Starting Express Server....')

var http = require('http')
var express = require('express')
var mongoose = require('mongoose')
var socketio = require('socket.io')

var appserver = express()
var webserver = http.createServer(appserver)
var io = socketio(webserver)
var realtime = require('./lib/realtime')
// Allows to connect with mongodb
mongoose.connect('mongodb://localhost:27017/tvify')

// import the votes api module
var votesAPI = require('./api/votes_api.js')

// express().use allows to use middlewares for each request
appserver.use(express.static('public'))
// allows to use the votes api module
appserver.use('/api', votesAPI)

// allows to define a listener for events
io.on('connection', function (socket) {
  console.log(`Connected ${socket.id}`)
  socket.on('vote', function (id) {
    realtime.incrementVote(id, function (err, vote) {
      if (err) {
        return socket.emit('vote:error', err)
      }
      socket.emit('vote:done', vote)
    })
  })
})

webserver.listen(3000, function () {
  console.log('Server Started on 3000 port')
})
