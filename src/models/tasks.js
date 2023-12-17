const mongoose=require('mongoose')


const taskSchema= new mongoose.Schema({

    Roll_No: {
        type: String,
        required: true
      },
      branch: {
        type: String,
        required: true
      },
      sem: {
        type: Number,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      year: {
        type: Number,
        required: true
      },
      presem: {
        type: Number,
        required: true
      },
      sgpi: {
        type: Number,
        required: true
      },
      cgpi: {
        type: Number,
        required: true
      },
      files: {
        type: Buffer,
      
      },
      bcourses: [{
        cccode: String,
        cname: String
      }],
      remarks:{
        type:String
    
    },
    completed:{
        type:Boolean
    }



})

const Task=new mongoose.model("Task",taskSchema)
module.exports=Task