// const { Socket } = require("socket.io")

const canvas = document.querySelector('canvas')
const input = document.querySelector('#input')
const submit = document.querySelector('#submit')
const c = canvas.getContext('2d')
const socket=io()
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var X;
var Y;
var projectile
const p=[];
socket.on('updateplayers',(players)=>{
    players.map((item)=>{
        if(socket.id==item.id){
            X=item.x;
            Y=item.y;
            console.log(X,Y)
        }
       const ps= new Player(item.x , item.y, 10, item.color);
    p.push(ps);

    }) 
    
})
socket.on('message',(players)=>{
    console.log(players)
})



submit.addEventListener("click",()=>{
    socket.emit("create_room",input.value);
})
class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, velocity, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = velocity
        this.radius = radius
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    

    }

}

class Enemy {
    constructor(x, y, radius, velocity, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = velocity
        this.radius = radius
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y




    }

}

class Particles {
    constructor(x, y, radius, velocity, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = velocity
        this.radius = radius
        this.alpha=1
    }
    draw() {
        c.save()
        c.globalAlpha=this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.friction = 0.99

        this.draw()
        this.velocity.x *=0.99
        this.velocity.y *=0.99
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha-=0.01




    }

}




const projectiles = []
const enemies = []
const particles = []


window.addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - Y, e.clientX -X)
    const velocity = {
        x: Math.cos(angle)*8,
        y: Math.sin(angle)*8
    }
    const audio = new Audio("./audio/gun_shot.mp3")
    audio.play()
    projectiles.push(new Projectile(X,Y, 2, velocity, 'white'));
})
function enemyadd() {
interval=3000
    setInterval(() => {
        const radius = Math.random() * 20 + 15
        var x = 0;
        var y = 0;
        if (Math.random() < 0.5) {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        else {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        }
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        list=['#FF1700' ,' #FF8E00' ,' #FFE400'  ,'#01fff4' ,'#06FF00','#1DB9C3','#7027A0']
        enemies.push(new Enemy(x, y, radius, velocity,list[Math.floor(Math.random()*5)]))
        if(interval>1000)interval-=500
        else interval-=10
    },interval)
}
let animationId
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
p.forEach((item)=>{
    item.draw();
})
   
    particles.forEach((particle,index) => {
       if(particle.alpha<0){
        particles.splice(index,1)
       }else{
        particle.update()}
    })
    projectiles.forEach((projectile, pindex) => {

        projectile.update()
        if (projectile.x - projectile.radius < 0 || projectile.y - projectile.radius < 0 || projectile.x + projectile.radius > canvas.width || projectile.y + projectile.radius > canvas.height) {
            setTimeout(() => {

                projectiles.splice(pindex, 1)
            }, 0
            );
        }
    })

    enemies.forEach((enemy, index) => {
p.forEach((player)=>{
    const d = Math.hypot(player.x - enemy.x, enemy.y - player.y)
    if (d - player.radius - enemy.radius < 0) {
    socket.emit("message",{
        messages:"my game is over",
        name:socket.id
    })
    console.log(socket)
    
        const audio = new Audio("./audio/game_over.wav")
        audio.play()
        cancelAnimationFrame(animationId)
    }
})
       
        projectiles.forEach((projectile, pindex) => {
            const d = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y)
            if (d - enemy.radius - projectile.radius < 1) {
                for (var i = 0; i < enemy.radius; i++) {
                    particles.push(new Particles(enemy.x , enemy.y, Math.random(), {
                        x: (Math.random() - 0.5) * (Math.random ()* 6),
                        y: (Math.random() - 0.5) * (Math.random() * 6)
                    }, enemy.color))
                }

                if (enemy.radius - 10 > 15) {
                    gsap.to(enemy, {
                        radius: enemy.radius - 15
                    })
                    enemy.radius -= 15
                    setTimeout(() => {
                        projectiles.splice(pindex, 1)
                    })
                }
                else {
                    setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(pindex, 1)
                    }, 0
                    );
                }

            }
        })
        enemy.update()
    }

    )

}
enemyadd()
animate()
