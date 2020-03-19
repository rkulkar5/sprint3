const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const UserAnswerSchema = new Schema({
   userName: {
      type: String
   },
   quizNumber : {
      type: Number
   },
   userAnswerID: {
      type: String
   },
   questionID: {
      type: Number
   },
   flagged: {
      type: Boolean
   }
},{
collection: 'userAnswer'}
);

const  UserAnswer = mongoose.model('UserAnswer', UserAnswerSchema);
module.exports = UserAnswer;