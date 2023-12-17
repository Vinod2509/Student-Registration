const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  thours: {
    type: Number,
    required: true
  },
  tcredits: {
    type: Number,
    required: true
  },
  courseDetails: {
    branch: {
      type: String,
      required: true
    },
    sem: {
      type: Number,
      required: true
    },
    courses: [{
      ccode: {
        type: String,
        required: true
      },
      cname: {
        type: String,
        required: true
      },
      credits: {
        type: Number,
        required: true
      },
      hours: {
        type: Number,
        required: true
      }
    }]
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
