/**
 * Subscriber
 */

var reader = require('./reader')

reader.on('end', function(content){
	console.log(content);
})
