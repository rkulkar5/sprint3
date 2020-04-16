import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute , NavigationExtras} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './../../service/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {
	userName: String = this.router.getCurrentNavigation().extras.state.username;;
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private actRoute: ActivatedRoute,
   ) { 
    console.log("Username is "+this.userName);
  }
  ngOnInit(): void {
  }
  
}
