/**
 * this a local module example
 */
//the 'fs' module allows to manage files in the server
var fs = require('fs');

//module.exports allows to public functions 
module.exports.serveStatic = function (name, callback){
	fs.readFile('./public/'+name, function(err, data){
		if(err){
			return callback(err);
		}
		callback(err, data.toString());
	});
};
