const express = require("express");
const app = express();
const port = 3000;
const connectDB = require('./db/connectDB');
const bodyParser = require('body-parser');
// ================fileUploadlink================
const fileUpload = require("express-fileupload")
var session = require('express-session')
var flash = require('connect-flash');
const router=require('./routes/web')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//image
app.use(fileUpload({useTempFiles: true}));

// messages
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());

app.use(bodyParser.json());

//=================bodyparser setup=====================
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))

//===================link public folder===============
app.use(express.static('public'))


//===============web routing link==============================
const web = require("./routes/web.js");
//===============router load====================
app.use('/', web)
//==================setup EJS======================
app.set('view engine','ejs')




//DB CONNECTION
connectDB();





//================server create=========================
app.listen(port, () => {
    console.log(`server started on localhost:${port}`)
});