//this file here is for the set up of the connection to the database
let mongoose=require('mongoose')
let connectionURL="mongodb://127.0.0.1:27017/loginpage"


mongoose.connect(connectionURL,{ useNewUrlParser:true,
    useCreateIndex:true
})