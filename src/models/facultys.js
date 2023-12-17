const mongoose=require('mongoose')
const validator=require('validator')

const facultySchema=new mongoose.Schema({
    name:{
        type:String,
        
        trim:true
    },
    
    email:{
        type:String,
        required:true,
        trim:true,
        lowerCase:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error('Email is invalid')
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(value,include("password"))
            throw new Error('password Must contain word password')

        },
        validate(value){
            if(value.length<7)
            throw new Error('password must have greater then 7 digits')
        }

    },
    role:{
        type:String,
        
        trim:true,
        lowerCase:true,
        
    },
    branch:{
        type:String,
        trim:true,
    
    },
    sem:{
        type:String,
        trim:true
    },
    degree:{
        
        type:String,
        trim:true

    },
    year:{
        
        type:String,
        trim:true

    }
})

const Faculty=new mongoose.model("Faculty",facultySchema);

module.exports=Faculty;