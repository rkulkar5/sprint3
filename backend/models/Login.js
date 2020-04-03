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
    status : {
        type : String
    },
    accessLevel:{
        type : String
    },
    createdBy:{
        type : String
    },
    CreatedDate:{
        type : Date
    },
    UpdatedBy :{
        type : String
    },
    UpdatedDate:{
        type: Date
    },

    DateOfJoining:{
        type: Date
    }
},{
    collection: 'users'
 });

module.exports=mongoose.model('users', LoginSchema)