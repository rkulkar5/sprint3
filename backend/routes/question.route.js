const express = require('express');
const app = express();
const questionRoute = express.Router();

// Quiz model
let Quiz = require('../models/Quiz');

// Get All Quiz
questionRoute.route('/').get((req, res) => {
  Quiz.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single quiz
questionRoute.route('/readQuestion/:id').get((req, res) => {
  Quiz.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
module.exports = questionRoute;
