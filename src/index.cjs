const path=require('path')
const express=require('express')
require('./db/mongoose')


const auth=require('./middleware/auth.js')
 


const hostelsRouter=require('./routers/hostels')
const libraryRouter=require('./routers/librarys')

const coursesRouter=require('./routers/courses')
const userRouter=require('./routers/users')
const taskRouter=require('./routers/tasks')
const otpRouter=require('./routers/otpMail')
const imgVerifyRouter=require('./routers/imgVerify')
const hbs=require('hbs')

const app=express()

//const port=process.env.PORT || 80



//........paths...........
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
//......setup handle bars engine and views location............

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//...setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// routers
app.use(hostelsRouter)
app.use(libraryRouter)
app.use(coursesRouter)
app.use(userRouter)
app.use(taskRouter)
app.use(otpRouter)
app.use(imgVerifyRouter)

//adminpage
app.get('/admin',(req,res)=>{
    res.render('admin')
})
//index page
app.get('',(req,res)=>{
    res.render('index')
})
//libform
app.get('/libform',(req,res)=>{
    res.render('libform')
})
// courses
app.get('/courses',(req,res)=>{
    res.render('coursesCreate')
})
//hostelform
app.get('/hostelform',(req,res)=>{
    res.render('hostelform')
})

//faculty  login page
app.get('/flogin',(req,res)=>{
    res.render('flogin')
})

//student registration page
app.get('/studentRegistration',auth,(req,res)=>{
    res.render('studentRegistration')
})

//create account page
app.get('/createaccount',(req,res)=>{
    res.render('accountcreate')
})

//student login page
app.get('/login',(req,res)=>{
    res.render('login')
})
//student login page
app.get('/login2',(req,res)=>{
    res.render('login2')
})

//faulty page
app.get('/faculty',(req,res)=>{
    res.render('faculty')
})

const bodyParser = require('body-parser')

app.post('/facultys', async (req, res) => {
    try {  
            const faculty=new Faculty({
                email:req.body.email,
                password:req.body.password,
                roll:req.body.roll
            })
            const registered=await faculty.save()      
            res.status(202)   
    } catch (e) {
        res.status(400).send(e)
    }

})



app.listen(80,()=>{
    console.log('server is up on port 80')
})
