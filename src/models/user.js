//this file is for the user model
let express=require('express')
let mongoose=require('mongoose')
let validator=require('validator')
let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')

let userschema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
},
email:{
    required:true,
    type:String,
    trim:true,
    unique:true,
    lowercase:true,
    validate(email){
        if(!validator.isEmail(email)){
            throw new Error('You have entered a invalid email')
        }
    }
},
password:{
type:String,
required:true,
trim:true,
validate(password){
    if (password.length<6){
        throw new error("min length of password should be 6")
    }
    else if( password.includes('password')||password.includes('Password')){
        throw new error("enter another password")
    }

}
},
username:{
    required:true,
    type:String,
    unique:true,
    trim:true
},
age:{
    type:Number,
    default:0,
    validate(age){
        if(age<0){
            throw new Error('please enter a valid age')
        }
    }
},
tokens:[{
    token:{
        type:String,
        required:true
    }
}]


})


//to get the auth token
userschema.methods.getauthtoken=async function(){
    let user=this
    let token=jwt.sign({_id:user._id.toString()},'thisissecretkey')
    user.tokens=user.tokens.concat({
        token:token
    })
    await user.save()
    return token
}
userschema.methods.getUserProfile=async function(){
    let user=this
    let UserObject=user.toObject()
    delete UserObject.password
    delete UserObject.tokens
    //now we will return the UserObject
    return UserObject
}

//to declare findByCredentials method
userschema.statics.findByCredentials=async (email,password)=>{
let user=await User.findOne({
    email:email
})
if (!user){
    throw new Error('please signup first')
}

//to check if password is valid
let isvalid=await bcrypt.compare(password,user.password)
if(!isvalid){
    throw new error('You have entered a wrong password')
}
return user

}

userschema.pre('save',async function(next){
    let user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})


let User=mongoose.model("User",userschema)
module.exports=User