const mongoose=require('mongoose')
const validator=require('validator')
mongoose.set('strictQuery', false);


const url='mongodb+srv://Mani:oI1VnjW7Z2ELGmsI@cluster0.0ryuw42.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url).then(()=>{
    console.log('connection Successful!')
}).catch((e)=>{
    console.log(e)
})







