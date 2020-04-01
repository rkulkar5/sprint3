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
  scorePercentage: string = '';
  
 username;
 quizNumber;
 mode;  
  
   constructor(
      private router: Router,
	  private quizService: QuizService
    ) {
	    this.username = this.router.getCurrentNavigation().extras.state.username;
      this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
      this.mode=this.router.getCurrentNavigation().extras.state.mode;
    }
	
	
  ngOnInit(): void {
    this.showResult();
  }
  
  
  
showResult() {
  
	this.quizService.getUserResults(this.username,this.quizNumber).subscribe(
		(res) => {
		  if(this.mode=='quiz'){
        this.mode='Sorry,You have run out of time'
      }
      else{
        this.mode="Congratulations,You have completed the technical assessment";
      }
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
    this.scorePercentage=(Math.round(this.numberOfCorrectAns * 100) / this.userAnswers.length).toFixed(2); 
    console.log("numberOfCorrectAns**** ",this.numberOfCorrectAns);
	  });					  
  }
}
