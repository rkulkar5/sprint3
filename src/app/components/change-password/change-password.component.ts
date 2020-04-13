import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute , NavigationExtras} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './../../service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loginMessage = false
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  username;
  quizNumber;
  error = '';
  private currentUserSubject: BehaviorSubject<ChangePasswordComponent>;
  public currentUser: Observable<ChangePasswordComponent>;
  mode = 'login';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private actRoute: ActivatedRoute,
      private apiService: ApiService,
      private ngZone: NgZone,   
      

  ) {    
      this.username = this.router.getCurrentNavigation().extras.state.username;      
  }

  ngOnInit() {
    this.loginMessage = true
      this.changePasswordForm = this.formBuilder.group({
          password: ['', Validators.required],
          confirmpassword: ['', Validators.required],
      });
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.changePasswordForm.controls; }
    get myForm() {
      return this.changePasswordForm.controls;
    }
    onSubmit() {      
      this.submitted = true;
      if (!this.changePasswordForm.valid) {        
        return false;
     } else {
       if(this.changePasswordForm.value.password==this.changePasswordForm.value.confirmpassword){
         let p=this.changePasswordForm.value.password              
          if (p.length < 8) {    
              return this.error="Your password must be at least 8 characters"; 
        }
        if (p.search(/[a-z]/i) < 0) {
            return this.error="Your password must contain at least one letter.";
        }
        if (p.search(/[0-9]/) < 0) {
            return this.error="Your password must contain at least one digit.";
        }        
        if(p.search(/^(?=.*[!@#$%^&*])/) < 0 ){
          return this.error="Your password should contain at least one special character"

        }
            this.apiService.updatepassword(this.username,this.changePasswordForm.value.password).subscribe(
           (res) => {           
           this.ngZone.run(() => this.router.navigateByUrl('/quizInstructions',{state:{username:res.username,quizNumber:res.quiznumber}}))
           }, (error) => {
             this.error='Invalid Username/DateOfJoining'
             console.log(error);

           });
      }
    else{this.error='password and confirm password doesn\'t match';}
  }}
}
