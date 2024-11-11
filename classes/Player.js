class Player {
    constructor() {
        this.poweruplive = 0;
        this.lives = 3;
        this.livepower = "normal";
        this.powerup = "normal";
        this.opacity = 1;
        this.rotation = 0;
        this.position = {
            x: canvas.width / 2,
            y: canvas.height
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.image = new Image();
        this.image.src = './photos/rocket.png';
        this.imageLoaded = false;

        // Handle image load to set dimensions
        this.image.onload = () => {
            this.height = this.image.height * 0.35;
            this.width = this.image.width * 0.35;
            this.position.x = canvas.width / 2 - this.width / 2;
            this.position.y = canvas.height - this.height;
            this.imageLoaded = true;
        };
    }

    draw() {
        if (this.imageLoaded) {
            c.save();
            c.globalAlpha = this.opacity;
            c.translate(
                this.position.x + this.width / 2,
                this.position.y + this.height / 2
            );
            c.rotate(this.rotation);
            c.translate(
                -this.position.x - this.width / 2,
                -this.position.y - this.height / 2
            );
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
            c.restore();
        }
    }

    update() {
        if (this.imageLoaded) {
            c.save();

            // Draw shield if livepower is active
            if (this.livepower === "shield") {
                c.fillStyle = 'rgba(248, 25, 25, 0.534)';
                c.beginPath();
                c.arc(
                    this.position.x + this.width / 2,
                    this.position.y + this.height / 2,
                    this.height / 2,
                    0,
                    Math.PI * 2
                );
                c.fill();
            }

            // Set image source based on power-up (only if changed)
            if (this.powerup !== this.lastPowerup) {
                if (this.powerup === "machinegun") {
                    this.image.src = './photos/machinegun.png';
                } else if (this.powerup === "shotgun") {
                    this.image.src = './photos/shotgun.png';
                } else {
                    this.image.src = './photos/rocket.png';
                }
                this.lastPowerup = this.powerup;
            }

            // Update position
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            // Draw the player
            this.draw();
            c.restore();
        }
    }
}
