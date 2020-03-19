const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
   optionID: {
      type: Number
   },
   option: {
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
      type: Number
   },
   options: [OptionSchema]
	
},{
collection: 'questionBank'});



const  QuestionBank = mongoose.model('questionBank', QuestionBankSchema);
module.exports = QuestionBank;