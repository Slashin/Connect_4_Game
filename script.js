var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

var grid = [];
var circRadius = 35;
var player = true;
var red = true;
var counter = 0;
var checkResult = false;


	for (var i = 1; i<500; i++) {
		grid[i] = [];
		for(var j = 1; j<500; j++) {
			grid[i][j] = {x:i*85, y: j*85, filled: false, color: 0};
		}
	}


function drawGrid () {
	for (var i = 1; i<8; i++) {
		for(var j = 1; j<7; j++) {
			ctx.beginPath();
			ctx.arc(grid[i][j].x, grid[i][j].y, circRadius, 0, Math.PI*2);
			ctx.strokeStyle = "#274b82";
			ctx.stroke();
			ctx.lineWidth = 7;
			ctx.closePath();
			if (grid[i][j].filled == false) {
				ctx.beginPath();
				ctx.arc(grid[i][j].x, grid[i][j].y, circRadius, 0, Math.PI*2);
				ctx.fillStyle = "white";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function hoverFill (x, y, color) {
	if (color == true) {
		ctx.beginPath();
		ctx.arc(x, y, circRadius, 0, Math.PI*2);
		ctx.fillStyle = "#ce0a0a";
		ctx.fill();
		ctx.closePath();
	} else if (color == false) {
		ctx.beginPath();
		ctx.arc(x, y, circRadius, 0, Math.PI*2);
		ctx.fillStyle = "#e5e510";
		ctx.fill();
		ctx.closePath();
	}
}

function findTokenSpot (i) {
	var j = 6;
	var toggle = false;
	while (toggle == false && j>0) {
		if(grid[i][j].filled == false) {
			grid[i][j].filled = true;
			toggle = true; 
			if (player == true) {
				grid[i][j].color = 1;
			} else {
				grid[i][j].color = 2;
			}
		} else {
			j--;
		}
	}

}

function dropToken (x,y,color) {
	
	if (color == true) {
		ctx.beginPath();
		ctx.arc(x, y, circRadius, 0, Math.PI*2);
		ctx.fillStyle = "#ce0a0a";
		ctx.fill();
		ctx.closePath();
	} else if (color == false) {
		ctx.beginPath();
		ctx.arc(x, y, circRadius, 0, Math.PI*2);
		ctx.fillStyle = "#e5e510";
		ctx.fill();
		ctx.closePath();
	}

}

function drawWinningTokens (x,y) {
		ctx.beginPath();
		ctx.arc(x, y, circRadius, 0, Math.PI*2);
		ctx.fillStyle = "#45ba41";
		ctx.fill();
		ctx.strokeStyle = "orange";
		ctx.stroke();
		ctx.lineWidth = 10
		ctx.closePath();
}

function drawTokens () {
	for (var i = 1; i<8; i++) {
		for(var j = 1; j<7; j++) {
			if (grid[i][j].filled == true && grid[i][j].color == 1) {
				
				dropToken (grid[i][j].x, grid[i][j].y, true);

			} else if (grid[i][j].filled == true && grid[i][j].color == 2) {

				dropToken (grid[i][j].x, grid[i][j].y, false);

			} 

		}
	}
}

function reloader () {
	document.location.reload();

}

function display () {
	if (checkResult == false) {
		var TextCon = document.querySelector(".ResultDisplayer");
		var Con = document.createElement("h1");
		Con.id = "ResultText";
		if (counter == 42) {
			Con.textContent = "Draw!";
		} else {
			if (red == true) {
				Con.textContent = "Red Player Wins!";
			}else if (red == false) {
				Con.textContent = "Yellow Player Wins!";
			} 
		
	}
	TextCon.appendChild(Con);
	checkResult = true;
	setTimeout(reloader, 1000);
}
}

function mouseClickHandler (e) {
	var clickX = e.clientX - canvas.offsetLeft;
	var clickY = e.clientY - canvas.offsetTop;
	for (var i = 1; i<8; i++) {
			if (clickX >= grid[i][1].x && clickX <= grid[i][1].x + circRadius*2 && clickY >= grid[i][1].y && clickY <= grid[i][1].y + circRadius*2) {
				counter++;
				if(counter == 42) {
					setTimeout(display, 500);
				}
				if (player == true) {
					player = false;
				} else {
					player = true;
				}
				findTokenSpot(i);
				
			} 
	}
}

function mouseHoverHandler (e) {
	var hoverX = e.clientX - canvas.offsetLeft;
	var hoverY = e.clientY - canvas.offsetTop;
	for (var i = 1; i<8; i++) {
			if (hoverX >= grid[i][1].x && hoverX <= grid[i][1].x + circRadius*2 && hoverY >= grid[i][1].y && hoverY <= grid[i][1].y + circRadius*2) {
				if (player == false) {
					hoverFill(grid[i][1].x, grid[i][1].y, true);
				} else {
					hoverFill(grid[i][1].x, grid[i][1].y, false);
				}
				
			} 
	}
	
}

function checkWinner () {
	for(var i = 1; i<8; i++) {
		for(var j = 1; j<7; j++) {

			//verticals

			if (grid[i][j].color == 1 && grid[i][j+1].color == 1 && grid[i][j+2].color == 1 && grid[i][j+3].color == 1) {
				dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
				red = true;
				for(var a = 0; a<4; a++) {
					drawWinningTokens(grid[i][j+a].x, grid[i][j+a].y)
				}
				setTimeout(display, 500);
				
			}
			if (grid[i][j].color == 2 && grid[i][j+1].color == 2 && grid[i][j+2].color == 2 && grid[i][j+3].color == 2) {
				dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
				red = false;
				for(var a = 0; a<4; a++) {
					drawWinningTokens(grid[i][j+a].x, grid[i][j+a].y)
				}
				setTimeout(display, 500);
				
			}

			//horizontals 

			if (grid[i][j].color == 1 && grid[i+1][j].color == 1 && grid[i+2][j].color == 1 && grid[i+3][j].color == 1) {
				dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
				red = true;
				for(var a = 0; a<4; a++) {
					drawWinningTokens(grid[i+a][j].x, grid[i+a][j].y)
				}
				setTimeout(display, 500);
				
				
			}
			if (grid[i][j].color == 2 && grid[i+1][j].color == 2 && grid[i+2][j].color == 2 && grid[i+3][j].color == 2) {
				dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
				red = false;
				for(var a = 0; a<4; a++) {
					drawWinningTokens(grid[i+a][j].x, grid[i+a][j].y)
				}
				setTimeout(display, 500);
				
			}

			//diagonals

			if (grid[i][j].color == 1 && grid[i+1][j+1].color == 1 && grid[i+2][j+2].color == 1 && grid[i+3][j+3].color == 1) {
				dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
				red = true;		
				for(var a = 0; a<4; a++) {
					drawWinningTokens(grid[i+a][j+a].x, grid[i+a][j+a].y)
				}
				setTimeout(display, 500);
				
			}
			if (grid[i][j].color == 2 && grid[i+1][j+1].color == 2 && grid[i+2][j+2].color == 2 && grid[i+3][j+3].color == 2) {
				dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);	
				red = false;			
				for(var a = 0; a<4; a++) {
					drawWinningTokens(grid[i+a][j+a].x, grid[i+a][j+a].y)
				}
				setTimeout(display, 500);
				
			}

			if (j>2) {
				if (grid[i][j].color == 1 && grid[i+1][j-1].color == 1 && grid[i+2][j-2].color == 1 && grid[i+3][j-3].color == 1) {
					dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
					red = true;				
					for(var a = 0; a<4; a++) {
						drawWinningTokens(grid[i+a][j-a].x, grid[i+a][j-a].y)
					}
					setTimeout(display, 500);
					
				}
				if (grid[i][j].color == 2 && grid[i+1][j-1].color == 2 && grid[i+2][j-2].color == 2 && grid[i+3][j-3].color == 2) {
					dropToken(grid[i][j].x, grid[i][j].y, grid[i][j].color);
					red = false;
					for(var a = 0; a<4; a++) {
						drawWinningTokens(grid[i+a][j-a].x, grid[i+a][j-a].y)
					}
					setTimeout(display, 500);
					
				}
			}
				

		}
	}
}

function draw () {
	document.getElementById("startButton").style.visibility = "hidden";
	ctx.clearRect(0,0,canvas.width, canvas.height);
	
	drawGrid ();
	drawTokens();
	checkWinner();
	

}

function startGame() {
	document.addEventListener("mousemove", mouseHoverHandler);
	document.addEventListener("click", mouseClickHandler);
	setInterval(draw, 80);

}


