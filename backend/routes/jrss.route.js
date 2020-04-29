const express = require('express');
const app = express();
const jrssRoute = express.Router();

// Jrss model
let JRSS = require('../models/Jrss');


// Get All Jrss
jrssRoute.route('/').get((req, res) => {
  JRSS.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
module.exports = jrssRoute;
