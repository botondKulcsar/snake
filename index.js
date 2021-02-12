const grid = document.querySelector('.grid');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));

function move() {
    // remove last ele from currentSnake;
    const tail = currentSnake.pop()
        // remove styling from last ele
    squares[tail].classList.remove('snake');
    // add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    // add styling
    squares[currentSnake[0]].classList.add('snake');

}

let timerId = setInterval(move, 1000);

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    switch (e.keyCode) {
        case 39:
            direction = 1;
            break;
        case 38:
            direction = -width;
            break;
        case 37:
            direction = -1;
            break;
        case 40:
            direction = width;
            break;
    }
}

document.addEventListener('keydown', control);