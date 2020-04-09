const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const ResultsSchema = new Schema({
   userName: {
      type: String
   },
   userScore: {
      type: Number
   },
   quizNumber : {
      type: Number
   },
   createdDate: {
      type: Date
   }
},{
collection: 'results'}
);

const  Results = mongoose.model('Results', ResultsSchema);
module.exports = Results;