const express = require("express");
const bookingRouter = express.Router();

const {createSession} = require("../controller/bookingController")

bookingRouter.post('/createSession',createSession);

bookingRouter.get('/createSession',function(req,res){
    res.sendFile("C:\Users\acer\OneDrive\Desktop\Ashish jha\web dev\FoodApp\foodAppBackend\booking.html")
})

module.exports = bookingRouter;