const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
   option1: {
      type: String
   },
   option2: {
      type: String
   },
   option3: {
      type: String
   },
   option4: {
      type: String
   }   
});

// Define collection and schema
const QuestionBankSchema = new Schema({
   questionID: {
      type: Number
   },
   question: {
      type: String
   },
   skill: {
         type: String
   },
   questionType: {
      type: String
   },
   answerID: {
      type: String
   },
   options: [OptionSchema]
	
},{
collection: 'questionBank'});



const  QuestionBank = mongoose.model('questionBank', QuestionBankSchema);
module.exports = QuestionBank;