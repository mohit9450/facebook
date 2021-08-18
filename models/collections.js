
const validator = require('validator');
const mongoose = require('mongoose');


const playListSchema = new mongoose.Schema({
    first_name:{
        type:String,
        // required:true,
        // lowercase:true,
        // trim : true,
        // minlength : 2,
        // maxlength: 30
    },
    Surname:{
        type:String,
        // required:tr
    },
    password:{
        type:String
    },
    email : {
        type: String
        // unique : true,
        // validate(value){
        //     if(validator.isEmail(value))
        //     throw new Error("email is invalid");
        // }
    },
    dob : {
        type :Date
    },
    gender : {
        type : String
    }
})

const PlayList = new mongoose.model("PlayList",playListSchema);
module.exports = PlayList;