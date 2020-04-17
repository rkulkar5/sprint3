import { Component, OnInit } from '@angular/core';
import { Question } from './../../model/Questions';
import { QuizService } from './../../components/quiz/quiz.service';
import { UserResult } from './../../model/userResult';
import { ApiService } from './../../service/api.service';

import { ResultPageService } from './../../components/result-page/result-page.service';



import { Router, ActivatedRoute , NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  userAnswers:any = [];
  displayMsg: string = '';
  numberOfCorrectAns: number = 0;
  scorePercentage: string = '';
  
   status = "";
  
 username;
 quizNumber;
 mode;  
  
   constructor(
      private router: Router,
	  private quizService: QuizService,
	  private resultPageService: ResultPageService,
	  private apiService: ApiService
    ) {
	    this.username = this.router.getCurrentNavigation().extras.state.username;
      this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
      this.mode=this.router.getCurrentNavigation().extras.state.mode;
    }
	
	
  ngOnInit(): void {
    this.showResult();
  }
  
  
  
showResult() {
	// Sprint-2 Deactivating the candidate after the quiz
	    this.status = "Inactive";  
          // Update status column in Users table                     
          this.apiService.updateUsersStatus(this.username,this.status,this.username).subscribe(
            (res) => {
              console.log('Status column updated successfully in Users table');                 
            }, (error) => {                
             console.log("Error found while updating status column of Users table - " + error);
             });
			 	
  
	this.quizService.getUserResults(this.username,this.quizNumber).subscribe(
		(res) => {
		  if(this.mode=='quiz'){
        this.mode='Sorry,You have run out of time.<br>'
      }
      else{
        this.mode="";
      }
		  console.log("res***** ", res);
		  this.userAnswers= res;	  				
		  this.userAnswers.forEach((userAns) => {
		  console.log("userAns.userAnswerID ",userAns.userAnswerID, "  userAns.answerID ", userAns.answerID);
			 if(userAns.userAnswerID == userAns.answerID ){
			    this.numberOfCorrectAns = this.numberOfCorrectAns + 1;
			 }
		}, (error) => {
		  console.log(error);
    });			
    this.scorePercentage=(Math.round(this.numberOfCorrectAns * 100) / this.userAnswers.length).toFixed(2); 
    this.numberOfCorrectAns=Math.round(this.numberOfCorrectAns * 100) / this.userAnswers.length; 
    if(this.numberOfCorrectAns>80){
      this.displayMsg="Congratulations,you have passed the technical assessment."
    }else{
      this.displayMsg="Unfortunately, you didn't meet the selection criteria."
    }
    
	
	 //Sprint2: Save the quiz results for the user into 'Results' collection
	    let userResult = new UserResult(this.username,Number(this.scorePercentage), this.quizNumber);
		let data = JSON.stringify( userResult );
	  	 this.resultPageService.saveResult(data).subscribe(
        (res) => {
          console.log('Quiz results for the user have been successfully saved!');    
		       }, (error) => {
          console.log(error);
        });	
	
  });	
	  
  }
}
