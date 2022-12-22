const express = require('express');
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


//axios used for featch frontend to backend data delivery
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
app.listen(3000);