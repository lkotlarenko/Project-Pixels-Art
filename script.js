const defaultBoard = 25;
const boardLocation = document.getElementById('pixel-board');

function resetBoard() {
  const boardPixels = document.querySelectorAll('.pixel');
  const boardLength = Object.keys(boardPixels).length;
  if (boardLength >= 5) {
    for (let i = 0; i < boardLength; i += 1) {
      boardLocation.removeChild(boardPixels[i]);
    }
  }
}

function generateBoard(size) {
  if (size < 5 || size > 25) {
    alert('Wrong board size!');
  } else {
    resetBoard();
    for (let i = 0; i < size; i += 1) {
      const pixel = document.createElement('li');
      pixel.className = 'pixel';
      boardLocation.appendChild(pixel);
    }
  }
}

window.onload = generateBoard(defaultBoard);
