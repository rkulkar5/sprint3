import { Band } from './../../model/Band';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-band-edit',
  templateUrl: './band-edit.component.html',
  styleUrls: ['./band-edit.component.css']
})
export class BandEditComponent implements OnInit {
  submitted = false;
  editBandForm: FormGroup;
  Band:any = [];

  constructor(public fb: FormBuilder,
                  private actRoute: ActivatedRoute,
                  private apiService: ApiService,
                  private router: Router) { this.readBand();}

  ngOnInit() {
      this.updateBand();
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getBand(id);
      this.editBandForm = this.fb.group({
        band: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$')]]
      })
    }
  // Getter to access form control
  get myForm() {
    return this.editBandForm.controls;
  }

  readBand(){
      this.apiService.getBands().subscribe((data) => {
       this.Band = data;
      })
  }

  getBand(id) {
    this.apiService.getBand(id).subscribe(data => {
      this.editBandForm.setValue({
        band: data['band']
      });
    });
  }

  updateBand() {
    this.editBandForm = this.fb.group({
      band: ['', [Validators.required, Validators.pattern('^[0-9A-Z]+$')]]
    })
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
    if (!this.editBandForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateBand(id, this.editBandForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/create-band']));
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
