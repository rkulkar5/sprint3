import { Candidate } from './../../model/Candidate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})

export class CandidateEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  EmployeeProfile:any = ['Associate Developer', 'Senior Developer', 'Technical Lead', 'Associate Architect', 'Architect','Test Analyst','Test Manager', 'Project Manager']
  Band:any = [];
  candidate : Candidate;
  //adminUsername : String = "";
  username = "";

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {this.username = this.router.getCurrentNavigation().extras.state.username;}

  ngOnInit() {

    this.readBand();
    this.updateCandidate();
    let id = this.actRoute.snapshot.paramMap.get('id');
    //this.adminUsername = this.actRoute.snapshot.paramMap.get('adminUsername');
    this.getCandidate(id);
    this.editForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateOfJoining: ['', [Validators.required]]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('JRSS').setValue(e, {
      onlySelf: true
    })
  }

  // Choose options with select-dropdown
    updateBandProfile(e) {
      this.editForm.get('band').setValue(e, {
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
  get myForm() {
    return this.editForm.controls;
  }

  getCandidate(id) {
    this.apiService.getCandidate(id).subscribe(data => {
      this.editForm.setValue({
        employeeName: data['employeeName'],
        email: data['email'],
        band: data['band'],
        JRSS: data['JRSS'],
        phoneNumber: data['phoneNumber'],
        dateOfJoining : this.datePipe.transform(data['dateOfJoining'], 'yyyy-MM-dd')
      });
      this.candidate = new Candidate(data['employeeName'],
      data['email'], data['band'], data['JRSS'], data[ 'phoneNumber'], data['dateOfJoining'],
      data['createdBy'], data['createdDate'], data['updatedBy'], data['updatedDate'],
      data['username'])
    });
  }

  updateCandidate() {
    this.editForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateOfJoining: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    let updatedCandidate = new Candidate(this.editForm.value.employeeName,
      this.editForm.value.email,
      this.editForm.value.band,
      this.editForm.value.JRSS,
      this.editForm.value.phoneNumber,
      this.editForm.value.dateOfJoining,
      this.candidate.createdBy,
      this.candidate.createdDate,
      this.candidate.updatedBy,
      //this.adminUsername,
      new Date(),
      this.editForm.value.email
      );
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateCandidate(id, updatedCandidate)
          .subscribe(res => {
            this.router.navigateByUrl('/candidates-list',{state:{username:this.username}});
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })  
      }
    }
  }

}
