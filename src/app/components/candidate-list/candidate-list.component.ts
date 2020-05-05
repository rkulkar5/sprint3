import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

export class CandidateListComponent implements OnInit {
  public browserRefresh: boolean;
  Candidate:any = [];
  config: any;
  state = "Activate";
  error = "";
  quizNumber = 1;
  status = "";
  userName = "";

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems:0
    };
    this.browserRefresh = browserRefresh;
    if (!this.browserRefresh) {
        this.userName = this.router.getCurrentNavigation().extras.state.username;
    }
    route.queryParams.subscribe(
    params => this.config.currentPage= params['page']?params['page']:1 );
    this.readCandidate();
  }

  ngOnInit() {
    this.browserRefresh = browserRefresh;
    if (this.browserRefresh) {
        if (window.confirm('Your account will be deactivated. You need to contact administrator to login again. Are you sure?')) {
          this.router.navigate(['/login-component']);
        }
    }
  }

  pageChange(newPage: number) {
        this.router.navigate(['/candidates-list'], { queryParams: { page: newPage } });
  }

  // To Read the Candidate
  readCandidate(){
    this.apiService.getCandidates().subscribe((data) => {
     this.Candidate = data;
      
      this.Candidate.forEach(candidate => {
        candidate.candidate_users.forEach(user => {
          if (user.status == 'Active' ) { candidate.state='Disable'; } 
          else {candidate.state='Enable'; }
        });
      }); 

      
    })
  }

  //To remove candidate
  removeCandidate(candidate, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteCandidate(candidate._id,candidate.username).subscribe((data) => {
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
          this.apiService.updateUsersStatusAndQuizNum(candidate.username,this.quizNumber,this.status,this.userName).subscribe(
            (res) => {
              console.log('Status and quizNumber columns updated successfully in Users table');                 
            }, (error) => {                  
              console.log("Error found while updating Status and QuizNumber columns of Users table - " + error);
            }); 
          candidate.candidate_users[0].status = this.status;
          candidate.candidate_users[0].quizNumber = this.quizNumber;
          
          //Update user loggedin status to false, in case it was set true for any reason
          this.apiService.updateUserLoggedinStatus(candidate.username, 'false').subscribe(
            (res) => {
            console.log('userLoggedin column updated successfully in Users table');                 
            }, (error) => {                
            console.log("Error found while updating userLoggedin column of Users table - " + error);
            });
             candidate.state = "Disable";
      }else if (res.status === 'Active' && res.userLoggedin === 'true'){
        //The above condition satisfies only when: a user logged in and he/she 
        //is in instruction page and the browser is closed before started test.
        this.apiService.updateUserLoggedinStatus(candidate.username, 'false').subscribe(
          (res) => {
          console.log('userLoggedin column updated successfully in Users table');                
          }, (error) => {                
          console.log("Error found while updating userLoggedin column of Users table - " + error);
          });
          alert('User login status updated successfully.');
      } else if (res.status === 'Active') {              
          this.status = "Inactive";  
          // Update status column in Users table                     
          this.apiService.updateUsersStatus(candidate.username,this.status,this.userName).subscribe(
            (res) => {
              console.log('Status column updated successfully in Users table');                 
            }, (error) => {                
             console.log("Error found while updating status column of Users table - " + error);
             }); 
          candidate.candidate_users[0].status = this.status;
          candidate.state = "Enable";	
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
