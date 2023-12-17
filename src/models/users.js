const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')





const userSchema=new mongoose.Schema({

First_Name:{
    
    type:String,
        
    trim:true

},
Last_Name:{
    
    type:String,
        
    trim:true

},
dob:{
    type:String,
    trim:true
},
Mobile_Number:{
    
    type:String,
        
    trim:true

},
Gender:{
    
    type:String,
        
    trim:true

},
Address:{
    
    type:String,
        
    trim:true

},
City:{
    
    type:String,
        
    trim:true

},
Pin_Code:{
    
    type:String,
        
    trim:true

},
State:{
    
    type:String,
        
    trim:true

},
Country:{
    
    type:String,
        
    trim:true

},
image:{
        type:Buffer
    },
campusImage:{
        type:Buffer
    },
presentStatus:{
    type:Boolean,
    default:false

} ,   
    
email:{
        type:String,
        unique:true,
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
roll:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
token: [{
        token: {
            type:String,
            required:true
        }
    }]
})


userSchema.methods.toJSON =function (){
    const user =this
    const userObject=user.toObject()
      delete userObject.password
      delete userObject.tokens
    return userObject
}
//authentication is a method

userSchema.methods.generateAuthToken =async function (){
    const user=this
    console.log('method is loaded')
    const token=  jwt.sign({email: user.email.toString()},'thiscreatestokens')
   // console.log(user)
    user.token= user.token.concat({token:token})
   // console.log(user.token);
    await user.save()

    return token
}




//
userSchema.statics.findByCredentials =async (email,password)=>{
    
    const user = await User.findOne({email})
    
    if(!user){
    
    
        throw new Error('account not found!')
    }
    
    
    const isMatch =await bcrypt.compare(password,user.password)
    
    
    if(!isMatch){
    
    
        throw new Error('Unable to login')
    }
    
    
    return user
}
//hash the plain text password
userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
         user.password= await bcrypt.hash(user.password,8);
    }

    next()
})



const User=new mongoose.model("User",userSchema)

module.exports=User