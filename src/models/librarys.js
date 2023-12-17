const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  roll: {
    type:String,
    required: true
  },
  file: {
    type:Buffer,
  },
  year:{
    type:Number
  },
  verified: {
    type: Boolean,
    default: false
  }
});
const Library=mongoose.model('Document', librarySchema);

module.exports = Library;
