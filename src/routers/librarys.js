const express = require('express');

const auth=require('../middleware/auth.js');
const router = express.Router();

const Library = require('../models/librarys');


//const express = require('express');
const multer = require('multer');

const app = express();

// Set up multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

// Handle POST requests to /documents
router.post('/lib', auth,upload.single('file'), async (req, res) => {
  try {
    // Create a new document instance from the request body
    console.log(req.body)
    console.log(req.file)
    
    let roll=req.user.roll
    const library = new Library({
      roll,
      year: req.body.year,
      file: req.file ? req.file.buffer : null
    });
    // Save the document to the database
    await library.save();
    // Send a success response
    res.status(200).send('Document uploaded successfully');
  } catch (error) {
    console.error('Error uploading document:', error);
    // Send an error response
    res.status(500).send('Error uploading document');
  }
});

// Start the server



router.get('/lib/:year', async (req, res) => {
  console.log('lib get request')
  try {
    const year = parseInt(req.params.year);
    const library = await Library.find({ year: year });
    
    res.status(200).send({"status":"no error"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/upload',auth,upload.single('upload'),async(req,re)=>{
  res.send()
})
// router.post('/lib',auth,upload.single('file'), async (req, res) => {
//   console.log('lib post request')
  
//       console.log(req.body)
     
//     const roll=req.user.roll;
//     const file=req.file;
//     const year  = req.body.year;
  
//       try {

//         let object
//         if(file){
//           object={roll,file,year}

//         }else{
//           object={roll,year}

//         }
//         console.log(object)
//         const library=new Library(object);
//         await library.save()
//         console.log('db acceppted')
//         res.status(200).send({"status":"successfull"})
//         console.log(library)
        
//       } catch (error) {

//         console.error(err.message);
//       res.status(500).send('Server Error');
        
//       }
        
//   });

module.exports = router;
