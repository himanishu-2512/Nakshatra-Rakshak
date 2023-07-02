const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const socket = io()
canvas.width = window.innerWidth
canvas.height = window.innerHeight


function createPartilces({ object, color, particles }) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(
            {
                position: {
                    x: object.position.x + object.width / 2,
                    y: object.position.y + object.height / 2
                },
                velocity: {
                    x: (Math.random() - 0.5) * 4,
                    y: (Math.random() - 0.5) * 4
                },
                color: color,
                radius: Math.random() * 3,

            }
        ))
    }
}

class Game {
    constructor(gameType, playercount) {
        this.type = gameType
        this.mode = playercount

    }
}

class Player {
    constructor() {
        this.opacity = 1
        this.rotation = 0
        this.position = {
            x: canvas.width / 2,
            y: canvas.height
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        let image = new Image();
        image.src = './photos/rocket.png'
        image.onload = () => {
            this.image = image
            this.height = image.height * .35
            this.width = image.width * .35
            this.position.x = canvas.width / 2 - this.width / 2
            this.position.y = canvas.height - this.height
        }

    }
    draw() {

        c.save()
        c.globalAlpha = this.opacity
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        )
        c.rotate(this.rotation)

        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        )

        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )


        c.restore()

    }


    update() {
        if (this.image) {
            c.save()
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y
            this.draw()
            c.restore()
        }

    }

}
class EnemyProjectile {
    constructor({ position, velocity, i }) {
        this.position = position
        this.velocity = velocity

        this.radius = 2

        let image = new Image()
        if (i == 0)
            image.src = "./photos/axe.png"
        if (i == 1)
            image.src = "./photos/swords2.png"

        image.onload = () => {
            this.image = image
            this.height = image.height * .35
            this.width = image.width * .35
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

    }

    update() {
        if (this.image) {
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.draw()
        }
    }

}

class Enemy {
    constructor({ position, i }) {
        this.position = {
            x: position.x,
            y: position.y
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.i = i
        this.count = 0;
        let image = new Image();
        if (i == 0)
            image.src = './photos/villain1.png'
        else
            image.src = './photos/villain2.png'
        image.onload = () => {
            this.image = image
            this.height = image.height * .20
            this.width = image.width * .20

            console.log(this.width, this.height)
        }

    }
    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update(velocity) {
        if (this.image) {
            this.position.x += velocity.x
            this.position.y += velocity.y
            this.draw()
        }
    }

    shoot(enemyprojectiles) {
        enemyprojectiles.push(new EnemyProjectile({ position: { x: this.position.x + this.width / 2, y: this.position.y + this.width }, velocity: { x: 0, y: 3 }, i: this.i }))

    }


}
class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.enemies = []

        const columns = Math.floor(Math.random() * 8 + 4)
        const rows = Math.floor(Math.random() * 3 + 3)
        this.count = 0
        this.width = columns * 75
        this.total = columns * rows;
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.enemies.push(
                    new Enemy({
                        position: {
                            x: x * 75,
                            y: y * 55
                        },
                        i: y % 2
                    })
                )
            }
        }

    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}
class Particle {
    constructor({ position, velocity, color, radius }) {
        this.position = position
        this.velocity = velocity
        this.opacity = 1
        this.radius = radius
        this.color = color
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.restore()

    }

    update() {
        if (this.opacity > 0)
            this.opacity = this.opacity - 0.01
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }

}
class Projectile {
    constructor({ position, velocity, color = 'red' }) {
        this.position = position
        this.velocity = velocity

        this.radius = 2
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, 4, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()

    }

    update() {

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }

}


let frames = 0

let projectiles = []
let enemyprojectiles = []
let particles = []
let grids = [new Grid()]
let key = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    space: {
        pressed: false
    }

}
addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 37:
        case 65:
            key.left.pressed = true
            player.rotation = -0.15
            break
        case 32:

            // console.log(projectiles)
            break
        case 39:
        case 68:
            key.right.pressed = true
            player.rotation = 0.15
            break
    }
})
addEventListener('keyup', ({ keyCode }) => {
    // console.log(keyCode)
    switch (keyCode) {
        case 37:
        case 65:
            key.left.pressed = false
            player.rotation = 0
            break
        case 32:
            projectiles.push(new Projectile(
                {
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }
            ))
            key.space.pressed = false

            break
        case 39:
        case 68:
            key.right.pressed = false
            player.rotation = 0
            break
    }
})


