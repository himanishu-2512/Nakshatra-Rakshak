class EnemyProjectile {
    constructor({ position, velocity, i }) {
        this.position = position
        this.velocity = velocity
    audio.enemyShoot.play()
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