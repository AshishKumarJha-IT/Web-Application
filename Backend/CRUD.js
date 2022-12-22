const express = require('express');
const mongoose = require('mongoose');
import {db_Link} from './secrete'
const app = express();

// let user = [
//     {
//         'id':1,
//         'name':"Ashish"
//     },
//     {
//         'id':2,
//         'name':"Ashish Kumar"
//     },
//     {
//         'id':3,
//         'name':"Ashish Kumar Jha"
//     }
// ]

const userRouter = express.Router();
const authRouter = express.Router();

app.use(express.json());
//1st is base paremeter & 2nd is router to use
app.use('/user',userRouter);  
app.use('/auth', authRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(patchUser)
.delete(deleteUser);

userRouter.route('/:id').get(getUserByID)

authRouter
.route('/signup')
.get(getSignup)
.post(postSignup)

async function getUser(req, res){
    let allUser = await userMOdel.find();
    res.json({
        message:"List of all user",
        data:allUser
    });
}

// async function getUser(req, res){
//     let allUser = await userMOdel.findOne({name:"Ashish Kumar Jha"});
//     res.json({
//         message:"List of all user",
//         data:allUser
//     });
// }

function postUser(req, res){
    console.log(req.body);
    res.json({
        message:"Data recieve successfuly",
        user:req.body
    })
}

async function patchUser(req, res){
    console.log("Request body data is "+req.body);
    let dataTobeUpdate = req.body;
    let user = await userMOdel.findOneAndUpdate({email:'akjha3387@gmail.com'},dataTobeUpdate);

    res.json({
        message:"Data update successfully",
        data:user
    })
}

async function deleteUser(req, res){
    // user = {};
    let dataTobeUpdate = req.body;
    let user = await userMOdel.findOneAndDelete(dataTobeUpdate)
    res.json({
        message:"Data deleteed",
        data:user
    })
}

function getUserByID(req, res){
    let uid = req.params.id;
    console.log(uid);
    // res.json({
    //     message: user[uid - 1]
    // })
    let obj = {};
    for(let i = 0; i <user.length; i++){
        if(user[i]['id'] == uid){
            obj = user[i];
        }
    }
    res.json({
        message:"Data Recieved",
        data: obj
    })
}

function getSignup(req, res){   
    res.sendFile('/Food/index.html',{root:__dirname});
}

async function postSignup(req, res){
    let dataObj = req.body;
    let user = await userMOdel.create(dataObj);
    console.log("Backen Data : ",dataObj);
    res.json({
        message:"User singup",
        data: user
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
// (async function createUser(){
//     let user = {
//         name:"Ashish",
//         email:'email@gmail.com',
//         password:'1234754',
//         confirmPassword:'12348'
//     };
//     let data = await userMOdel.create(user);
//     console.log(data);
// })();
app.listen(3000);

//Note : bcrpt and mongoose hook pre and post