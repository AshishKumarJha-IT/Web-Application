const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const app = express();

app.listen(3000,()=>{
    console.log("Server start at 3000");
})

app.use(express.json());

const userRouter = express.Router()
const authRouter = express.Router()
app.use('/user', userRouter);
app.use("/auth", authRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)

authRouter
.route('/signup')
.get(getSignup)
.post(postSignup);

function getSignup(req, res){
    res.sendFile("/index.html", {root:__dirname});
}

function postSignup(req, res){
    let dataObj = req.body;
    // console.log("Backend data ",dataObj);
    res.json({
        message:"Data Recieved",
        data:dataObj
    })
}

async function getUser(req, res){
    let allUser = await userModel.find()
    res.json({
        message:"Users info  ",
        data : allUser
    })
}

async function postUser(req, res){     //doubt
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    console.log(user);
    res.json({
        message:"Data is post ",
        data : user
    });
}

const db_Link = 'mongodb+srv://admin:RQfkfEzk5KpW5WSI@cluster0.smort7y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_Link)
.then(function(db){
    // console.log(db);
    console.log("Db Connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
})

const userModel = mongoose.model("userModel", userSchema);

//This is hooks in mongoose concept (Hooks basically a state manegement technique)

// userSchema.pre('save', function(){
//     console.log("Pre data");
// })

// userSchema.post('save', function(){
//     console.log("Post data");
// })
