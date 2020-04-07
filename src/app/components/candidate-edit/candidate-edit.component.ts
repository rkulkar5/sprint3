import { Candidate } from './../../model/Candidate';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})

export class CandidateEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  candidateData: Candidate[];
  EmployeeProfile:any = ['Associate Developer', 'Senior Developer', 'Technical Lead', 'Associate Architect', 'Architect','Test Analyst','Test Manager', 'Project Manager']
  Band:any = [];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.readBand();
    this.updateCandidate();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCandidate(id);
    this.editForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
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
        email: data['username'],
        band: data['band'],
        JRSS: data['JRSS'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }

  updateCandidate() {
    this.editForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateCandidate(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/candidates-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
