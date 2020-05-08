import { Router, ActivatedRoute , NavigationExtras } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from './../../service/api.service';
import { TestConfigService } from './../../service/testconfig.service';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-test-instruction',
  templateUrl: './test-instruction.component.html',
  styleUrls: ['./test-instruction.component.css']
})
export class TestInstructionComponent implements OnInit {
  public browserRefresh: boolean;
  numOfQuestions;
  numOfMins;
  loading = false;
  submitted = false;
  status;
  example;
  username;
  quizNumber;
  jrss:any;

 constructor(
      public fb: FormBuilder,
      private router: Router,
      private apiService: ApiService,
      private testconfigService: TestConfigService,
      private ngZone: NgZone,

    ) {
      this.browserRefresh = browserRefresh;
      if (!this.browserRefresh) {
        this.username = this.router.getCurrentNavigation().extras.state.username;
        this.quizNumber = this.router.getCurrentNavigation().extras.state.quizNumber;
      }
      this.getCandidateJRSS();
    }
  
    ngOnInit(): void {
      this.browserRefresh = browserRefresh;
      if (this.browserRefresh) {
          if (window.confirm('Your account will be deactivated. You need to contact administrator to login again. Are you sure?')) {
            this.router.navigate(['/login-component']);
          }
      }
    }

    getCandidateJRSS() {
        console.log("this.username"+this.username);
        this.apiService.getCandidateJrss(this.username).subscribe(
            (res) => {
              this.jrss=res['JRSS'];
              this.testconfigService.findTestConfigByJRSS(this.jrss).subscribe(
                             (data) => {
                 this.numOfQuestions = data['noOfQuestions'],
                 this.numOfMins = data['testDuration']/60
              }, (error) => {
                  console.log(error);
              });
            }, (error) => {
              console.log(error);
          });
    }

    onSubmit() {
      this.submitted = true;
      console.log("Form Submitted!");
      // stop here if form is invalid
      this.loading = true;      
      this.status = "Inactive";  
	    // Update status column in Users table                     
      this.apiService.updateUsersStatus(this.username,this.status,this.username).subscribe(
      (res) => {
      console.log(this.username+'Status column updated successfully in Users table');
       }, (error) => {
      console.log("Error found while updating status column of Users table - " + error);
       });
      this.ngZone.run(() => this.router.navigateByUrl('/take-quiz',{state:{username:this.username,quizNumber:this.quizNumber}}));
       }
    }
