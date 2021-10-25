const pixelBoard = 25;

window.onload = function () {
  const boardLocation = document.getElementById('pixel-board');
  for (let i = 0; i < pixelBoard; i += 1) {
    const pixel = document.createElement('li');
    pixel.className = 'pixel';
    boardLocation.appendChild(pixel);
  }
};
