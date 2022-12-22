const userModel = require("../models/userModel");

async function profileController(req, res){
    try {
        let userId = req.userId;
        let user = await userModel.findById(userId);
        res.json({
            message:"Logged user profile ",
            user: user
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }  
}

function getAllUsersController(req, res){
    // console.log(req.cookies);
    res.json({
        message:req.cookies
    })
}

module.exports = {
    profileController:profileController,
    getAllUsersController:getAllUsersController
}