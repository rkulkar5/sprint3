const express = require('express');
const app = express();
const testConfigRoute = express.Router();

// Band model
let TestConfig = require('../models/TestConfig');

// Add Test Configuration
testConfigRoute.route('/createTestConfig').post((req, res, next) => {
  TestConfig.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Test Configuration
testConfigRoute.route('/').get((req, res) => {
  TestConfig.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Test Configuration
testConfigRoute.route('/readTestConfig/:id').get((req, res) => {
  TestConfig.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Test Configuration table based on JRSS
testConfigRoute.route('/findTestConfigByJRSS/:id').get((req, res,next) => {
  TestConfig.findOne({JRSS: req.params.id}, function(err,testConfig){
      if(err){
        console.log(err);
        return res.status(500).send('');
      }
      if(!testConfig){
        return res.status(404).send();
      }
      return res.json(testConfig);
    })
  });


// Update Test Configuration
testConfigRoute.route('/updateTestConfig/:id').put((req, res, next) => {
  TestConfig.findByIdAndUpdate(req.params.id, {
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



module.exports = testConfigRoute;
