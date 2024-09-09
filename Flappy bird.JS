// Declare variables at the top
let bird: Sprite = null
let score: number = 0

// Create the bird sprite and set its position and gravity
bird = sprites.create(img`
    . . . . . . . . f f . . . . . . . 
    . . . . . . f f 6 6 f f . . . . . 
    . . . . f f 6 6 6 6 6 f f . . . . 
    . . . f f 6 6 6 6 6 6 6 f f . . . 
    . . . f f 6 6 6 6 6 6 6 f f . . . 
    . . . . f f 6 6 6 6 6 f f . . . . 
    . . . . . f f 6 6 6 f f . . . . . 
    . . . . . . f f f f f . . . . . . 
`, SpriteKind.Player)
bird.ay = 200  // Add gravity to the bird
bird.setPosition(40, 60)  // Set initial position of the bird

// Control the bird jump when button A is pressed
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bird.vy = -100  // Move the bird upward when A is pressed
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function()  {
    bird.vy = -100
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    bird.vy = -100
})

// Create pipes and make them move to the left
game.onUpdateInterval(1500, function () {
    let pipeGap = randint(20, 60)  // Random gap between pipes

    let pipeTop = sprites.create(img`
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
    `, SpriteKind.Enemy)

    let pipeBottom = sprites.create(img`
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
        . . . . f f f f f f . . . .
    `, SpriteKind.Enemy)

    pipeTop.setPosition(160, pipeGap - 80)  // Position the top pipe
    pipeBottom.setPosition(160, pipeGap + 80)  // Position the bottom pipe

    pipeTop.vx = -30  // Move the top pipe to the left
    pipeBottom.vx = -30  // Move the bottom pipe to the left

    pipeTop.setFlag(SpriteFlag.AutoDestroy, true)  // Auto destroy when off-screen
    pipeBottom.setFlag(SpriteFlag.AutoDestroy, true)  // Auto destroy when off-screen
})

// Detect collision between bird and pipes to end the game
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)  // End the game if bird hits a pipe
})

// Detect collision with the ground to end the game
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorDark0, function (sprite, location) {
    game.over(false)  // End the game if bird hits the ground
})

// Initialize the score and increase it every time the bird passes pipes
info.setScore(0)  // Set the initial score to 0
game.onUpdateInterval(1500, function () {
    score += 1  // Increase score
    info.changeScoreBy(1)  // Update displayed score
})
