const express = require('express');
const app = express();
const quizRoute = express.Router();

// Results model
let Results = require('../models/Results');


// Save the user scored results  Results
quizRoute.route('/saveResult').post((req, res, next) => {
console.log("Inside the save results route", req.body);
  Results.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

module.exports = quizRoute;
