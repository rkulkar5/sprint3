const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let TestConfig = new Schema({
   JRSS: {
         type: String
   },
   noOfQuestions: {
         type: Number
   },
   testDuration: {
         type: Number
   }
}, {
   collection: 'testConfig'
})

module.exports = mongoose.model('testConfig', TestConfig)
