const mongoose = require('mongoose')

//define schema

const RegisterSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        required :true
    },
    phone:{
        type : Number,
        required :true
    },

    rollnumber:{
        type : Number,
        required :true
    },
    gender:{
        type : String,
        required :true
    },
    address:{
        type : String,
        required :true
    },
    college:{
        type : String,
        required :true
    },
    course:{
        type : String,
        required :true
    },
    branch:{
        type : String,
        required :true
    },
    
    

},{timestamps:true})

//create collection
const registerModel = mongoose.model('register',RegisterSchema)
//                                  ^ collection name


module.exports = registerModel