const express = require('express');
const app = express();
const bandRoute = express.Router();

// Band model
let Band = require('../models/Band');

// Add Band
bandRoute.route('/createBand').post((req, res, next) => {
  Band.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Band
bandRoute.route('/').get((req, res) => {
  Band.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single band
bandRoute.route('/readBand/:id').get((req, res) => {
  Band.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update band
bandRoute.route('/updateBand/:id').put((req, res, next) => {
  Band.findByIdAndUpdate(req.params.id, {
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

// Delete band
bandRoute.route('/deleteBand/:id').delete((req, res, next) => {
  Band.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = bandRoute;
