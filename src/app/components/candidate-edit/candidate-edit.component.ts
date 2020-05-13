import { Candidate } from './../../model/Candidate';
import { UserDetails } from './../../model/userDetails'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})

export class CandidateEditComponent implements OnInit {
  public browserRefresh: boolean;
  submitted = false;
  editForm: FormGroup;
  JRSS:any;
  Band:any = [];
  candidate : Candidate;
  user : UserDetails;
  username = "";
  changeEmail: Boolean;
  currDate: Date ;
  technologyStream:any= [];
  skillArray:any= []; 

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.browserRefresh = browserRefresh;
    if (!this.browserRefresh) {
        this.username = this.router.getCurrentNavigation().extras.state.username;
    }    
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    if (this.browserRefresh) {
        if (window.confirm('Your account will be deactivated. You need to contact administrator to login again. Are you sure?')) {
            this.router.navigate(['/login-component']);
        }
    }
    this.readBand();
    this.readJrss();
    this.updateCandidate();
    let can_id = this.actRoute.snapshot.paramMap.get('id');
    let user_id = this.actRoute.snapshot.paramMap.get('user_id');
    this.getCandidate(can_id);
    this.getUser(user_id);
    this.editForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      technologyStream:['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateOfJoining: ['', [Validators.required]]
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
    this.editForm.get('JRSS').setValue(e, {
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
        technologyStream: data['technologyStream'],
        phoneNumber: data['phoneNumber'],
        dateOfJoining : this.datePipe.transform(data['dateOfJoining'], 'yyyy-MM-dd')
      });

      // Get technologyStream from JRSS
      for (var jrss of this.JRSS){
        if(jrss.jrss == this.editForm.value.JRSS){
          this.technologyStream = [];
          for (var skill of jrss.technologyStream){
            this.technologyStream.push(skill);
          }
        }
      }


      this.candidate = new Candidate(data['employeeName'],
      data['email'], data['band'], data['JRSS'], data['technologyStream'], data[ 'phoneNumber'], data['dateOfJoining'],
      data['createdBy'], data['createdDate'], data['updatedBy'], data['updatedDate'],
      data['username'])
    });
  }

  getUser(id) {
    this.apiService.getUser(id).subscribe(data => {
      this.user = new UserDetails(
      data['username'],data['password'],data['quizNumber'],
      data['status'], data['acessLevel'],data['createdBy'],
      data['createdDate'],data['updatedBy'], data['updatedDate'], 
      data['DateOfJoining'],data['userLoggedin'])
    });
  }

  updateCandidate() {
    this.editForm = this.fb.group({
      employeeName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,3}$')]],
      band: ['', [Validators.required]],
      JRSS: ['', [Validators.required]],
      technologyStream: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      dateOfJoining: ['', [Validators.required]]
    })
  }
 
  canExit(): boolean{
    if (this.editForm.dirty && !this.submitted){
      if(window.confirm("You have unsaved data in the Update Candidate form. Please confirm if you still want to proceed to new page")){
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
    let updatedCandidate = new Candidate(this.editForm.value.employeeName,
      this.editForm.value.email,
      this.editForm.value.band,
      this.editForm.value.JRSS,
      this.editForm.value.technologyStream,
      this.editForm.value.phoneNumber,
      this.editForm.value.dateOfJoining,
      this.candidate.createdBy,
      this.candidate.createdDate,
      this.username,
      new Date(),
      this.editForm.value.email
      );
      let updatedUser = new UserDetails(this.editForm.value.email,
        this.user.password,
        this.user.quizNumber,
        this.user.status,
        this.user.accessLevel,
        this.user.createdBy,
        this.user.CreatedDate,
        this.username,
        new Date(),
        this.editForm.value.dateOfJoining,
        this.user.userLoggedin
        );

        let formDate = new Date(this.editForm.value.dateOfJoining)
        this.currDate = new Date();

        if (!this.editForm.valid) {
          return false;
        } else {
          if ( formDate > this.currDate) {
            window.confirm("Date Of Joining is a future date. Please verify.")
           } else {       
          this.apiService.findUniqueUsername(this.editForm.value.email).subscribe(
            (res) => {
              console.log('res.count inside response ' + res.count)
              if (res.count > 0 && (this.editForm.value.email != this.candidate.email))
                {
                  window.confirm("Please use another Email ID");
                } 
                else 
                {
                if ((res.count > 0 || res.count == 0) && ((this.editForm.value.email != this.candidate.email) || (this.editForm.value.email == this.candidate.email)))
                {
                  if (window.confirm('Are you sure?')) {
                  let can_id = this.actRoute.snapshot.paramMap.get('id');
                  let user_id = this.actRoute.snapshot.paramMap.get('user_id');
                  this.apiService.updateUserDetails(user_id, updatedUser).subscribe(res => {
                    console.log('User Details updated successfully!');
                    }, (error) => {
                    console.log(error);
                    })  
                  this.apiService.updateCandidate(can_id, updatedCandidate).subscribe(res => {
                    this.router.navigateByUrl('/candidates-list', {state:{username:this.username}});
                    console.log('Candidate Details updated successfully!');
                    }, (error) => {
                    console.log(error);
                    })
                   }
                  }
                }
            }, (error) => {
              console.log(error);
          })
        }
        }
  }

}
