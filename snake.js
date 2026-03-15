//this is to find the canvas elements in the HTML
const canvas = document.getElementById("game");
//this allows JavaScript to draw shapes
const ctx = canvas.getContext("2d");

//this defines the size of each snake square
const box = 20;

//this stores the snakes body position
let snake = [{
    x:200,
    y:200
}];

let direction = "RIGHT";

//this basically places food randomly, using the Math.random()
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random()* 20) * box
};


document.addEventListener("keydown", changeDirection);

//this is a function that updates the snake's direction based on the conditions.
function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }
    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
    if (event.key == "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,500,500);

    for (let i =0; i<snake.length; i++) {
        ctx.fillStyle ="green";
        //this draws a square for each snake segment
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //this is colouring the food
    ctx.fillStyle = "white";
    ctx.fillRect(food.x, food.y, box, box);
    
    //this gets the snake's head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //moves the head based on the direction being pressed
    if (direction === "LEFT")snakeX -= box;
    if (direction === "RIGHT")snakeX += box;
    if (direction === "UP")snakeY -= box;
    if (direction === "DOWN")snakeY += box;

    //this part of code checks if snake ate the food (If snake head is at the same position as the food)
    //the snake ate the food
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            //the math.floor() rounds down decimals to a Whole number
            x : Math.floor(Math.random() * 20) * box,
            y : Math.floor(Math.random() * 20) * box
        } 
    } else {
        snake.pop();
        //if snake didn't eat the food, it removes the tail to keep the snake length the same
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //this checks if the snake hits the wall, if it does - it's alerts game over then reloads the screen
    if (snakeX < 0 || snakeX >= 500 || snakeY <0 | snakeY >= 500){
        ctx.fillStyle = "white";
        ctx.font = "40px Algerian";
        //if all conditions are met, it will write game over on the canvas
        ctx.fillText("GAME OVER!", 200, 200)
        clearInterval(draw);
        return;
   }

    snake.unshift(newHead);
}

setInterval(draw, 150);

//this is the function to restart the game
let gameInterval;
function restartGame() {
    let snake = [{
        x: 200,
        y: 200
    }];

    let direction = "RIGHT";

    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    }
    
    gameInterval = setInterval(draw, 150);
}

document.getElementById("restartBtn").addEventListener("click", restartGame);