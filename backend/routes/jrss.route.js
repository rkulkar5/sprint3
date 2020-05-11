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



// Add jrss
jrssRoute.route('/createJrss').post((req, res, next) => {
  JRSS.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Delete jrss
jrssRoute.route('/deleteJrss/:id').delete((req, res, next) => {
  //console.log('req.params.id=== '+req.params.id);
  JRSS.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = jrssRoute;
