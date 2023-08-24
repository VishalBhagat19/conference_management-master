const mongoose = require('mongoose')

const url="mongodb+srv://vibhuvishal80:123456789vishal@cluster0.ulck43a.mongodb.net/?retryWrites=true&w=majority"
const connectDB = ()=> {
    return mongoose.connect(url)
    .then(()=>{
        console.log('connected succesfully !');
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDB
