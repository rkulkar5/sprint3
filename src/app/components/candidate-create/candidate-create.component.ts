import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Candidate } from './../../model/Candidate';
import { UserDetails } from './../../model/userDetails';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { appConfig } from './../../model/appConfig';
import { browserRefresh } from '../../app.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})

export class CandidateCreateComponent implements OnInit {
  public browserRefresh: boolean;
  submitted = false;
  candidateForm: FormGroup;
  JRSS:any = []
  Band:any = [];
  quizNumber: number;
  userName: String = "admin";
  password: String = "";
  currDate: Date ;
  technologyStream:any= [];
  skillArray:any= [];  

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.browserRefresh = browserRefresh;
    if (!this.browserRefresh) {
      this.userName = this.router.getCurrentNavigation().extras.state.username;
    }
    this.password = appConfig.defaultPassword;
    this.quizNumber = 1;
    this.readBand();
    this.mainForm();
    this.readJrss();    
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    if (this.browserRefresh) {
        if (window.confirm('Your account will be deactivated. You need to contact administrator to login again. Are you sure?')) {
           this.router.navigate(['/login-component']);
        }
    }
  }

  mainForm() {
    this.candidateForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      technologyStream:['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateOfJoining: ['', Validators. required]
    })
  }
 // Get all Jrss
 readJrss(){
  this.apiService.getJRSS().subscribe((data) => {
  this.JRSS = data;
  })
}
  // Choose designation with select dropdown
  updateJrssProfile(e){
    this.candidateForm.get('JRSS').setValue(e, {
      onlySelf: true
    })
    // Get technologyStream from JRSS
    for (var jrss of this.JRSS){          
      if(jrss.jrss == e){   
        this.technologyStream = [];
        for (var skill of jrss.technologyStream){          
          this.technologyStream.push(skill);          
        } 
      }
    }    
  } 

  // Choose band with select dropdown
    updateBandProfile(e){
      this.candidateForm.get('band').setValue(e, {
      onlySelf: true
      })
    }

    // Get all Bands
    readBand(){
       this.apiService.getBands().subscribe((data) => {
       this.Band = data;
       })
    }

  // Getter to access form control
  get myForm(){
    return this.candidateForm.controls;
  }

  canExit(): boolean{
    if (this.candidateForm.dirty && !this.submitted){
      if(window.confirm("You have unsaved data in the Create Candidate form. Please confirm if you still want to proceed to new page")){
        return true;
      } else {
      return false;
      }
    } else {
      return true;
    }
  }

  onSubmit() {
    this.submitted = true; 
    // Encrypt the password
    var base64Key = CryptoJS.enc.Base64.parse("2b7e151628aed2a6abf7158809cf4f3c");
    var ivMode = CryptoJS.enc.Base64.parse("3ad77bb40d7a3660a89ecaf32466ef97");
    this.password = CryptoJS.AES.encrypt(appConfig.defaultPassword.trim(),base64Key,{ iv: ivMode }).toString();
    this.password = this.password.replace("/","=rk=");    
     
    // Technology Stream
    this.skillArray = [];
    for (var stream of this.candidateForm.value.technologyStream)  {        
      if(this.skillArray.indexOf(stream.value == -1)){
          this.skillArray.push(stream.value);  
      }     
    }
    this.candidateForm.value.technologyStream = this.skillArray.join(',');     

    let candidate = new Candidate(this.candidateForm.value.employeeName,
    this.candidateForm.value.email,
    this.candidateForm.value.band,
    this.candidateForm.value.JRSS,
    this.candidateForm.value.technologyStream,
    this.candidateForm.value.phoneNumber,
    this.candidateForm.value.dateOfJoining,
    this.userName,
    new Date(),
    this.userName,
    new Date(),
    this.candidateForm.value.email
    );
    let user = new UserDetails(this.candidateForm.value.email,
     this.password,
     this.quizNumber,
     "Active",
     "user",
     this.userName,
     new Date(),
     this.userName,
     new Date(),
     this.candidateForm.value.dateOfJoining,
     "false"
     );

     let formDate = new Date(this.candidateForm.value.dateOfJoining)
     this.currDate = new Date();
     
    if (!this.candidateForm.valid) {
      return false;
    } else {
      if ( formDate > this.currDate) {
        window.confirm("Date Of Joining is a future date. Please verify.")
       } else {
        console.log("in candidate-create.ts");
        this.apiService.findUniqueUsername(this.candidateForm.value.email).subscribe(
          (res) => {
            console.log('res.count inside response ' + res.count)
           if (res.count > 0)
           {
              console.log('res.count inside if ' + res.count)
              window.confirm("Please use another Email ID");
            } 
            else 
            {
            if (res.count == 0)
            { this.apiService.createUserDetails(user).subscribe(
              (res) => {
                          console.log('User successfully created!')
                       }, (error) => {
                          console.log(error);
                       });
              this.apiService.createCandidate(candidate).subscribe(
              (res) => {
                          console.log('Candidate successfully created!')
                          this.ngZone.run(() => this.router.navigateByUrl('/candidates-list',{state:{username:this.userName}}))
                        }, (error) => {
                          console.log(error);
                        })
            }}        
          }, (error) => {
      console.log(error);
    }
  )
  }
  }
}
}
