import { Component, OnInit } from '@angular/core';
import { Question } from './../../model/Questions';
import { QuizService } from './../../components/quiz/quiz.service';

import { Router, ActivatedRoute , NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  userAnswers:any = [];
  totalNumberofQuestions: number = 0;
  numberOfCorrectAns: number = 0;
  numberOfIncorrectAns: number = 0;
  
 username;
 quizNumber;  
  
   constructor(
      private router: Router,
	  private quizService: QuizService
    ) {
	    this.username = this.router.getCurrentNavigation().extras.state.username;
      this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
    }
	
	
  ngOnInit(): void {
    this.showResult();
  }
  
  
  
showResult() {
  
	this.quizService.getUserResults(this.username,this.quizNumber).subscribe(
		(res) => {
		  
		  console.log("res***** ", res);
		  this.userAnswers= res;
		  this.totalNumberofQuestions = this.userAnswers.length;		  				
		  this.userAnswers.forEach((userAns) => {
		  console.log("userAns.userAnswerID ",userAns.userAnswerID, "  userAns.answerID ", userAns.answerID);
			 if(userAns.userAnswerID == userAns.answerID ){
			    this.numberOfCorrectAns = this.numberOfCorrectAns + 1;
			 }
		}, (error) => {
		  console.log(error);
		});			 
    console.log("numberOfCorrectAns**** ",this.numberOfCorrectAns);
	  });					  
  }
}
