class Player {
    constructor() {
        this.poweruplive = 0;
        this.lives = 3;
        this.livepower = "normal";
        this.powerup = "normal";
        this.lastPowerup = this.powerup;
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

        // Preload all power-up images
        this.images = {
            rocket: new Image(),
            machinegun: new Image(),
            shotgun: new Image()
        };
        this.images.rocket.src = './photos/rocket.png';
        this.images.machinegun.src = './photos/rocket2.png';
        this.images.shotgun.src = './photos/rocket3.png';

        // Default image
        this.image = this.images.rocket;
        this.imageLoaded = false;

        // Handle image load to set dimensions for the rocket image
        this.images.rocket.onload = () => {
            this.height = this.images.rocket.height * 0.35;
            this.width = this.images.rocket.width * 0.35;
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

            // Switch image reference based on power-up (only if changed)
            if (this.powerup !== this.lastPowerup) {
                if (this.powerup === "machinegun") {
                    this.image = this.images.machinegun;
                } else if (this.powerup === "shotgun") {
                    this.image = this.images.shotgun;
                } else {
                    this.image = this.images.rocket;
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
