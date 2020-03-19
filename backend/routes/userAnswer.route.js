const express = require('express');
const app = express();
const quizRoute = express.Router();

// UserAnswer model
let UserAnswer = require('../models/UserAnswer');

// Add UserAnswer
quizRoute.route('/saveAns').post((req, res, next) => {
console.log("Inside the save anser service API");
  UserAnswer.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All UserAnswer
quizRoute.route('/:userName').get((req, res) => {
  UserAnswer.find({userName:req.params.userName},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).limit(5)
})

// Get single UserAnswer
quizRoute.route('/read/:rowNum').get((req, res) => {
  UserAnswer.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).skip(Number(req.params.rowNum-1)).limit(1);
  
})

/**
// Update UserAnswer
quizRoute.route('/update/:id').put((req, res, next) => {
  UserAnswer.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete UserAnswer
quizRoute.route('/delete/:id').delete((req, res, next) => {
  UserAnswer.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
**/
module.exports = quizRoute;