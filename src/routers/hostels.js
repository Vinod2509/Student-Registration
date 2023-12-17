const express = require('express');
const auth=require('../middleware/auth.js')
const Hostel = require('../models/hostels');
const router = express.Router();
const multer = require('multer');
 // Set the destination folder for uploaded filesconst mongoose = require('mongoose');



// Set up multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

// Handle POST requests to /documents
router.post('/hostel', auth,upload.single('file'), async (req, res) => {
  console.log(req.body)
  try {
    // Create a new document instance from the request body
    let roll=req.user.roll
    const hostel = new Hostel({
      roll,
      year: req.body.year,
      room:req.body.room,
      hostel_name:req.body.hostel_name,
      file: req.file ? req.file.buffer : null
    });
    // Save the document to the database
    await hostel.save();
    // Send a success response
    res.status(200).send('Document uploaded successfully');
  } catch (error) {
    console.error('Error uploading document:', error);
    // Send an error response
    res.status(500).send('Error uploading document');
  }
});














router.get('/:hostel_name/:year', async (req, res) => {
  try {
    const hostel_name = req.params.hostel;
    const year = parseInt(req.params.year);
    const hostel = await Hostel.find({ hostel_name: hostel_name, year: year });
    
    res.status(200).send({"status":"no error"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// router.post('/', auth,async (req, res) => {
//     const { hostel_name, roll=req.user.roll, room, year, files, verified='' } = req.body;

//     try {
//       const hostel = new Hostel({
//         hostel_name,
//         roll,
//         room,
//         year,
//         files,
//         verified
//       });
  
//       await hostel.save();
  
//       res.json(hostel);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

module.exports = router;
