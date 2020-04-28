const express = require('express');
const app = express();
const skillRoute = express.Router();

// Jrss model
let Skill = require('../models/skill');


// Get All Jrss
skillRoute.route('/').get((req, res) => {
  Skill.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
module.exports = skillRoute;
