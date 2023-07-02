const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors({
  origin:'*'
}))
app.use(express.static('public'))
//
const http=require("http");
const server=http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const players=[];
io.on("connection", (socket) => {
  console.log("user is connected")
  player={
    id:socket.id,
    x:Math.floor(800*Math.random()),
    y:Math.floor(800*Math.random()),
    color:"red"
  }
  players.push(player)
  io.emit('updateplayers',players);
  console.log(players)
  socket.on("create_room",(room)=>{
    socket.join(room);
    console.log(room,"is connncted")
    socket.on("message",(message)=>{
        console.log(message,room);
        socket.to(room).emit("message",{
            message
        })
        // socket.to()
      })
  })
  
  
  socket.to("user1").emit("waht","yes")
  socket.to("user").emit("message","whatsup guys");


});




app.get('/',(req,res)=>{
  res.send("hi this ")
    // res.sendFile(__dirname+'/index.html');
})
server.listen(3000,()=>{
console.log("port is running on 3000")
})