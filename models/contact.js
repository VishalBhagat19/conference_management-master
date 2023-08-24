const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
    },
    email:{
        type : String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
  
},{timestamps:true})


//create collection
const ContactModel = mongoose.model('contact',ContactSchema)
//                                     ^ collection name


module.exports= ContactModel