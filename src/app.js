//this is the new file for the login-signup page
let express=require('express')
let PORT=3000
let hbs=require('hbs')
let html=require('html')
let path=require('path')
let app=express()
app.use(express.json())
let bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
require('./db/mongoose')
let userRouter=require('./routers/userr')
app.set('view engine','html')

let otherdirpath=path.join(__dirname,'../public')
app.use(express.static(otherdirpath))



app.use(userRouter)

app.listen(PORT,()=>{
    console.log('The server has started on port '+PORT)
})