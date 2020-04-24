import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute , NavigationExtras} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './../../service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginMessage = false
    loginForm: FormGroup;
    forgotPasswordForm: FormGroup;
    loading = false;
    submitted = false;
    forgotSubmitted = false;
    returnUrl: string;
    error = '';
    private currentUserSubject: BehaviorSubject<LoginComponent>;
    public currentUser: Observable<LoginComponent>;
    mode = 'login';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private actRoute: ActivatedRoute,
        private http: HttpClient,
        private apiService: ApiService,
        private ngZone: NgZone,
        

    ) {
      
        this.currentUserSubject = new BehaviorSubject<LoginComponent>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']
        //     );
        // }
    }

    ngOnInit() {
      this.loginMessage = true
        let id  = this.actRoute.snapshot.paramMap.get('id');
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.forgotPasswordForm = this.formBuilder.group({          
          username: ['', Validators.required],
          Dateofjoining: ['', Validators.required],
      });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // // convenience getter for easy access to form fields
      get f1() { return this.loginForm.controls; }


    get forgotPwd() {       
      return this.forgotPasswordForm.controls;}

      forgotPassword(){        
        this.mode='forgotPassword'
      }
      onforgotPasswordSubmit(){        
        this.forgotSubmitted=true;
        if (!this.forgotPasswordForm.valid) { return false;  } else {
         
        this.apiService.getUserByIdAndDOJ(this.forgotPasswordForm.value.username,this.forgotPasswordForm.value.Dateofjoining).subscribe(
             (res) => {
             this.ngZone.run(() => this.router.navigateByUrl('/change-password',{state:{username:res.username,quizNumber:res.quiznumber}}))
             }, (error) => {
               this.error='Invalid Username/DateOfJoining'
               console.log(error);

             });
        }
      }
      

    onSubmit() {
        this.submitted = true;
        if (!this.loginForm.valid) {
          return false;
       } else {
         
        this.apiService.getUserByIdAndPwd(this.loginForm.value.username,this.loginForm.value.password).subscribe(
             (res) => {
             console.log('User' +res+'successfully loggedin!')
             if (res.accessLevel === 'admin') {
               this.ngZone.run(() => this.router.navigateByUrl('/candidates-list',{state:{username:res.username}}))
             } else {
              if(res.quizNumber == 1 && res.status == 'Active' && res.password == 'welcome'){
                this.ngZone.run(() => this.router.navigateByUrl('/change-password',{state:{username:res.username,quizNumber:res.quizNumber}}))  
               }else{
                if(res.status == 'Active'){
                this.ngZone.run(() => this.router.navigateByUrl('/quizInstructions',{state:{username:res.username,quizNumber:res.quizNumber}}))
                } else{
                this.error='You are not an active user'
                      }
                }             
              }
             }, (error) => {
               this.error='Invalid Credentials'
               console.log(error);

             });
        }
      }

}
