const express = require('express');
const mongoose = require('mongoose');
import {db_Link} from './secrete'
mongoose.set('strictQuery', true);
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = express.Router();

//1st is base paremeter & 2nd is router to use
app.use('/user',userRouter);  

userRouter
.route("/getcookies")
.get(getCookies);

userRouter
.route("/setcookies")
.get(setCookies)

function setCookies(req, res){
    res.setHeader('Set-Cookie','isLoggedIn=true',{maxAge:1000*60*60*24, secure:true, httpOnly:true});
    res.cookie("Dummy-token","sample value");
    res.json({
        message:"Cookies set in your browser!"
    })
}

function getCookies(req,res){
    let cookies = req.cookies;
    console.log(cookies);
    res.json({
        message:"Cookies info ",
        data : cookies
    });

}

mongoose.connect(db_Link)
.then(function(db){
    // console.log(db);
    console.log('db connected');
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
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
});

const userMOdel = mongoose.model('userMOdel', userSchema);

app.listen(3000);

//Note : bcrpt and mongoose hook pre and post