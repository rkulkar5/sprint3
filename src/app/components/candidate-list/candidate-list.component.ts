import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

export class CandidateListComponent implements OnInit {

  Candidate:any = [];
  config: any;
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems:0
    };
    route.queryParams.subscribe(
    params => this.config.currentPage= params['page']?params['page']:1 );
    this.readCandidate();
  }

  ngOnInit() {}

  pageChange(newPage: number) {
        this.router.navigate(['/candidates-list'], { queryParams: { page: newPage } });
  }

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
