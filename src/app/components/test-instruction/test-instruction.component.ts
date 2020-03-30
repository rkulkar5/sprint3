import { Router, ActivatedRoute , NavigationExtras } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserAnswer } from 'src/app/model/UserAnswer';

@Component({
  selector: 'app-test-instruction',
  templateUrl: './test-instruction.component.html',
  styleUrls: ['./test-instruction.component.css']
})
export class TestInstructionComponent implements OnInit {
  numOfQuestions;
  numOfMins;
  loading = false;
  submitted = false;
  example;
  username;
  quizNumber;
 constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,

    ) {
      this.numOfQuestions = 30;
      this.numOfMins = 60;
      this.username = this.router.getCurrentNavigation().extras.state.username;
      this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
    }

  
  
  
    ngOnInit(): void {
    }
    onSubmit() {
      this.submitted = true;
     
      console.log("Form Submitted!");
      // stop here if form is invalid
      this.loading = true;
      this.ngZone.run(() => this.router.navigateByUrl('/take-quiz',{state:{username:this.username,quizNumber:this.quizNumber}}));
                     //this.router.navigateByUrl('/take-quiz');
                
      }

 
 
}
