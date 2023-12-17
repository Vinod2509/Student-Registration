const express=require('express')
const Course=require('../models/courses')
const auth=require('../middleware/auth.js')
const router=new express.Router()

// Get course data by branch and semester
router.get('/ccourses', (req, res) => {
    const { branch, sem } = req.query;
  console.log("get course request came")
  console.log(req.query)
  
    Course.find({ 'courseDetails.branch': branch, 'courseDetails.sem':parseInt(sem) })
      .then((courses) => {
        console.log(courses)
        res.status(200).send(courses)})
      .catch((error) => {
        console.error(error);
        res.status(500).send('Failed to get course data');
      });
  });

  // Create a new course
router.post('/courses', async (req, res) => {
    const { thours, tcredits, courseDetails } = req.body;
     console.log(req.body)
     try {
      //const course=new Course(req.body);
      const newCourse = new Course({
        thours,
        tcredits,
        courseDetails: {
          branch: courseDetails.branch,
          sem: courseDetails.sem,
          courses: courseDetails.courses,
        },
      });
    
      await newCourse.save()
      console.log(';saved in db')
      res.status(201).send('Course added successfully')
      
     } catch (error) {

      console.error(error);
        res.status(500).send('Failed to add course');
      
     }

    })
      
        
      
 

  module.exports =router