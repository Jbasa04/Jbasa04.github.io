document.addEventListener('DOMContentLoaded', function() {
    const WIDTH = 400;
    const HEIGHT = 300;

    let ctx;
    let ball = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        radius: 10,
        speedX: 4,
        speedY: 4
    };

    let paddle = {
        x: (WIDTH - 100) / 2,
        y: HEIGHT - 20 - 10,
        width: 100,
        height: 20,
        speed: 5
    };

    const brickRows = 5;
    const brickCols = 10;
    let bricks = [];
    let bricksLeft = brickRows * brickCols;
    let lives = 3;

    function initializeGame() {
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

        let canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        document.addEventListener('keydown', function(event) {
            handleKeyPress(event.keyCode);
        });
    }

    function drawGame() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = '#0000FF';
        ctx.fill();
        ctx.closePath();

        for (let brick of bricks) {
            if (brick.isAlive) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brick.width, brick.height);
                ctx.fillStyle = '#00FF00';
                ctx.fill();
                ctx.closePath();
            }
        }

        ctx.font = '16px Arial';
        ctx.fillStyle = black;
        ctx.fillText('Bricks Remaining: ' + bricksLeft, 10, HEIGHT - 20);
        ctx.fillText('Lives Left: ' + lives, 10, HEIGHT - 40);
    }

    function updateGame() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > WIDTH) {
            ball.speedX = -ball.speedX;
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > HEIGHT) {
            ball.speedY = -ball.speedY;
        }

        if (ball.x + ball.radius >= paddle.x && ball.x - ball.radius <= paddle.x + paddle.width &&
            ball.y + ball.radius >= paddle.y && ball.y - ball.radius <= paddle.y + paddle.height) {
            ball.speedY = -ball.speedY;
        }

        for (let brick of bricks) {
            if (brick.isAlive) {
                if (ball.x + ball.radius >= brick.x && ball.x - ball.radius <= brick.x + brick.width &&
                    ball.y + ball.radius >= brick.y && ball.y - ball.radius <= brick.y + brick.height) {
                    ball.speedY = -ball.speedY;
                    brick.isAlive = false;
                    bricksLeft--;
                    if (bricksLeft === 0) {
                        clearInterval(gameInterval);
                        document.getElementById('game-container').style.display = 'none'; // Hide the game container
                        return; // Exit the function
                    }
                    break;
                }
            }
        }

        paddle.x += paddle.speed;
        if (paddle.x < 0) {
            paddle.x = 0;
        }
        if (paddle.x + paddle.width > WIDTH) {
            paddle.x = WIDTH - paddle.width;
        }

        if (ball.y + ball.radius >= HEIGHT) {
            lives--;
            if (lives > 0) {
                ball.x = WIDTH / 2;
                ball.y = HEIGHT / 2;
                paddle.x = (WIDTH - paddle.width) / 2;
                ball.speedY = 2;
            } else {
                document.getElementById('game-container').style.display = 'none'; // Hide the game container
                return; // Exit the function
            }
        }
    }

    function handleKeyPress(keyCode) {
        if (keyCode === 37) {
            paddle.speed = -5;
        } else if (keyCode === 39) {
            paddle.speed = 5;
        }
    }

    initializeGame();
    let gameInterval = setInterval(function() {
        drawGame();
        updateGame();
    }, 30);
});

