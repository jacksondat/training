/**
 * Module Dependencies
 */

import $ from 'jquery'
import socketio from 'socket.io-client'

var socket = socketio()

var $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (ev) {
  var $this = $(this)
  var $article = $this.closest('.tv-show')
  var id = $article.data('id')
  $article.addClass('liked')
  socket.emit('vote', id)
})

socket.on('vote:done', function (vote) {
  var $article = $tvShowsContainer.find('article[data-id=' + vote.showId + ']')
  $article.find('.count').html(vote.count)
})

export default $tvShowsContainer
