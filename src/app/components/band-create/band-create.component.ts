import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.css']
})
export class BandCreateComponent implements OnInit {
  submitted = false;
  bandForm: FormGroup;
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

  ngOnInit() {  }

  getBand(id) {
    this.apiService.getBand(id).subscribe(data => {
      this.bandForm.setValue({
        band: data['band']
      });
    });
  }

  updateBand() {
      this.bandForm = this.fb.group({
        band: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$')]]
      })
    }

  readBand(){
      this.apiService.getBands().subscribe((data) => {
       this.Band = data;
      })
    }

  mainForm() {
    this.bandForm = this.fb.group({
      band: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$')]]
    })
  }

    // Getter to access form control
    get myForm(){
      return this.bandForm.controls;
    }
  removeBand(band, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteBand(band._id).subscribe((data) => {
          this.Band.splice(index, 1);
        }
      )
    }
  }
    onSubmit() {
        this.submitted = true;
        if (!this.bandForm.valid) {
          return false;
        } else {
          this.apiService.createBand(this.bandForm.value).subscribe(
            (res) => {
              console.log('Band successfully saved!')
             // this.ngZone.run(() => this.router.navigateByUrl('/create-band'))
             this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
             this.router.navigate(['/create-band']));
            }, (error) => {
              console.log(error);
            });
        }
      }
}
