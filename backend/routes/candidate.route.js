const express = require('express');
const app = express();
const candidateRoute = express.Router();

// Candidate model
let Candidate = require('../models/Candidate');

// Add Candidate
candidateRoute.route('/create').post((req, res, next) => {
  Candidate.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Candidates
candidateRoute.route('/').get((req, res) => {
   Candidate.aggregate([
    {$lookup:
  		{   from: "users",
              localField: "username",
              foreignField: "username",
              as: "candidate_users"
      }
    }],(error,output) => {
      if (error) {
        return next(error)
      } else {
        res.json(output)
      }
    });
})

// Get single candidate
candidateRoute.route('/read/:id').get((req, res) => {
  Candidate.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update candidate
candidateRoute.route('/update/:id').put((req, res, next) => {
  Candidate.findByIdAndUpdate(req.params.id, {
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

// Delete candidate
candidateRoute.route('/delete/:candidateId').delete((req, res, next) => {
  Candidate.findOneAndRemove({_id : req.params.candidateId}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = candidateRoute;
