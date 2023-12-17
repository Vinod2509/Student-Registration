
const express=require('express')
const Task=require('../models/tasks')
const auth=require('../middleware/auth.js')
const router=new express.Router()
const multer = require('multer');

//create a task

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle form submission
router.post('/tasks', auth,upload.array('files'), async (req, res) => {
  // Extract form data from req.body
  console.log(req.body)
  const {
    Roll_No,
    branch,
    sem,
    degree,
    year,
    presem,
    sgpi,
    cgpi,
    bcourses,
    remarks,
     completed,
    
  } = req.body;
   // Convert bcourses from a string to an array
   const parsedBcourses = JSON.parse(bcourses);

   // Process file data and convert to buffers
   const fileBuffers = req.files.map(file => ({
     data: file.buffer,
     contentType: file.mimetype
   }));

  // Create a new task object
  const task = new Task({
    Roll_No,
    branch,
    sem,
    degree,
    year,
    presem,
    sgpi,
    cgpi,
    bcourses: parsedBcourses,
    remarks,
    completed,
    files: fileBuffers,
    
  });

  console.log(req.files)

  // Store uploaded files in the task object
  // req.files.forEach((file) => {
  //   task.files.push({
  //     data: file.buffer,
  //     contentType: file.mimetype
  //   });
  // });

  // Save the task to the database
  await task.save()
    .then(() => {
      res.status(200).send({ "message": "Task created successfully" });
    })
    .catch((error) => {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    });
});






// router.post('/tasks',auth,async (req,res)=>{
    
//    const user=req.user
// const task=new Task(req.body)

// console.log(req.body.Roll_No)
//     try{
//         await task.save()
//        res.status(202).render('index')
    
//    }catch(e){
//        res.status(400).send('failed!')
//    }
// //    try {

// //     req.user.tokens = req.user.tokens.filter((token)=>{
// //       return token.token !== req.token
// //     })

// //     await req.user.save()
// //     res.status(202).render('index')
// //    // res.send()

// // } catch (error) {

// //   res.status(500).send({error})
  
// // }


// })

//to delete a particularid


//get all tasks

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', async (req, res) => {
 


    try {


      const match = {};
      const sort = {};
      match.sem=parseInt(req.query.sem)
      match.branch=req.query.branch
      match.degree=req.query.degree
  
      if (req.query.completed) {
        match.completed = req.query.completed === 'true';
       
      }
  
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        if (parts[0] === 'Roll_No') {
          sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
      }
  
      const limit = parseInt(req.query.limit) || 10;
      const skip = parseInt(req.query.skip) || 0;
  
      const tasks = await Task.find(match)
      .select('+Roll_No +branch +sem +degree +year +presem +sgpi +cgpi +files +bcourses +remarks +completed')
        .limit(limit)
        .skip(skip)
        .sort(sort);
        
        console.log(match)
        console.log(req.query)
        console.log(tasks)
  
      res.status(200).send(tasks);
    } catch (e) {
      res.status(500).send();
    }
  });
  

// get a particular task ussing id


router.get('/tasks/:id',async(req,res)=>{
    const _id=req.params.id

try{
    const task=await Task.findById(_id)
    if(!task){
        return res.status(404).send()
    }
    res.send(task)

}catch(e){
    res.status(500).send()
}
})

//update a task

router.patch('/tasks/:id',async (req,res)=>{
    console.log('update request came pos 1')
    console.log(req.body.completed)
    const updates=Object.keys(req.body)
    console.log(updates)
    const allowedUpdates=['remarks','completed']

    const isValid= updates.every((update)=> allowedUpdates.includes(update))
     console.log(isValid)
    if(!isValid){
       return  res.status(404).send({error:'invalid updates'})
    }
    console.log('update request came pos 2')

    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})

        if(!task){
           return  res.status(400).send()
        }

        res.send(task)

    }catch(e){
        res.status(500).send()

    }
})

//delete task
router.delete('/tasks/:id',async (req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id)
    if(!task){
        return res.status(404).send()
    }

    res.send(task)
})



module.exports =router