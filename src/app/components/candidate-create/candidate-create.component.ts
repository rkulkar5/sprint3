import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Candidate } from './../../model/Candidate';
import { UserDetails } from './../../model/userDetails';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})

export class CandidateCreateComponent implements OnInit {
  submitted = false;
  candidateForm: FormGroup;
  EmployeeProfile:any = ['Associate Developer', 'Senior Developer', 'Technical Lead', 'Associate Architect', 'Architect','Test Analyst','Test Manager', 'Project Manager']
  Band:any = [];
  quizNumber: number;
  userName: String = "";
  password: String = "";
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.userName = "admin";
    this.password = "welcome@123";
    this.quizNumber = 1;
    this.readBand();
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.candidateForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateOfJoining: ['', Validators. required]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.candidateForm.get('JRSS').setValue(e, {
      onlySelf: true
    })
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

  onSubmit() {
    this.submitted = true;
    let candidate = new Candidate(this.candidateForm.value.employeeName,
    this.candidateForm.value.email,
    this.candidateForm.value.band,
    this.candidateForm.value.JRSS,
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
     "active",
     "user",
     this.userName,
     new Date(),
     this.userName,
     new Date(),
     this.candidateForm.value.dateOfJoining
     );
    if (!this.candidateForm.valid) {
      return false;
    } else {
      this.apiService.createUserDetails(user).subscribe(
        (res) => {
          console.log('User successfully created!')
        }, (error) => {
          console.log(error);
        });
      this.apiService.createCandidate(candidate).subscribe(
        (res) => {
          console.log('Candidate successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/candidates-list'))
        }, (error) => {
          console.log(error);
        });
        
    }
  }

}
