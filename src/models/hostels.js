const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  hostel_name: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  file: [{
    type: Buffer,
    required: true
  }],
  verified: {
    type: Boolean,
    
    default: false
  }
});
const Hostel=mongoose.model('Hostel', hostelSchema);
module.exports = Hostel;
