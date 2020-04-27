const express = require('express');
const app = express();
const loginRoute = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
const message ='valid credentials';
let User = require('../models/Login');


// Get All Band
loginRoute.route('/').get((req, res,next) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

loginRoute.route('/readUser/:id/:pwd').get((req, res,next) => {
  User.findOne({username: req.params.id,password: req.params.pwd}, function(err,user){
      if(err){
        console.log(err);
        return res.status(500).send('');
      }
      if(!user){
        return res.status(404).send();
      }
      return res.json(user);
    })
  });

  
loginRoute.route('/getUserDOJ/:id/:doj').get((req, res,next) => {
  var Dateof=new Date(req.params.doj);
  Dateof=Dateof.toISOString.toString;
  User.findOne({username: req.params.id,DateOfJoining: new Date(req.params.doj)}, function(err,user){
      if(err){
        console.log(err);
        return res.status(500).send('');
      }
      if(!user){
        return res.status(404).send();
      }
      return res.json(user);
    })
  });

  // Update employee
loginRoute.route('/updatepassword/:id/:pwd').put((req, res, next) => { 
  User.updateOne({username:req.params.id},{$set:{password:req.params.pwd}}, { upsert: true }
  , (error, data) => {
    if (error) {
      return next(error);
      console.log('Issue in change password',error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Get Users table records based on username
loginRoute.route('/getUser/:id').get((req, res,next) => {
  User.findOne({username: req.params.id}, function(err,user){
      if(err){
        console.log(err);
        return res.status(500).send('');
      }
      if(!user){
        return res.status(404).send();
      }
      return res.json(user);
    })
  });

// Update Users table status,quizNumber,UpdatedBy and UpdatedDate columns based on candidate table username
loginRoute.route('/updateUserStatusAndQuizNum/:id/:quiznum/:status/:uname').put((req, res, next) => {      
  User.updateMany({username:req.params.id},{$set:{quizNumber:req.params.quiznum,status:req.params.status,UpdatedBy:req.params.uname,UpdatedDate:new Date()}}
        , (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.json(data)
            console.log('User table updated successfully for status and quizNumber')
          }
        })
      })

// Update Users table status,UpdatedBy and UpdatedDate columns based on candidate table username  
loginRoute.route('/updateUserStatus/:id/:status/:uname').put((req, res, next) => {      
  User.updateMany({username:req.params.id},{$set:{status:req.params.status,UpdatedBy:req.params.uname,UpdatedDate:new Date()}}
      , (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data)
          console.log('User table updated successfully for status');
        }
      })
    })


    // Update the user logged in status in Users table for a given username
loginRoute.route('/:username/:userloggedin').put((req, res, next) => {     
  User.updateOne({username:req.params.username},{$set:{userLoggedin:req.params.userloggedin}}
      , (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data)
          console.log('User table updated successfully for userLoggedin status');
        }
      })
    })
  
module.exports = loginRoute;
