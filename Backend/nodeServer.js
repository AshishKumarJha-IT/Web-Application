let http = require('http');
let fs = require("fs");
const loadash = require('lodash');
const server = http.createServer((req, res)=>{
    console.log("Server created");
    // console.log(req);
    // console.log(req.method);
    // console.log(req.url);

    // res.setHeader('Content-page','text/html');
    // res.write("<h1>Hello server<h1>");
    // res.end();
    let num = loadash.random(0, 20);
    console.log(num);
    
    let path = "./view";   
    switch(req.url){
        case '/':
            path += '/index.html';
            break;
        case '/about':
            path += '/index1.html';
            break;
        default:
            path += '/index3.html';
            break;      
    }
        
    fs.readFile(path,(err, fileData)=>{
        if(err){
            console.log(err);
        }else{
            res.write(fileData);
            res.end();
        }
    });

});




//localhost->127.0.0.1 and port -> 3000
server.listen(3000, "localhost",()=>{
    console.log("sever stared at 300");
})

//use npm install for all dependency
//Parameter -> used for get data from db
//Query -> used for get filtered data