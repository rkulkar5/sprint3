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
  state = "ActivateUser";
  error = "";
  quizNumber = 1;
  status = ""; 

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

   //Story#27 - Activate & Inactivate candidate's status for Assessment
   updateCandidateStatus(candidate, index) {     
    //Get quizNumber and status coulmns value from Users table
    this.apiService.getUserByUserName(candidate.username).subscribe(
      (res) => {
      console.log('Users records fetched successfully - ' + res)      
      //If Status is Inactive and quizNumber < 3, increase quizNumber by 1 
      //and update the status and quizNumber columns of Users table 
      if (res.status === 'Inactive' && res.quizNumber < 3) {                          
          this.status = "Active";              
          this.quizNumber = ++res.quizNumber;           
          this.apiService.updateUsers(candidate.username,this.quizNumber,this.status).subscribe(
            (res) => {
              console.log('Status and quizNumber columns updated successfully in Users table');                 
            }, (error) => {                  
              console.log("Error found while updating Status and QuizNumber columns of Users table - " + error);
            }); 
          candidate.candidate_users[0].status = this.status;
          candidate.candidate_users[0].quizNumber = this.quizNumber;        
      } else if (res.status === 'Active') {              
          this.status = "Inactive";  
          // Update status column in Users table                     
          this.apiService.updateUsersStatus(candidate.username,this.status).subscribe(
            (res) => {
              console.log('Status column updated successfully in Users table');                 
            }, (error) => {                
             console.log("Error found while updating status column of Users table - " + error);
             }); 
          candidate.candidate_users[0].status = this.status;
      } else if (res.quizNumber >= 3) {             
            window.confirm('Candidate can\'t be activated !');
      } else {            
            window.confirm('Error occurred while updating candidate status !');
      }    
      }, (error) => {            
          console.log("Error found while fetching records from Users table - " + error);
      });      
} // End of updateCandidateStatus

}
