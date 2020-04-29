const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let JRSS = new Schema({
   jrss: {
         type: String
   }
}, {
   collection: 'jrss'
})

module.exports = mongoose.model('jrss', JRSS)
