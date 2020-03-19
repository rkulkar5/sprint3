import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})

export class CandidateListComponent implements OnInit {

  Employee:any = [];

  constructor(private apiService: ApiService) {
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })
  }

  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )
    }
  }

}
