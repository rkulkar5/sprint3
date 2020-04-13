const express = require('express');
const app = express();
const candidateRoute = express.Router();

// Candidate model
let Candidate = require('../models/Candidate');
//User Model
let User = require('../models/Login');

// Add Candidate
candidateRoute.route('/create').post((req, res, next) => {
  console.log("in the create Candidate API");
  Candidate.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Add Candidate
candidateRoute.route('/createUser').post((req, res, next) => {
  console.log("in the create User API");
  User.create(req.body, (error, data) => {
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
    },
    {$sort:
      {
        'updatedDate': -1
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

// Delete candidate and user record
candidateRoute.route('/delete/:candidateId/:username').delete((req, res, next) => {
  Candidate.findOneAndRemove({_id : req.params.candidateId}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      User.findOneAndRemove({username: req.params.username}, function(err,user){
            if(err){
              console.log(err);
              return res.status(500).send('');
            }
            if(!user){
              return res.status(404).send();
            }
      })
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = candidateRoute;
