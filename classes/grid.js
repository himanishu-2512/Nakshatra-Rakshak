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