const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors({
  origin:'*'
}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.listen(3000,()=>{
console.log("port is running on 3000")
})