const defaultBoard = 25;
const boardLocation = document.getElementById('pixel-board');
const btnNewBoard = document.getElementById('generate-board');
const inputBoard = document.getElementById('board-size');
inputBoard.value = 5;

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

function selectColor() {
  document.querySelectorAll('.color').forEach((element) => {
    element.addEventListener('click', (elementTarget) => {
      const selected = document.getElementsByClassName('color');
      for (let i = 0; i < selected.length; i += 1) {
        if (selected[i].className === 'color selected') {
          selected[i].className = 'color';
        }
      }
      const targetColor = elementTarget;
      targetColor.target.className += ' selected';
    });
  });
}

// setando primeira cor manualmente
document.querySelector('#black').style.backgroundColor = 'black';

function colorizer() {
  document.querySelectorAll('.pixel').forEach((element) => {
    element.addEventListener('click', (elementTarget) => {
      const pixelTarget = elementTarget.target;
      const colorS = document.querySelector('.selected').style.backgroundColor;
      pixelTarget.style.backgroundColor = colorS;
    });
  });
}

function generateBoard(size) {
  if (size < 25 || size > 625) {
    alert('Wrong board size!');
  } else {
    resetBoard();
    for (let i = 0; i < size; i += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      boardLocation.appendChild(pixel);
    }
    colorizer();
    selectColor();
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

window.onload = newcolors;
generateBoard(defaultBoard);

const btnReset = document.getElementById('clear-board');
btnReset.addEventListener('click', () => {
  const pixelCell = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixelCell.length; i += 1) {
    pixelCell[i].style.backgroundColor = 'white';
  }
});

const btnNewColors = document.getElementById('refresh-colors');
btnNewColors.addEventListener('click', () => {
  newcolors();
});

boardLocation.style.width = '300px';
btnNewBoard.addEventListener('click', () => {
  const boardNum = inputBoard.value;
  const gridSize = boardNum - 5;
  const boardWidth = 300;
  if (gridSize === 0) {
    boardLocation.style.width = '300px';
  } else {
    let num = boardWidth;
    for (let i = 0; i < gridSize; i += 1) {
      num += 50;
    }
    boardLocation.style.width = `${num}px`;
  }
  const boardSize = boardNum * boardNum;
  generateBoard(boardSize);
});
