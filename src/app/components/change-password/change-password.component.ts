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
      console.log('all good')
      this.submitted = true;
      if (!this.changePasswordForm.valid) {
        console.log('did issue')
        return false;
     } else {
       
      this.apiService.updatepassword(this.username,this.changePasswordForm.value.password).subscribe(
           (res) => {
           console.log('User' +res+'successfully loggedin!')
           this.ngZone.run(() => this.router.navigateByUrl('/quizInstructions',{state:{username:res.username,quizNumber:res.quiznumber}}))
           }, (error) => {
             this.error='Invalid Credentials'
             console.log(error);

           });
      }
    }

}
