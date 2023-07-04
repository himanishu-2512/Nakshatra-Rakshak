const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// const socket = io()
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let scoreId=document.getElementById('scoreId')
let startbtn=document.getElementById("startbutton")
let startscreen=document.querySelector(".start-screen")
let restartbtn=document.getElementById("endbutton")
let restartscreen=document.querySelector(".end-screen")
let highscr=document.getElementById("highscore")
let lifeline=document.querySelector('.lives')
function createPartilces({ object, color, particles,fade,numbers }) {
    for (let i = 0; i < numbers; i++) {
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
                fade
            }
        ))
    }
}
let frames = 0
let player = new Player()
let animationId
let i = -1
let level = 1
let t = false
var gameovercount = 1
let rewards=[]
let projectiles = []
let enemyprojectiles = []
let particles = []
let grids = [new Grid()]
let count=0
let score=0
function init(){
         score=0
        frames = 0
        player = new Player()
        player.lives=3
        player.opacity=1
        animationId
        i = -1
        level = 1
         t = false
         gameovercount = 1
         rewards=[]
         projectiles = []
         enemyprojectiles = []
         particles = []
         grids = [new Grid()]
         count=0
         let lives=[]
         scoreId.innerHTML=score
         for(let i=0;i<player.lives;i++){
            lives.push('<ion-icon name="heart"></ion-icon>')

        }
        const l=lives.join(',')
        lifeline.innerHTML=lives
        for (let i = 0; i < 100; i++) {
        
            particles.push(new Particle(
                {
                    position: {
                        x: Math.random()*canvas.width,
                        y: Math.random()*canvas.height,
                    },
                    velocity: {
                        x: 0,
                        y:1
                    },
                    color: '#ffffff',
                    radius: Math.random() *2,
                    fade:false
                }
            ))}
}
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
    let guncount=0
    addEventListener('keydown', ({ keyCode }) => {

        switch (keyCode) {
            case 37:
            case 65:
                key.left.pressed = true
                player.rotation = -0.15
                break
            case 32:
              if(player.powerup==="machinegun"||player.powerup==="shotgun")
               guncount+=1
               key.space.pressed=true
                break
            case 39:
            case 68:
                key.right.pressed = true
                player.rotation = 0.15
                break
        }
    })
    addEventListener('keyup', ({ keyCode }) => {
        
        switch (keyCode) {
            case 37:
            case 65:
                key.left.pressed = false
                player.rotation = 0
                break
            case 32:
                let v=audio.shoot.play()
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
    //create bg stars
        
            console.log(particles)

function animate() {

    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'rgba(0,0,0)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    rewards.forEach((projectile,index)=>{
        projectile.update()
        if (projectile.position.y + projectile.height >= canvas.height - player.height / 2||projectile.position.x+projectile.radius<=0||projectile.position.x+projectile.radius>=canvas.width) {
            rewards.splice(index, 1)
        }
        if(projectile.position.y + projectile.height >= player.position.y && projectile.position.x + projectile.width / 2 >= player.position.x + player.width / 4 && projectile.position.x + projectile.width / 2 <= player.position.x + player.width * 3 / 4){
            setTimeout(()=>{
                audio.bonus.play()
            if(projectile.val==7){
                player.powerup="machinegun";
                guncount=0;
            }
            else if(projectile.val==8){
                player.powerup="shotgun";
                guncount=0;
            }
            else if(projectile.val==5){
            player.livepower="shield"
            player.poweruplive=1
        }
            rewards.splice(index,1)
            },0)
            

        }
    })
    particles.forEach((particle, index) => {
        if(!particle.fade){
            if(particle.position.y-particle.radius>=canvas.height){
                particle.position.x=Math.random()*canvas.width
                particle.position.y=-particle.radius
            }
        }
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
                    createPartilces({ object: player, color: '#1FD7C9', particles,fade:true,numbers:15 })
                }
                player.opacity = 0
                player.update()
                t = true
            }, 0);



        }
        else
            projectile.update()
        if (projectile.position.y + projectile.height >= canvas.height - player.height / 2||projectile.position.x+projectile.radius<=0||projectile.position.x+projectile.radius>=canvas.width) {
            enemyprojectiles.splice(index, 1)
        }
    }


    )
    //grid
    grids.forEach((grid, gridIndex) => {
        grid.update()
        if (level !== 1 && frames % Math.floor(240 / level) == 0 && grid.enemies.length > 0) {
            
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
                            let v=Math.floor(Math.random()*grid.enemies.length*2)
                            if(v==7||v==8||v==5){
                                rewards.push(new Reward({position:enemy.position,val:v}))}
                            audio.explode.play()
                            score+=10
                            scoreId.innerHTML=score
                            createPartilces({ object: enemy, color: enemy.i === 0 ? "#9076B9" : "#B52C2C", particles,fade:true,numbers:10 })
                            
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
        if(player.poweruplive>0||player.lives>1){
            if(player.poweruplive>0){
            player.poweruplive=0
            player.powerup="normal"
            player.livepower="normal"
        }
        else{
            player.lives-=1
            lives=[]
            for(let i=0;i<player.lives;i++){
                lives.push('<ion-icon name="heart"></ion-icon>')

            }
            const l=lives.join(',')
            lifeline.innerHTML=lives
            player.powerup="normal"
            player.livepower="normal"

        }
        grids=[]
        grids.push(new Grid())
            audio.lose.play()
            player.opacity=0
            t=false
            gameovercount=40;

        }
       else{
        lifeline.innerHTML=""
         if(gameovercount==1)
         audio.gameOver.play()
        
        if (gameovercount === 100) {
            
            let highscore=localStorage.getItem('HighScore')
            if(!highscore){
            localStorage.setItem('HighScore',score);
            highscore=localStorage.getItem('HighScore')
        }
            else{
               if(highscore<score){
                localStorage.setItem('HighScore',score);
                highscore=localStorage.getItem('HighScore')
               }
               
            }
            highscr.innerHTML=highscore
            cancelAnimationFrame(animationId)
            
            restartscreen.style.display="flex"
            audio.backgroundMusic.stop()
            
            
        

        }
    
        gameovercount++}
    }
    else{
        
        if(gameovercount==1){
            player.opacity=1
        }else{
            gameovercount--
        if(gameovercount%8==0){
            
           player.opacity=0
        }
        else{
            
            player.opacity+=0.125
        }}

        
    }

    //increasing the level
    if (grids.length == 0) {
        rewards=[]
        c.fillStyle='#03040506'
        c.fillRect(0,0,canvas.width,canvas.height)
        player.velocity.y = 15 * i
        if (player.position.y <= 0) {
            count=0
            i = 0.5
            particles.forEach((particle)=>{
                if(!particle.fade)particle.velocity.y=20
                
            })
        }
        else if(i>0&&count<200&&player.position.y>=canvas.height/2){
            i=0
            particles.forEach((particle)=>{
                if(!particle.fade)particle.velocity.y+=1
                
            })
        }
        else if (player.position.y + player.height > canvas.height) {
            particles.forEach((particle)=>{
                if(!particle.fade)particle.velocity.y=1
            })
            
            i = -1
            player.position.y -= 15
            player.velocity.y = 0
            setTimeout(() => {
                grids.push(new Grid())
            }, 0)
            level++;
          count=0
        }
        else if(count>=200){
            i=0.5
            particles.forEach((particle)=>{
              if(!particle.fade)particle.velocity.y-=1
              
          })
      }
         count++
    }

    //all the movements and fire  controlls
    if (key.left.pressed && player.position.x > 0) {
        player.velocity.x = -10
    }
    else if (key.right.pressed && player.position.x < canvas.width - player.width) {
        player.velocity.x = 10
    }

    else {
        player.velocity.x = 0
    }

    if (key.space.pressed) {
        if(guncount>=20){
            player.powerup="normal"
            guncount=0
        }

        else if(player.powerup==="machinegun"&&frames%2===0){
            
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
        }
        else if(player.powerup==="shotgun"){
            
            projectiles.push(new Projectile(
                {
                    position: {
                        x: player.position.x + player.width / 2,
                        y: player.position.y
                    },
                    velocity: {
                        x: Math.floor(Math.random()*10-5),
                        y: -10
                    }
                }
            ))
        }
    }

    frames++
}
restartbtn.addEventListener("click",()=>{
    audio.backgroundMusic.play()
    audio.start.play()
    restartscreen.style.display="none"
    init()
    animate()
  
})
startbtn.addEventListener('click',()=>{
    audio.backgroundMusic.play()
    audio.start.play()
    startscreen.style.display="none"
    init()
    animate() 
})

