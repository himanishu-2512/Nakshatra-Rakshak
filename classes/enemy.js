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
        this.count = Math.floor(Math.random())*10;
        let image = new Image();
        if (i == 0)
            image.src = './photos/villain1.png'
        else
            image.src = './photos/villain2.png'
        image.onload = () => {
            this.image = image
            this.height = image.height * .20
            this.width = image.width * .20

            // console.log(this.width, this.height)
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