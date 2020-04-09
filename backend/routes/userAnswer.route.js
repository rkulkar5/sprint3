const express = require('express');
const app = express();
const quizRoute = express.Router();

// UserAnswer model
let UserAnswer = require('../models/UserAnswer');

// Add UserAnswer
quizRoute.route('/saveAns').post((req, res, next) => {
  UserAnswer.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Get All UserAnswer
quizRoute.route('/:userName').get((req, res) => {
  UserAnswer.find({userName:req.params.userName},(error, data)  => {
     if (error) {
       return next(error)
     } else {
      res.json(data)
      console.log('useranswer here',userAnswer,'data here',data)     
     }
  })
})


// Get Score of particular User
quizRoute.route('/getResults/:userName/:quizNum').get((req, res) => {
  UserAnswer.aggregate([
  {$match : { userName:req.params.userName, quizNumber:Number(req.params.quizNum)}},
  {$lookup: 
		{   from: "questionBank",
            localField: "questionID",
            foreignField: "questionID",
            as: "questionBank"
        }
  }, {    $unwind: '$questionBank'  },
  { $project: {userAnswerID:1,questionID:1, answerID:'$questionBank.answerID', _id:0} }
	],(error,output) => {
    if (error) {
      return next(error)
    } else {
      res.json(output)
    }
  });
})

// Get single UserAnswer
quizRoute.route('/read/:rowNum').get((req, res) => {
  UserAnswer.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).skip(Number(req.params.rowNum-1)).limit(1);
  
})

/**
// Update UserAnswer
quizRoute.route('/update/:id').put((req, res, next) => {
  UserAnswer.findByIdAndUpdate(req.params.id, {
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

// Delete UserAnswer
quizRoute.route('/delete/:id').delete((req, res, next) => {
  UserAnswer.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
**/
module.exports = quizRoute;
