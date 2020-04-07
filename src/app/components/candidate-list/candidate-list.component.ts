import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

export class CandidateListComponent implements OnInit {

  Candidate:any = [];

  constructor(private apiService: ApiService) {
    this.readCandidate();
  }

  ngOnInit() {}

  // To Read the Candidate
  readCandidate(){
    this.apiService.getCandidates().subscribe((data) => {
     this.Candidate = data;
    })
  }

  //To remove candidate
  removeCandidate(candidate, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteCandidate(candidate._id).subscribe((data) => {
          this.Candidate.splice(index, 1);
        }
      )
      this.readCandidate();
    }
  }

}
