const jwt = require('jsonwebtoken');
const sk = "jhaekyudsjjhsnhns";
const userModel = require("../models/userModel");
const mailSender = require('../utility/mailSender');

async function signupController(req, res){
    try{
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        res.json({
            result:"Data recieved",
            data: dataObj
        })
    }
    catch(err){
        res.status(500).json({
            result:err.message
        })
    }
}

async function loginController(req, res){
    try {
        let {email, password} = req.body;
        if(email && password){
            let user = await userModel.findOne({email});
            if(user){
                if(password == user.password){
                    const token = jwt.sign({ data: user['_id']}, sk);
                    res.cookie('onLoggedIn',token);
                    // res.json({
                    // message:"User info ",
                    // data: user
                    // });
                    res.status(200).json({user});
                }else{
                    res.status(400).json({
                        result:"Please enter valid username or password"
                    });
                }
            }else{
                res.status(404).json({
                    result:"User not Exist.Please signup now"
                });
            }
        }else{
            res.status(404).json({
                result:"Please enter credential"
            });
        }
    } catch (err) {
        console.status(500).log(err.message);
        res.json({
            result:err.message
        });
    }
   
}

async function forgetPasswordController(req, res){
    try {
        let {email} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            let optTimer = Date.now() + 1000*60*5;
            let otp = otpGenerator();
            // let user = await userModel.findOneAndUpdate({email:email}, {otp:otp, otpExp:optTimer},{new:true});
            await mailSender(email,otp);
            user.otp = otp;
            user.otpExp = optTimer;
            await user.save();
            res.status(200).json({
                message:"Otp send to your on regsister email id",
                data:user
            })
        }else{
            res.status(404).json({
                result:"user with this email does not exist"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

async function resetPasswordController(req, res){
    try {
        let {otp, password, confirmPassword, email} = req.body;
        let user = await userModel.findOne({email});
        let currTimeer = Date.now();
        if(currTimeer >user.otpExp){
            user.otp = undefined;
            user.otpExp = undefined;
            await user.save();
            res.status(200).json({
                message:"OTP Expired"
            })
        }
        else{
            if(user.otp != otp){
                res.json({
                    message:"OTP does not match"
                })
            }else{
                user = await userModel.findOneAndUpdate({otp},{password, confirmPassword},{runValidators:true, new:true});
                user.otp = undefined;
                user.otpExp = undefined;
                await user.save();
                res.status(201).json({
                    message:"Your password is successfully changed",
                    user:user
                })
            }
        }           
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

function otpGenerator(){
    return Math.floor(Math.random()*1000000)
}

function protectRoute(req, res, next){
    try {
        let cookie = req.cookies.onLoggedIn;
        if(cookie){
            const deToken = jwt.verify(cookie, sk);
            console.log(deToken);
            let userId = deToken.data;
            req.userId = userId
            next();
        }else{
            res.send("Your are not loggedIn , Kindly log in now");
        }
    } catch (error) {
        console.log(error);
        res.json({
            message:error.message
        })
    }
}

module.exports = {
    signupController,
    loginController,
    resetPasswordController,
    forgetPasswordController,
    protectRoute
}
