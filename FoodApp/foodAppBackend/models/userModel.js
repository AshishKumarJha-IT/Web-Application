const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const secrets = require('../secret');
const Db_link = secrets.dbPassword;
mongoose.connect(Db_link)
.then(function(){
    console.log("DB connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is missing"]
    },
    email:{
        type:String,
        required:[true,"Email is missing"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is missing"],
        minLength:[8, "Please enter minimun 8 digits password"]
    },
    confirmPassword:{
        type:String,
        required:[true, "Confirm Password is missing"],
        minLength:[8, "Please enter minimun 8 digits password"],
        validate:{
            validator:function(){
                return this.password == this.confirmPassword;
            },
            message:"Password mismatch"
        }
    },
    otp:{
        type:String
    },
    otpExp:{
        type:Date
    }
});

const userModel = mongoose.model('UserModel', userSchema);
module.exports = userModel;