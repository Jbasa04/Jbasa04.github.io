#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

// Define canvas dimensions
#define WIDTH 800
#define HEIGHT 600

// Function prototypes
void initializeGame();
void drawGame();
void updateGame();
void handleKeyPress(int keyCode);

// Canvas context
var ctx;

// Ball properties
var ball = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    radius: 10,
    speedX: 3,
    speedY: 3
};

// Paddle properties
var paddle = {
    x: (WIDTH - 100) / 2,
    y: HEIGHT - 20 - 10,
    width: 100,
    height: 20,
    speed: 5
};

// Brick properties
const brickRows = 5;
const brickCols = 10;
var bricks = [];
var bricksLeft = brickRows * brickCols;
var lives = 3;

// Initialize game state
function initializeGame() {
    // Initialize bricks
    for (let i = 0; i < brickCols; i++) {
        for (let j = 0; j < brickRows; j++) {
            bricks.push({
                x: i * 80,
                y: j * 25,
                width: 80,
                height: 20,
                isAlive: true
            });
        }
    }

    // Get canvas context
    var canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Add event listener for key presses
    document.addEventListener('keydown', function(event) {
        handleKeyPress(event.keyCode);
    });
}

// Draw the game on the canvas
function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000'; // Red color
    ctx.fill();
    ctx.closePath();

    // Draw paddle
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0000FF'; // Blue color
    ctx.fill();
    ctx.closePath();

    // Draw bricks
    for (let brick of bricks) {
        if (brick.isAlive) {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.width, brick.height);
            ctx.fillStyle = '#00FF00'; // Green color
            ctx.fill();
            ctx.closePath();
        }
    }

    // Draw score and lives
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000000'; // Black color
    ctx.fillText('Bricks Remaining: ' + bricksLeft, 10, HEIGHT - 20);
    ctx.fillText('Lives Left: ' + lives, 10, HEIGHT - 40);
}

// Update the game state
function updateGame() {
    // Update ball position
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Bounce off walls
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > WIDTH) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > HEIGHT) {
        ball.speedY = -ball.speedY;
    }

    // Check collision with paddle
    if (ball.x + ball.radius >= paddle.x && ball.x - ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >= paddle.y && ball.y - ball.radius <= paddle.y + paddle.height) {
        ball.speedY = -ball.speedY;
    }

    // Check collision with bricks
    for (let brick of bricks) {
        if (brick.isAlive) {
            if (ball.x + ball.radius >= brick.x && ball.x - ball.radius <= brick.x + brick.width &&
                ball.y + ball.radius >= brick.y && ball.y - ball.radius <= brick.y + brick.height) {
                ball.speedY = -ball.speedY;
                brick.isAlive = false;
                bricksLeft--;
                if (bricksLeft === 0) {
                    alert('All bricks knocked out!');
                }
                break;
            }
        }
    }

    // Move paddle
    paddle.x += paddle.speed;
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.width > WIDTH) {
        paddle.x = WIDTH - paddle.width;
    }

    // Check if ball falls below paddle
    if (ball.y + ball.radius >= HEIGHT) {
        lives--;
        if (lives > 0) {
            ball.x = WIDTH / 2;
            ball.y = HEIGHT / 2;
            paddle.x = (WIDTH - paddle.width) / 2;
            ball.speedY = 2;
        } else {
            alert('Game Over! You LOST');
        }
    }
}

// Handle key press events
function handleKeyPress(keyCode) {
    if (keyCode === 37) {
        // Left arrow key
        paddle.speed = -5;
    } else if (keyCode === 39) {
        // Right arrow key
        paddle.speed = 5;
    }
}

// Main game loop
function main() {
    initializeGame();
    setInterval(function() {
        drawGame();
        updateGame();
    }, 30);
}
// Start the game
main();

