var Pet = function(name, voice){
	this.name = name;
	this.voice = voice;
}

Pet.prototype.speak = function(){
	alert(this.voice);
}