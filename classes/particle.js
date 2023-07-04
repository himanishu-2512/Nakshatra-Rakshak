
class Particle {
    constructor({ position, velocity, color, radius,fade }) {
        this.position = position
        this.velocity = velocity
        this.opacity = 1
        this.radius = radius
        this.color = color
        this.fade=fade
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
        if (this.opacity > 0&&this.fade)
            this.opacity = this.opacity - 0.01
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.draw()
    }

}