
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