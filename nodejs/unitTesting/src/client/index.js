/**
 * Module Dependencies
 */

import $ from 'jquery'
import page from 'page'
import { getShows, searchShows } from './tvmaze-api-client'
import renderShows from './render'
import $tvShowsContainer from './tv-shows-container'
import './search-form'
import qs from 'qs'

page('/', function (ctx, next) {
  $tvShowsContainer.find('.tv-show').remove()
/**
 * Disabled localStorage
 */
  if (!window.localStorage.shows) {
    getShows(function (shows) {
      $tvShowsContainer.find('.loader').remove()
      window.localStorage.shows = JSON.stringify(shows)
      renderShows(shows)
    })
  } else {
    renderShows(JSON.parse(window.localStorage.shows))
  }
})

page('/search', function (ctx, next) {
  $tvShowsContainer.find('.tv-show').remove()
  var $loader = $('<div class="loader">')
  $loader.appendTo($tvShowsContainer)
  const busqueda = qs.parse(ctx.querystring)
  searchShows(busqueda, function (res) {
    $loader.remove()

    renderShows(res)
  })
})

var productionEnv = !!~window.location.host.indexOf('github.io')

if (productionEnv) {
  page.base('/tvify')
}

page()
