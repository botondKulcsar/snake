const grid = document.querySelector('.grid');
const startButton = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;


function createGrid() {
    for (let i = 0; i < width ** 2; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));


function startGame() {
    // remove the 
    currentSnake.forEach(el => squares[el].classList.remove('snake'))

    // remove the apple
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    // re-add new score to browser
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApples()
        // readdd the snkae cls 2 our current snake
    currentSnake.forEach(part => squares[part].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
}

function move() {
    if (
        ((currentSnake[0] + width >= width ** 2) && (direction === width)) || // snake has hit bttom
        ((currentSnake[0] % width === (width - 1)) && (direction === 1)) || // snake has hit right wall
        ((currentSnake[0] % width === 0) && (direction === -1)) || // snake has hit left wall
        ((currentSnake[0] - width < 0) && (direction === -width)) || // snake has hit top wall
        (squares[currentSnake[0] + direction].classList.contains('snake')) //snake has gone into itself
    ) {
        return clearInterval(timerId);
    }
    // remove last ele from currentSnake;
    const tail = currentSnake.pop()
        // remove styling from last ele
    squares[tail].classList.remove('snake');
    // add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);
    // add styling
    // deal with snake head gettin the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        // remove the class apple
        squares[currentSnake[0]].classList.remove('apple');
        // grow snake by one (adding the class of snake 2 it)
        squares[tail].classList.add('snake');
        // grow currentSnake
        currentSnake.push(tail);
        // genereat new apple
        generateApples();
        // increase score
        score++;
        scoreDisplay.textContent = score;
        // speed up snake
        clearInterval(timerId);
        intervalTime *= speed;
        timerId = setInterval(move, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');

}



function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * width ** 2);
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');
}

generateApples();

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
startButton.addEventListener('click', startGame);