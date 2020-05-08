import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TestConfigService } from './../../service/testconfig.service';
import { ApiService } from './../../service/api.service';
import { TestConfig } from './../../model/TestConfig';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-test-config-edit',
  templateUrl: './test-config-edit.component.html',
  styleUrls: ['./test-config-edit.component.css']
})
export class TestConfigEditComponent implements OnInit {
  public browserRefresh: boolean;
  submitted = false;
  testConfigEditForm: FormGroup;
  JRSS:any = [];
  testDuration: number;
  noOfQuestions: number;
  TestConfigs:any = [];
  userName: String = "admin";
  oldJRSS: String = "";

  constructor(
      public fb: FormBuilder,
      private router: Router,
      private actRoute: ActivatedRoute,
      private ngZone: NgZone,
      private testconfigService: TestConfigService,
      private apiService: ApiService
    ) {
      this.browserRefresh = browserRefresh;
      this.getAllJRSS();
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getTestConfig(id);
      this.getAllTestConfigs();
      this.updateTestConfig();
    }

    ngOnInit() {
      this.browserRefresh = browserRefresh;
      if (this.browserRefresh) {
          if (window.confirm('Your account will be deactivated. You need to contact administrator to login again. Are you sure?')) {
             this.router.navigate(['/login-component']);
          }
      }
      this.testConfigEditForm = this.fb.group({
            JRSS: ['', [Validators.required]],
            noOfQuestions: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            testDuration: ['', [Validators. required, Validators.pattern('^[0-9]+$')]]
      })
    }

     // Get all Jrss
     getAllJRSS(){
      this.apiService.getJRSS().subscribe((data) => {
      this.JRSS = data;
      })
    }

    // Choose designation with select dropdown
    updateJrssProfile(e){
      this.testConfigEditForm.get('JRSS').setValue(e, {
        onlySelf: true
      })
    }

    getTestConfig(id) {
        this.testconfigService.getTestConfig(id).subscribe(data => {
          this.testConfigEditForm.setValue({
            JRSS: data['JRSS'],
            noOfQuestions: data['noOfQuestions'],
            testDuration: data['testDuration']
          });
          this.oldJRSS = data['JRSS'];
        });
    }

      updateTestConfig() {
        this.testConfigEditForm = this.fb.group({
          JRSS: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$')]],
          noOfQuestions: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
          testDuration: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
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
      return this.testConfigEditForm.controls;
    }


    onSubmit() {
        this.submitted = true;
        if (!this.testConfigEditForm.valid) {
          return false;
        } else {
          if (this.oldJRSS != this.testConfigEditForm.value.JRSS) {
            window.alert("You can not edit JRSS.");
          } else {
            let testConfig = new TestConfig(this.testConfigEditForm.value.JRSS,
            this.testConfigEditForm.value.noOfQuestions, this.testConfigEditForm.value.testDuration);
            let id = this.actRoute.snapshot.paramMap.get('id');
            this.testconfigService.updateTestConfig(id, testConfig)
                .subscribe(res => {
                  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
                  this.router.navigate(['/testconfig-add']));
                  console.log('Content updated successfully!')
                }, (error) => {
                  console.log(error)
            })
          }

        }
    }

}
