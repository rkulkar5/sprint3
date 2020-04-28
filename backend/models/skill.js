const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Skill = new Schema({
   skill: {
         type: String
   }
}, {
   collection: 'skill'
})

module.exports = mongoose.model('Skill', Skill)
