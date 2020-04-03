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
  User.findOne({username: req.params.id,DateOfJoining: new Date(req.params.doj)}, function(err,user){
    console.log('date here',req.params.doj)
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
  
module.exports = loginRoute;
