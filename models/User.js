const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    contactNumber:{
        type:String
    },
    dob:{
        type:String
    },
    gender:{
        type:String
    },
    profileImage:{
        type:String
    }
});

module.exports=mongoose.model('User',userSchema);