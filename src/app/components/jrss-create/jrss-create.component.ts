import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-jrss-create',
  templateUrl: './jrss-create.component.html',
  styleUrls: ['./jrss-create.component.css']
})
export class JrssCreateComponent implements OnInit {

  submitted = false;
  jrssForm: FormGroup;
  Jrss:any = [];
  userName: String = "admin";

  constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private apiService: ApiService
    ) {
      this.readJrss();
      this.mainForm();
    }

  ngOnInit() {  }

  getJrss(id) {
    this.apiService.getJrss(id).subscribe(data => {
      this.jrssForm.setValue({
        jrss: data['jrss']
      });
    });
  }

  readJrss(){
      this.apiService.getJrsss().subscribe((data) => {
       this.Jrss = data;
      })
    }

  mainForm() {
    this.jrssForm = this.fb.group({
      jrss: ['', [Validators.required]]
    })
  }

    // Getter to access form control
    get myForm(){
      return this.jrssForm.controls;
    }
    
  removeJrss(jrss, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteJrss(jrss._id).subscribe((data) => {
          this.Jrss.splice(index, 1);
        }
      )
    }
  }
    onSubmit() {
        this.submitted = true;
        if (!this.jrssForm.valid) {
          return false;
        } else {
          this.apiService.createJrss(this.jrssForm.value).subscribe(
            (res) => {
              console.log('JRSS successfully saved!')
             this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
             this.router.navigate(['/jrss-create']));
            }, (error) => {
              console.log(error);
            });
        }
      }

}
