const express = require('express');

const app = express();

app.get('/',(req, res)=>{
    res.send("hello");
    // console.log()
})

app.get('/about',(req, res)=>{
    res.sendFile('./view/index1.html',{root:__dirname}) //2 way 
    // res.sendFile('C:\Users\acer\OneDrive\Desktop\Ashish jha\web dev\Backend\view\index.html')
});

app.get('/about-me',(req, res)=>{
    res.redirect('/about');
})

app.listen(3000);