class Player {
    constructor() {
        this.poweruplive=0
        this.lives=3
        this.livepower="normal"
        this.powerup="normal"
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
            if(this.livepower=="shield"){
                c.save()
            c.fillStyle='rgba(248, 25, 25, 0.534)'
            c.arc(this.position.x+this.width/2,this.position.y+this.height/2,this.height/2,0,Math.PI*2)
            c.fill()
            c.restore()
        }
        
        
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y
            this.draw()
            c.restore()
        }

    }

}