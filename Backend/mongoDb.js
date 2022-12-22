const express = require('express');
const mongoose = require('mongoose');
const app = express();

let user = [
    {
        'id':1,
        'name':"Ashish"
    },
    {
        'id':2,
        'name':"Ashish Kumar"
    },
    {
        'id':3,
        'name':"Ashish Kumar Jha"
    }
]

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

function getUser(req, res){
    res.send(user);
}

function postUser(req, res){
    console.log(req.body);
    res.json({
        message:"Data recieve successfuly",
        user:req.body
    })
}

function patchUser(req, res){
    console.log("Request body data is "+req.body);
    let dataTobeUpdate = req.body;
    for(key in dataTobeUpdate){
        user[key] = dataTobeUpdate[key]
    }
    res.json({
        message:"Data update successfully"
    })
}

function deleteUser(req, res){
    user = {};
    res.json({
        message:"Data deleteed"
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

function postSignup(req, res){
    let dataObj = req.body;
    console.log("Backen Data : ",dataObj);
    res.json({
        message:"User singup",
        data: dataObj
    });
}

//pw RQfkfEzk5KpW5WSI
const db_Link = 'mongodb+srv://admin:RQfkfEzk5KpW5WSI@cluster0.smort7y.mongodb.net/?retryWrites=true&w=majority';

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
(async function createUser(){
    let user = {
        name:"Ashish Kumar Jha",
        email:'akjha3387@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };
    let data = await userMOdel.create(user);
    console.log(data);
})();
app.listen(3000);