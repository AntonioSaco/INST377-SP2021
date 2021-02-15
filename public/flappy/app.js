document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let gameTimerId = setInterval(startGame, 20) // every 20 ms

    // Only jump with a specific key
    function control(e) {
        if(e.keyCode === 32){ // Jump w/ spacebar
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

    // Create the obstacles and move them
    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            // If the pipes move 60px offscreen, delete them
            if (obstacleLeft === -60){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            // Hit detection, if you hit the pipe or the ground
            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) || birdBottom === 0) {
                gameOver()
                clearInterval(timerId) // Freeze everything on gameover
            }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000) // Create obstacle if no gameover
    }

    generateObstacle()

    // End the game and remove control
    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        bird.style.backgroundColor = "red";
        console.log('Game Over')
        document.removeEventListener('keyup', control)
    }
})