import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-test-instruction',
  templateUrl: './test-instruction.component.html',
  styleUrls: ['./test-instruction.component.css']
})
export class TestInstructionComponent implements OnInit {

 constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone
    ) {}
  
	
	
  ngOnInit() {  }
 
 
}
