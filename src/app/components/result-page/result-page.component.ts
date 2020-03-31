import { Router } from '@angular/router';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Question } from './../../model/Questions';
import { QuizService } from './../../components/quiz/quiz.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  questions:any = [];
  totalNumberofQuestions: number = 0;
  correctQuestions: number = 0;
  userName ="";
  quizNumber =0;
  

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private quizService: QuizService) {
    this.userName = this.router.getCurrentNavigation().extras.state.username;
    this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
  }
  

  ngOnInit(): void {
    this.quizService.getQuizQuestions().subscribe(res => {
          this.questions = res;
          this.totalNumberofQuestions = this.questions.length;
    });

  var questionBank;
  this.quizService.getQuizQuestions().subscribe(
	(res) => {
		questionBank=res;
	}, (error) => {
	  console.log(error);
	});
	
 
  this.quizService.getUserAnswers(this.userName,this.quizNumber).subscribe(
	(res) => {
		  console.log('Quiz score goes herettttt!',questionBank);
		  //questionBank.forEach(function(element){console.log('element her',element)})
		  for(var i=0;i<questionBank.length;i++){			  
			  for(var answerData=0;answerData<res.length;answerData++){
				  if((questionBank[i]["questionID"]==res[answerData]["questionID"]) && (questionBank[i]["answerID"]==res[answerData]["userAnswerID"])){
					  this.correctQuestions++;		
				}
			  }
		  }
		  console.log("result goes here",this.correctQuestions)
		}, (error) => {
		  console.log(error);
		});

  }



}
