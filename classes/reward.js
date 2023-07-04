
class Reward{
    constructor({position,val}){
        this.position=position
        this.velocity={
            x:0,
            y:5,
        }
        let image=new Image()
        this.val=val
        
        if(val==7){
            image.src='./photos/gun1.png'
        }
        else if(val==8){
            image.src='./photos/gun2.png'
        }
        else if(val==5){
            image.src="./photos/shield.png"
        }
        image.onload=()=>{
            this.image=image
            if(this.val==5){
            this.height = image.height *.45
            this.width = image.width *.45}
            else if(this.val==7){
                this.height=image.height*.20
                this.width=image.width*.20
            }
            else{
                this.height=image.height*.10
                this.width=image.width*.10
            }
            // console.log(this.width,this.height)
        }
    }
    
    draw(){
    if(this.image){
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
    
    }
    update(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.draw()
    }
    }