const express=require('express')
const auth=require('../middleware/auth.js')
const router=new express.Router()


///..........otp ...verification..............///
router.get('/otp', (req,res)=>{
    res.render('otp.hbs')
})

 
var nm = require('nodemailer');
let savedOTPS = {

};
var transporter = nm.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: '111manikanta.v@gmail.com',
           // pass: ''
        },
        tls: {
            rejectUnauthorized: false,
            
        }
    }
);
router.post('/sendotp', (req, res) => {
    let email = req.body.email;
    console.log(email)
    let digits = '0123456789';
    let limit = 4;
    let otp = ''
    for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];

    }
    var options = {
        from: '111manikanta.v@gmail.com',
        to: `${email}`,
        subject: "Testing node emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`

    };
    transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send("couldn't send")
            }
            else {
                savedOTPS[email] = otp;
                setTimeout(
                    () => {
                        delete savedOTPS.email
                    }, 60000
                )
                res.send("sent otp")
            }

        }
    )
})

router.post('/verify', (req, res) => {
    let otprecived = req.body.otp;
    let email = req.body.email;
    if (savedOTPS[email] == otprecived) {
        res.send("Verfied");
    }
    else {
        res.status(500).send("Invalid OTP")
    }
})

//////////////////otp//////////////////////////////////////////

module.exports =router

