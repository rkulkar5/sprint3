const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Quiz = new Schema({
   id: { type: Number },
   name: { type: String },
   description: { type: String },
   questions:[{
         id: Number, //or again, number
         name: String,
         questionTypeId: Number,
         options: [{id: Number, questionId: Number, name: String, isAnswer: Boolean}],
         questionType: [{id: Number, name: String, isActive: Boolean}]
         }],
}, {
   collection: 'quizes'
})

module.exports = mongoose.model('Quiz', Quiz)
