import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})

export class CandidateCreateComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile:any = ['Associate Developer', 'Senior Developer', 'Technical Lead', 'Associate Architect', 'Architect','Test Analyst','Test Manager', 'Project Manager']
  Band:any = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.readBand();
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      band: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.employeeForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  // Choose band with select dropdown
    updateBandProfile(e){
      this.employeeForm.get('band').setValue(e, {
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
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      this.apiService.createEmployee(this.employeeForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/candidates-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
