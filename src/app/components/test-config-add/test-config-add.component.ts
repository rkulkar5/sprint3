import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TestConfigService } from './../../service/testconfig.service';
import { ApiService } from './../../service/api.service';
import { TestConfig } from './../../model/TestConfig';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-test-config-add',
  templateUrl: './test-config-add.component.html',
  styleUrls: ['./test-config-add.component.css']
})
export class TestConfigAddComponent implements OnInit {
  public browserRefresh: boolean;
  submitted = false;
  testConfigAddForm: FormGroup;
  JRSS:any = [];
  testDuration: number;
  noOfQuestions: number;
  TestConfigs:any = [];
  TestConfigDetails:any = [];
  userName: String = "admin";

  constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private testconfigService: TestConfigService,
      private apiService: ApiService
    ) {
      this.browserRefresh = browserRefresh;
      this.mainForm();
      this.readJrss();
      this.getAllTestConfigs();
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
        this.testConfigAddForm = this.fb.group({
          JRSS: ['', [Validators.required]],
          noOfQuestions: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
          testDuration: ['', [Validators. required, Validators.pattern('^[0-9]+$')]]
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
      this.testConfigAddForm.get('JRSS').setValue(e, {
        onlySelf: true
      })
    }

    //get All Test Configs
    getAllTestConfigs(){
      this.testconfigService.getAllTestConfigs().subscribe((data) => {
       this.TestConfigs = data;
      })
    }


    // Getter to access form control
    get myForm(){
      return this.testConfigAddForm.controls;
    }


    onSubmit() {
        this.submitted = true;
        if (!this.testConfigAddForm.valid) {
          return false;
        } else {
          let jrss = this.testConfigAddForm.value.JRSS;
          this.testconfigService.findTestConfigByJRSS(jrss).subscribe(
               (res) => {
                 window.alert("Record exists for the selected JRSS. Please click on the Edit link below to edit the details");
               }, (error) => {
                  let testConfig = new TestConfig(this.testConfigAddForm.value.JRSS,
                   this.testConfigAddForm.value.noOfQuestions, this.testConfigAddForm.value.testDuration);
                   this.testconfigService.createTestConfig(testConfig).subscribe(
                     (res) => {
                      console.log('Test Config successfully saved!')
                      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                      this.router.navigate(['/testconfig-add']));
                     }, (error) => {
                       console.log(error);
                  });
               });
          }

    }


}
