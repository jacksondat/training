/**
 * Module Dependencies
 */

import $ from 'jquery'

export function getShows(fn) {
  $.ajax('http://api.tvmaze.com/shows', {
    success: function (shows, textStatus, xhr) {
    	$.get('/api/votes', function(votes){
    		shows = shows.map(function(show){
    			var votesFiltered = votes.filter(function(vote){
    				return vote.showId === show.id;
    			});
    			show.count = votesFiltered[0] ? votesFiltered[0].count : 0;
    			return show;
    		});
    		fn(shows);
    	})    	
    }
  })
}

export function searchShows(busqueda, fn) {
  $.ajax('http://api.tvmaze.com/search/shows', {
    data: busqueda,
    success: function (res, textStatus, xhr) {
      fn(res)
    }
  })
}
