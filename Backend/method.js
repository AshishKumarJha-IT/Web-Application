const express = require('express');

const app = express();
//middleware function
app.use(express.json());

// let user = {};
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


// app.get('/user',(req, res)=>{    
//     res.send(user);
// })

app.post('/user',(req, res)=>{
    console.log(req.body);
    res.json({
        message:"Data recieve successfuly",
        user:req.body
    })
})

app.patch('/user',(req, res)=>{
    console.log("Request body data is "+req.body);
    let dataTobeUpdate = req.body;
    for(key in dataTobeUpdate){
        user[key] = dataTobeUpdate[key]
    }
    res.json({
        message:"Data update successfully"
    })
})

app.delete('/user',(req, res)=>{
    user = {};
    res.json({
        message:"Data deleteed"
    })
})

// app.get('/about',(req, res)=>{
//     res.sendFile('./view/index1.html',{root:__dirname}) //2 way 
//     // res.sendFile('C:\Users\acer\OneDrive\Desktop\Ashish jha\web dev\Backend\view\index.html')
// });

// app.get('/about-me',(req, res)=>{
//     res.redirect('/about');
// })


//Parameter and query

// app.get('/user/:id',(req, res)=>{
//     let uid = req.params.id;
//     console.log(uid);
//     res.json({
//         message: uid
//     })
//     // res.send("User id is ",uid);  //it's occurs error
// })
app.get('/user/:username',(req, res)=>{
    console.log(req.params.username);
    res.send("User name is recieved");
})

app.get('/user',(req, res)=>{    
    console.log(req.query);
    res.send(user);
})


app.listen(3000);