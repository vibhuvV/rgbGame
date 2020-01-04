var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = Array.from(document.querySelectorAll('.square'));
var colorToDisplay = pickColor();
var displayColor = document.getElementById('displayColor');
displayColor.textContent = colorToDisplay;
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.getElementById('reset');
var modeButton = Array.from(document.querySelectorAll('.mode'));
var selectedB = document.querySelector('.selected');

window.addEventListener('load', reset);

modeSelection();
function modeSelection() {
	modeButton.forEach(function(button) {
		button.addEventListener('click', function() {
			modeButton[0].classList.remove('selected');
			modeButton[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);
			reset();
		});
	});
}

function showColorsAndWork() {
	squares.forEach(function(item, index) {
		if (colors[index]) {
			item.style.display = 'block';
			item.style.backgroundColor = colors[index];
		} else {
			item.style.display = 'none';
		}

		item.addEventListener('click', function() {
			var sqColor = this.style.backgroundColor;
			if (sqColor === colorToDisplay) {
				messageDisplay.textContent = 'Correct!!';
				resetButton.textContent = 'Play Again?';
				h1.style.backgroundColor = sqColor;
				colorChangeAll(sqColor);
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again!!';
			}
		});
	});
}

function colorChangeAll(color) {
	//loop through the squares where color has to be changed
	squares.forEach(function(sq) {
		if (sq.style.backgroundColor !== color) {
			sq.style.backgroundColor = color;
		}
	});
}

function pickColor() {
	var randIndex = Math.floor(Math.random() * colors.length);
	return colors[randIndex];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function reset() {
	colors = generateRandomColors(numSquares);
	colorToDisplay = pickColor();
	displayColor.textContent = colorToDisplay;
	h1.style.backgroundColor = 'steelblue';
	if (resetButton.textContent !== 'New Colors') {
		resetButton.textContent = 'New Colors';
	}
	messageDisplay.textContent = '';
	showColorsAndWork();
}
resetButton.addEventListener('click', reset);
