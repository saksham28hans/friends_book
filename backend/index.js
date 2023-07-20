const express = require('express');
const app = express();
const mongoose = require('mongoose')
const helmet = require('helmet')
const dotenv = require('dotenv')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversations')
const messagesRoute = require('./routes/messages')
const multer = require('multer')
const path = require('path')
const cors = require('cors');

dotenv.config()

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://sak28hans:square1234@cluster0.ejqwpkx.mongodb.net/social',(err)=>{
    if(err)
    console.log(err);
    else
    console.log("Connected to Mongo");
});

app.use("/images",express.static(path.join(__dirname, "public/images")));
//middleware
app.use(cors());
app.use(express.json());
app.use(helmet())
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"public/images");
    },
    filename : (req,file,cb) =>{
        //console.log();
        cb(null,req.body.name);
    },
});

const upload = multer({storage});
app.post('/api/upload',upload.single("file"),(req,res)=>{
    try {
        
        return res.status(200).json("File Uploaded Successfully.")
    } catch (error) {
        console.log(error);
    }
});


app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messagesRoute)


app.get("/",(req,res)=>{
    res.send("Welcome to homepage")
})

app.get("/user",(req,res)=>{
    res.send("Welcome to User Page")
})

app.listen(8800,()=>{
    console.log("Backend server is ready and running");
})