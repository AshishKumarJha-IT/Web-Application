// const http = require('http');

// const server = http.createServer((req, res)=>{
//     console.log("Server created");
//     res.write("Welcome to backend");
//     res.end();
// })

// server.listen(3000,'localhost',()=>{
//     console.log('Server started at 300');
// });

const express = require('express');
const mongoose = require('mongoose');
import {db_Link} from './secrete'
mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());

// let user = [
//     {
//         "Name":"Ashish Kr Jha",
//         "id":1
//     },
//     {
//         "Name":"Ashish Kr",
//         "id":2
//     },
//     {
//         "Name":"Ashish Jha",
//         "id":3
//     }
// ]

app.get('/user',(req, res)=>{
    res.json({
        message:"Data is ",
        data:user
    })
})

app.post('/user',(req, res)=>{
    let dataObj = req.body;
    user.push(dataObj);
    console.log(user);
    res.json({
        message:"Data is ",
        data: user
    })
})

app.patch('/user',(req, res)=>{         //doubt
    let dataTobeUpdate = req.body;
    console.log(dataTobeUpdate);
    for(key in dataTobeUpdate){
        user[key] = dataTobeUpdate[key]
    }
    // let id = 1;
    // for(let i = 0; i < user.length; i++){
    //     if(user[i][id] == dataTobeUpdate.id){
    //         user[i] = dataTobeUpdate
    //     }
    //     id++;
    // }
    res.json({
        message:'Data updated succesfully',
        data: user
    })
})

app.delete('/user', (req, res)=>{
    // user = {},
    res.json({
        message:"Data deleted successfully",
        data:user
    })
})


app.get('/user/:id',(req, res)=>{
    let uid = req.params;
    res.json({
        message:"User id recieved",
        data : uid
    })
})

app.get('/user',(req, res)=>{      //doubt
    console.log(req.query.id);
    res.json({
        message:'Query recievd',
        data:user
    })
})


app.listen(3000,()=>{
    console.log("Server start at 3000");
})

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
})

const userMOdel = mongoose.model("userModel", userSchema);


