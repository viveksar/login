//this is the router page for the user model
let express=require('express')
app=express()
let hbs=require('hbs')
let mongoose=require('mongoose')
let router=new express.Router()
let User=require('../models/user')
let path=require('path')
reqpath=path.join(__dirname,'../views')
router.get('/',async(req,res)=>{
    res.sendFile(reqpath+'/home.html')
})

let bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
//to add a new user


router.post('/user',async(req,res)=>{
let user=new User(req.body)
try{
    await user.save()
    let token=await user.getauthtoken()
   await user.getUserProfile().then((user)=>{
 
    res.render(reqpath+'/welcome.hbs',{user})
   })
}catch(e){
    res.status(400).send(e)
}

})
router.get('/login',async(req,res)=>{
    res.sendFile(reqpath+'/login.html')
})

//to log in for the user

router.post('/login',async(req,res)=>{
    try{
        let user=await User.findByCredentials(req.body.email,req.body.password)
        let token=await user.getauthtoken()
        await user.getUserProfile().then((user)=>{
           res.status(200).render(reqpath+'/welcome.hbs',{user})
        })
    }catch(e){
        console.log(e)
        res.status(200).render(reqpath+'/error.hbs',{e})
    }
})

module.exports=router