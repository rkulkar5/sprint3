const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log('Login collection mongoose format - login.js model')
let  LoginSchema    = new Schema({
    username: {
        type: String, required:true
    },
    password : {
        type : String, required:true
    },
    quizNumber : {
        type : Number
    },

},{
    collection: 'login'
 });

module.exports=mongoose.model('login', LoginSchema)