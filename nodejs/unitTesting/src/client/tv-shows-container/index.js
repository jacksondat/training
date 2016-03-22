/**
 * Module Dependencies
 */

import $ from 'jquery'

var $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (ev) {
  var $this = $(this);
  var id = $this.data('id');
  $.post('/api/vote/'+id, function(vote){
	  $this.closest('.tv-show').addClass('liked');
	  $this.closest('article').find('.count').html(vote.count);
  });
 
});

export default $tvShowsContainer