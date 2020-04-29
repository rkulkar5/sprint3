const express = require('express');
const app = express();
const jrssRoute = express.Router();

// Jrss model
let JRSS = require('../models/jrss');


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
