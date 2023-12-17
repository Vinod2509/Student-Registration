const express=require('express')
const auth=require('../middleware/auth.js')
const multer=require('multer')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const User=require('../models/users.js')
const router=new express.Router()
////////////////webcam/////////////////////////
const upload = multer({
    dest:'images',

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
})


router.get('/imgupdate',(req,res) =>{
    res.render('imgupdate')
})

router.get('/webcam',auth,(req,res) =>{
    res.render('webcam.hbs')
})

router.get('/webcam2',auth,(req,res) =>{
    res.render('webcam2.hbs')
})

//........image update.............//
router.patch('/imgupdate',auth,async (req,res)=>{

    try{
        //.replace('data:image/jpeg;base64,','')
        let bufferImage=req.body.encoded_image2
           console.log(bufferImage)
         const user = req.user
         //console.log(user)
        // console.log(req.body.encoded_image2)
            user.image=bufferImage
           // console.log(user.image)
            await user.save()
    
    
        //console.log(req.file.buffer)
        res.send({"imagestatus":"got the image"})
    
     }catch(e){
        res.status(404).send("error occured in the db")
    
     }

})
/////...............imgverify..........//////
router.post('/imgverify',auth,async (req,res)=>{

    const user= req.user
    
let encoded_imageOne= Buffer.from(user.image,'base64').toString().replace('data:image/jpeg;base64,','')
//console.log(encoded_imageOne)

let encoded_imageTwo=req.body.encoded_image2.replace('data:image/jpeg;base64,','').toString()

//console.log(encoded_imageOne)

const response = await fetch('https://faceapi.mxface.ai/api/v3/face/verify', {
	method: 'POST',
	body: JSON.stringify({
        "encoded_image1":encoded_imageOne,
        "encoded_image2":encoded_imageTwo
    }),
	headers: {
               'Content-Type': 'application/json',
              'Subscriptionkey':'rKoHCcavJmCZoWki2S-VJ8HhELEzv1552'
              }
});
const data=await response.json()
//let confidence=data[0].confidence
// console.log(encoded_imageOne)
// console.log("////////////////////////////////////////")
// console.log(encoded_imageTwo)
//console.log(data.matchedFaces[0].matchResult)
//console.log(data.code)


 if (data.matchedFaces.length != 0 && data.matchedFaces[0].matchResult ==1)
{
    
    try {
        user.presentStatus = true;
        user.campusImage=req.body.encoded_image2

        await user.save()

        if (!user) {
            return res.status(400).send()
        }
        console.log("user is updated successfully")
    

    } catch (e) {
        res.status(500).send()
    }

    res.send({"da":'studentRegistration'})
}
     
},(error, req, res, next) => {

    res.status(400).send({ error: error.message })
    
})







module.exports =router