import { Router } from '@angular/router';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Question } from './../../model/Questions';
import { UserAnswer } from './../../model/UserAnswer';
import { QuizService } from './../../components/quiz/quiz.service';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

 constructor(
      private router: Router,
      private ngZone: NgZone,
<<<<<<< HEAD
    private quizService: QuizService,
   
=======
	    private quizService: QuizService
>>>>>>> d7ba23d9ca567b69065625271e2c3a136c786c9c
    ) {}

 index =  0;
 size = 1;
 count = 1;
	test:string="";
	userAnswerID = "";
	userName ="";
	quizNumber =0;
	questionID = 0;
	flagged = false;
	array:any=[];
	
	quizForm: FormGroup;
	disableBackButton:boolean=false;
	disableNextButton:boolean=true;

  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  configDuration = 120;
  questions:any = [];
  mode = 'quiz';
  diff: number = 0;
  remainingTime = '00:00';

ngOnInit() {
  // this.questions = this.quizService.getAll();
  this.loadQuestions();
  this.startTime = new Date();
  this.ellapsedTime = '00:00';
  this.timer = setInterval(() => { if ( this.ellapsedTime !== this.duration) {this.tick()}; }, 1000);
  this.duration = this.parseTime(this.configDuration);
  this.mode = 'quiz';
	this.quizForm = new FormGroup({
	optionSelected : new FormControl()
  })
  }

 tick() {
     const now = new Date();
     this.diff = (now.getTime() - this.startTime.getTime()) / 1000;
     if (this.diff >= this.configDuration) {
       //Auto Submit
     }
     this.ellapsedTime = this.parseTime(this.diff);
     this.remainingTime = this.parseTime(this.configDuration - this.diff);

   }

   parseTime(totalSeconds: number) {
     let mins: string | number = Math.floor(totalSeconds / 60);
     let secs: string | number = Math.round(totalSeconds % 60);
     mins = (mins < 10 ? '0' : '') + mins;
     secs = (secs < 10 ? '0' : '') + secs;
     return `${mins}:${secs}`;
   }

  loadQuestions() {
    this.quizService.getQuizQuestions().subscribe(res => {
      this.questions = res;
        
    });
	 
    this.questions.forEach((question) => { 
		question.options.forEach((option) => { option.checked = ""; });

	  });
  } //end of loadQuestion()

  isAnswered(question: Question) {
      return question.options.find(option => option.checked) ? 'Answered' : 'Not Answered';
    };
  
   get questionOneByeOne() {
    return (this.questions) ?
      this.questions.slice(this.index, this.index + this.count) : [];
  }
  
  goTo(index: number) {
      if (index >= 0 && index < this.size) {
        this.index = index;
        this.mode = 'quiz';
      }
    }
  
  moveQuestion(index, size) {
    this.index = index;
	this.size=size
	console.log("this.size"+ this.size);
	this.disableBackButton=false;
	this.disableNextButton=true
	if (this.index >= 1) {
		this.disableBackButton=true;
	} 
	
	if (this.index >= this.size-1) {
		this.disableNextButton=false;
	} 
  }

  
  
  moveBack(index) {
    this.index = index;
  }

  moveNext(index) {
    this.index = index;
		console.log("quizForm.optionSelected",this.quizForm.value );
  }

  
    onSelect(question: Question, selectedOption: Number, checked) {
		if (question.questionType === "MultiSelect") {
			//console.log("checked *** ", question.options[2].option.checked);
			  question.options.forEach((i) => { 
				  if (i.optionID === selectedOption && checked === true) {i.checked = "checked";
				  }  
				  if (i.optionID === selectedOption && checked === false) {i.checked = "Unchecked";
				  }  
			  });
		  }
		  
		  	if (question.questionType === "SingleSelect") {
			//console.log("checked *** ", question.options[2].option.checked);
			  question.options.forEach((i) => { 
				  if (i.optionID === selectedOption && checked === true) {i.checked = "checked";
				  }  else {i.checked = "";}
			  });
		  }
   }

  submitAnswers(warning: boolean) {
  let userAnswer = new UserAnswer(null,null,null,null,null);
  this.userName="Rajesh";
  this.quizNumber = 1;
  this.questions.forEach((question) => {
  this.flagged = false;
	this.questionID = question.questionID;
	this.userAnswerID ="";

	question.options.forEach((option) => {
	if (option.checked === "checked")  {
		this.userAnswerID = this.userAnswerID +","+option.optionID;
		}
	})

	this.array = this.userAnswerID.split(',')
<<<<<<< HEAD
	
=======

>>>>>>> d7ba23d9ca567b69065625271e2c3a136c786c9c
	this.userAnswerID = (this.userAnswerID.length && this.userAnswerID[0] == ',') ? this.userAnswerID.slice(1) : this.userAnswerID;
	userAnswer.userAnswerID = this.userAnswerID ;
  userAnswer = new UserAnswer(this.userName,this.quizNumber, this.questionID, this.userAnswerID, this.flagged );
	let data = JSON.stringify( userAnswer );
		 this.quizService.saveAnswer(data).subscribe(
        (res) => {
          console.log('Answer successfully saved!');
		      if(this.diff < this.configDuration && warning) {
		        this.mode = 'quiz';
		      } else {
            this.ngZone.run(() => this.router.navigateByUrl('/result-page'))
          } }, (error) => {
          console.log(error);
        });

  });
   
  }


}
