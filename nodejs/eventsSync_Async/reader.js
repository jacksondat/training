/**
 * This is an example about how to use synchronous and asynchronous functions
 */

var fs = require('fs');

function readFile(name, callback){
//process.nextTick allows to send the process at process stack queue and continue with the next process on line
//process.nextTick allows to convert a function in an asynchronous function
	process.nextTick(function(){
		var content = fs.readFileSync(name);
		callback(content.toString());
	});
}

readFile('./lorem.txt', function(content){
	console.log(content);
});