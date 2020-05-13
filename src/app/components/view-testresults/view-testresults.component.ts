import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from '../../app.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-view-testresults',
  templateUrl: './view-testresults.component.html',
  styleUrls: ['./view-testresults.component.css']
})
export class ViewTestresultsComponent implements OnInit {
  userResultUri:string = 'http://localhost:4000/result';
  public browserRefresh: boolean;
  Result:any = [];
  config: any;
  state = "Activate";
  error = "";
  quizNumber = 1;
  status = "";
  userName = "";
  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems:0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage= params['page']?params['page']:1 );
    this.readResult();  
  }

  ngOnInit(): void {
  }
  pageChange(newPage: number) {
    this.router.navigate(['/view-testresults'], { queryParams: { page: newPage } });
}

 // Get all results
 getResults() {
  return this.http.get(`${this.userResultUri}/getresult`);
}
  // To Read the Results of Candidate
  readResult(){
    this.getResults().subscribe((data) => {
     this.Result = data;
     console.log('result users---'+this.Result);
    })
  }
}
