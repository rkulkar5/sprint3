const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const QuestionBankSchema = new Schema({
   questionID: {
      type: Number
   },
   question: {
      type: String
   },
   jrss: {
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
   options: [{
      optionID:Number,option:String},
      {optionID:Number,option:String},
      {optionID:Number,option:String},
      {optionID:Number,option:String},
   ]

	
},{
collection: 'questionBank'});



const  QuestionBank = mongoose.model('questionBank', QuestionBankSchema);
module.exports = QuestionBank;