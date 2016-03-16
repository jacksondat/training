/**
 * This is an example about how to use synchronous and asynchronous functions with the "Publisher and Subscriber" Design Pattern
 */

/**
 * Publisher
 */

//the 'fs' module allows to manage files in the server
var fs = require('fs');
var EventEmitter = require('events');
//in this case, 'util' module allows to use inherit between classes in javascript
var util = require('util');
var inherits = util.inherits;


function readFile(name, callback){
//process.nextTick allows to send the process at process stack queue and continue with the next process on line
//process.nextTick allows to convert a function in an asynchronous function
	process.nextTick(function(){
		var content = fs.readFileSync(name);
		callback(content.toString());
	});
}

var TextReader = function(name){
//EventEmitter.call allows to subscribe events to the class 
	EventEmitter.call(this);
	this.name = name;
}
//Allows to set heritage between both classes
inherits(TextReader,EventEmitter);

TextReader.prototype.read = function(){
	var self = this;
	readFile(self.name, function(content){
//allows to throw an event
		self.emit('end',content.toString());
	});
}

var reader = new TextReader('./lorem.txt');

module.exports = reader;