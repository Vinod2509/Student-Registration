const jwt=require('jsonwebtoken')
const User= require('../models/users')

const auth= async(req,res,next) => {
    try {
        console.log("entered auth")
      //  console.log(req.headers)
        const t = req.headers.cookie
        const token=t.replace("authorizationToken=","")
        //const token=req.headers('Authorization')
        console.log(token)
       
        const decoded=jwt.verify(token,'thiscreatestokens')
        console.log(decoded)
        //,'tokens.token':token
        const user =await User.findOne({email:decoded.email})
         // console.log(user)
        if(!user){
            throw new Error()

        }

          req.token=token
          req.user =user
        next()
        
    } catch (e) {
        res.status(401).send({error:'Please authenticate'})        
    }
}

module.exports=auth