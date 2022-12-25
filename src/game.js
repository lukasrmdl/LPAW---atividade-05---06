import { imageLoad } from './loaders/imageLoad.js'
import { soundLoad } from './loaders/soundLoad.js'
import { keyPress, key } from './keyboard.js'
import Player from './player.js'
import Enemy from './enemy.js'
import Fish from './fish.js'

//Constantes
const frames = 60
const totalEnemies = 7

//Alternaveis
let canvas
let context
let msg
let animation
let limits
let score = 0
let gameOver = false
let enemies = Array.from({length: totalEnemies})
let background
let fishSound
let gameOverSound
let gameSound


//Jogador e Inimigo
const player = new Player(310, 100, 20, 6, 60, 60, '/sprites/player-sprite.png', frames)

//Frutas
const fish = new Fish(410, 200, 12, 5, 35, 35, '/sprites/fish.png', frames)

const init = async () => {
    canvas = document.querySelector('canvas')
    canvas.width = 700
    canvas.height = 400
    context = canvas.getContext('2d')

    msg = document.querySelector('h2')

    console.log(player.x)
    //render background
    background = await imageLoad('/sprites/background-swamp.jpg')
    
    //render sounds
    fishSound = await soundLoad('/sounds/fish-cap.mp3')
    fishSound.volume = .6
    gameOverSound = await soundLoad('/sounds/gameover.mp3')
    gameOverSound.volume = .5
    gameSound = await soundLoad('/sounds/gamemusic.mp3')
    gameSound.volume = .7
    gameSound.loop = true

    limits = {
        width: canvas.width,
        height: canvas.height
    }

    enemies = enemies.map(e =>
        new Enemy(
            Math.random() * limits.width,
            30, 20,
            Math.random() * limits.height,
            60, 66,
            '/sprites/enemy-sprite.png', frames
        )
    )
    keyPress(window)
    loopAnimation()
}

const loopAnimation = () => {
    setTimeout(() => {
        console.log(player.x)
        context.drawImage(background, 0, 0, limits.width, limits.height)
        player.move(limits, key)
        player.draw(context)

        fish.draw(context)

        enemies.forEach(enemy => {
            enemy.move(limits)
            enemy.draw(context)
            gameOver = !gameOver ? enemy.colision(player.hurtbox) : true
        })

        if(player.status != 'down')
            gameSound.play()

        if(fish.colision(player.hurtbox)){
            fish.x = (Math.random() * limits.width) - 12
            fish.y = (Math.random() * limits.height) - 12
            fish.hurtbox.x = fish.x + fish.width / 2
            fish.hurtbox.y = fish.y + fish.height / 2
            fish.cellX = Math.floor(Math.random() * 1)
            console.log(fish)
            fishSound.load()
            fishSound.play()
            score++
            msg.innerHTML = `PLACAR: ${score}`
        }

        if(gameOver){
            gameOverSound.play()
            gameSound.pause()
            cancelAnimationFrame(animation)
            msg.style.color = '#016c98'
            msg.innerHTML = `FIM DE JOGO! PLACAR: ${score}`
        }else{
            animation = requestAnimationFrame(loopAnimation)
        }
    }, 1000 / frames)
}

export { init  }