let player = new Player()

let animationId
let i = -1
let level = 1
let t = false
let gameovercount = 1
function animate() {

    animationId = requestAnimationFrame(animate)

    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(0,0,0)'

    c.fillRect(0, 0, canvas.width, canvas.height)


    player.update()

    particles.forEach((particle, index) => {
        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(index, 1)
            }, 0)
        } else {
            particle.update()
        }
    })
    projectiles.forEach((projectile, index) => {
        if (projectiles.length > 0) {
            if (projectile.position.y + projectile.radius <= 0) {
                projectiles.splice(index, 1)
            } else {
                projectile.update()
            }
        }



    })
    enemyprojectiles.forEach((projectile, index) => {


        if (projectile.position.y + projectile.height >= player.position.y && projectile.position.x + projectile.width / 2 >= player.position.x + player.width / 4 && projectile.position.x + projectile.width / 2 <= player.position.x + player.width * 3 / 4) {
            setTimeout(() => {
                const invaderFound = enemyprojectiles.find(
                    (invader) => invader === projectile
                )
                if (invaderFound) {
                    enemyprojectiles.splice(index, 1)
                    createPartilces({ object: player, color: '#1FD7C9', particles })
                }
                player.opacity = 0
                player.update()
                t = true
            }, 0);



        }
        else
            projectile.update()
        if (projectile.position.y + projectile.height >= canvas.height - player.height / 2) {
            enemyprojectiles.splice(index, 1)
        }
    }


    )
    //grid
    grids.forEach((grid, gridIndex) => {
        grid.update()
        if (level !== 1 && frames % Math.floor(240 / level) == 0 && grid.enemies.length > 0) {
            console.log((Math.floor(240 / level)))
            grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot(enemyprojectiles)
        }
        grid.enemies.forEach((enemy, i) => {

            enemy.update(grid.velocity)
            if (enemy.position.y + enemy.height >= player.position.y) {
                setTimeout(() => { }, 0)

                t = true
            }


            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <=
                    enemy.position.y + enemy.height &&
                    projectile.position.x + projectile.radius >= enemy.position.x &&
                    projectile.position.x - projectile.radius <=
                    enemy.position.x + enemy.width &&
                    projectile.position.y + projectile.radius >= enemy.position.y) {
                    setTimeout(() => {
                        const invaderFound = grid.enemies.find(
                            (invader) => invader === enemy
                        )
                        const projectileFound = projectiles.find(
                            (projectile2) => projectile2 === projectile
                        )

                        // remove invader and projectile
                        if (invaderFound && projectileFound) {
                            createPartilces({ object: enemy, color: enemy.i === 0 ? "#9076B9" : "#B52C2C", particles })
                            console.log(particles)
                            // singular projectile hits an enemy
                            grid.enemies.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.enemies.length > 0) {
                                const firstInvader = grid.enemies[0]
                                const lastInvader = grid.enemies[grid.enemies.length - 1]
                                grid.width =
                                    lastInvader.position.x -
                                    firstInvader.position.x +
                                    lastInvader.width
                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                                enemyprojectiles = []

                            }
                        }
                    }, 0)


                }
            })
        })
    })

    //checking the game condition if true then gameover
    if (t) {

        if (gameovercountcount === 100) {
            cancelAnimationFrame(animationId)

        }
        console.log('game over')
        gameovercountcount++
    }

    //increasing the level
    if (grids.length == 0) {
        player.velocity.y = 15 * i
        if (player.position.y <= 0) {
            i = 0.5
        }
        else if (player.position.y + player.height > canvas.height) {
            i = -1
            player.position.y -= 15
            player.velocity.y = 0
            setTimeout(() => {
                grids.push(new Grid())
            }, 0)
            level++;

        }

    }

    //all the movements and fire  controlls
    if (key.left.pressed && player.position.x > 0) {
        player.velocity.x = -10
    }
    else if (key.right.pressed && player.position.x < canvas.width - player.width) {
        player.velocity.x = 10
    }
    else if (key.space.pressed) {

    }
    else {
        player.velocity.x = 0
    }

    frames++
}

animate()
