const defaultBoard = 25;
const boardLocation = document.getElementById('pixel-board');

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

let color1 = randomColor();
let color2 = randomColor();
let color3 = randomColor();

function resetBoard() {
  const boardPixels = document.querySelectorAll('.pixel');
  const boardLength = Object.keys(boardPixels).length;
  for (let i = 0; i < boardLength; i += 1) {
    boardLocation.removeChild(boardPixels[i]);
  }
}

function generateBoard(size) {
  if (size < 25 || size > 500) {
    alert('Wrong board size!');
  } else {
    resetBoard();
    for (let i = 0; i < size; i += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      boardLocation.appendChild(pixel);
    }
  }
}

function newcolors() {
  color1 = randomColor();
  color2 = randomColor();
  color3 = randomColor();
  document.getElementById('color-1').style.backgroundColor = color1;
  document.getElementById('color-2').style.backgroundColor = color2;
  document.getElementById('color-3').style.backgroundColor = color3;
}

window.onload = newcolors();
generateBoard(defaultBoard);
