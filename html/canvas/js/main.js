var board = {
	imageUrl : "./images/fondo.png",
	width: 0,
	height: 0,
}

var diana = {
	xPosition: 0,
	yPosition: 0,
	frontImageUrl : "./images/diana-front.png",
	backImageUrl : "./images/diana-back.png",
	leftImageUrl : "./images/diana-left.png",
	rightImageUrl : "./images/diana-right.png",
}

var keyCodes = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
}

var canvasBoard;

function inicio(){
	var canvasElement = document.getElementById("board");
	canvasBoard = canvasElement.getContext("2d");
	
	board.width = canvasElement.width;
	board.height = canvasElement.height;
	board.image = new Image();
	board.image.src = board.imageUrl;
	board.image.onload = paint;
	
	diana.image = new Image();
	diana.image.src = diana.frontImageUrl;
	diana.image.onload = paint;
	
	document.addEventListener("keydown", moveDiana);
}

function moveDiana(event){
	var dianaImage = diana.frontImageUrl;
	
	switch(event.keyCode){
		case keyCodes.UP:
			if(diana.yPosition > 0){
				diana.yPosition -= 50;
			}
			dianaImage = diana.backImageUrl;
			break;
		case keyCodes.DOWN:
			if(diana.yPosition < board.height - 50){
				diana.yPosition += 50;
			}			
			dianaImage = diana.frontImageUrl;
			break;
		case keyCodes.LEFT:
			if(diana.xPosition > 0){
				diana.xPosition -= 50;
			}			
			dianaImage = diana.leftImageUrl;
			break;
		case keyCodes.RIGHT:
			if(diana.xPosition < board.width - 50){
				diana.xPosition += 50;
			}			
			dianaImage = diana.rightImageUrl;
			break;
	}
	
	diana.image = new Image();
	diana.image.src = dianaImage;
	diana.image.onload = paint;
}

function paint(){
	canvasBoard.drawImage(board.image,0,0);
	canvasBoard.drawImage(diana.image,diana.xPosition,diana.yPosition);
}