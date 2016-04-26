/**
 * Module Dependencies
 */

import $ from 'jquery'

export function getShows (fn) {
  $.ajax('/api/shows', {
    success: function (shows, textStatus, xhr) {
      fn(shows)
    }
  })
}

export function searchShows (busqueda, fn) {
  console.log(busqueda)
  $.ajax('/api/search/shows', {
    data: busqueda,
    success: function (res, textStatus, xhr) {
      fn(res)
    }
  })
}
