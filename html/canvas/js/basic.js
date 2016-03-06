var canvasBoard;

function inicio(){
	canvasElement = document.getElementById("board");
	canvasBoard = canvasElement.getContext("2d");
	
	canvasBoard.moveTo(0,0);
	canvasBoard.lineTo(500,0);
	canvasBoard.lineTo(500,500);
	canvasBoard.lineTo(0,500);
	canvasBoard.lineTo(0,0);
	canvasBoard.strokeStyle = "#00F";
	canvasBoard.stroke();
	
	canvasBoard.beginPath();
	canvasBoard.strokeStyle = "#00F";
	canvasBoard.arc(150,150,100, (Math.PI * 2), false);
	canvasBoard.closePath();
	canvasBoard.stroke();
}