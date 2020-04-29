import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Question } from 'src/app/model/Questions';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-questions-add',
  templateUrl: './questions-add.component.html',
  styleUrls: ['./questions-add.component.css']
})
export class QuestionsAddComponent implements OnInit {
  submitted = false;
  formReset = false;
  questionForm: FormGroup;
  userName: String = "admin";
  JRSS:any = []; 
  QuestionTypes:any = ['SingleSelect','MultiSelect'];
  answerArray:Array<String>=[];
  optionsArray:Array<Object>=[];
  questionID:any;
  constructor(public fb: FormBuilder,
                  private router: Router,
                  private ngZone: NgZone,
                  private apiService: ApiService) { this.readJRSS();this.mainForm();}

  ngOnInit() {this.apiService.getQuestionID().subscribe(
    (res) => {
      console.log('Question successfully createdgggg!',res.questionID);                  
      this.questionID=res.questionID;
      
    }, (error) => {
      console.log(error);
    });       }

  mainForm() {
      this.questionForm = this.fb.group({
        jrss: ['', [Validators.required]],
        questionType: ['', [Validators.required]],
        question: ['', [Validators.required]],
        option1: ['', [Validators.required]],
        option2: ['', [Validators.required]],
        option3: ['', [Validators.required]],
        option4: ['', [Validators.required]],
        option1checkbox:[],
        option2checkbox:[],
        option3checkbox:[],
        option4checkbox:[],
        answerID:[],
        questionID:[],
       
      })
    }

    // Getter to access form control
      get myForm(){
        return this.questionForm.controls;
      }
  // Choose JRSS with select dropdown
    updateJRSS(e){
      this.questionForm.get('JRSS').setValue(e, {
      onlySelf: true
      })
    }
// Choose band with select dropdown
updateJRSSProfile(e){
  this.questionForm.get('jrss').setValue(e, {
  onlySelf: true
  })
}

// Get all Bands
readJRSS(){
   this.apiService.getJRSS().subscribe((data) => {
   this.JRSS = data;
   })
}
    // Choose QuestionType with select dropdown
    updateQuestionTypes(e){
      this.questionForm.get('questionType').setValue(e, {
      onlySelf: true
      })
    }

    onSubmit() {
        this.submitted = true;
        if (!this.questionForm.valid) {
          console.log('error part');
          return false;
        } else {            
          this.answerArray=[];  
          this.optionsArray=[];   
          console.log('sss',this.questionForm.value.JRSS)
          this.questionForm.value.jrss=this.questionForm.value.jrss
          if(!(this.questionForm.value.option1checkbox || this.questionForm.value.option2checkbox
            || this.questionForm.value.option3checkbox || this.questionForm.value.option4checkbox)){
              alert("Answers not selected");
            }else{  
          if(this.questionForm.value.option1checkbox){
            this.answerArray.push("1");}
          if(this.questionForm.value.option2checkbox){
            this.answerArray.push("2");}
            if(this.questionForm.value.option3checkbox){
              this.answerArray.push("3");}
              if(this.questionForm.value.option4checkbox){
                this.answerArray.push("4");}                
                this.questionForm.value.answerID=this.answerArray.toString();
               this.optionsArray.push({optionID:1,option:this.questionForm.value.option1},
                {optionID:2,option:this.questionForm.value.option2},
                {optionID:3,option:this.questionForm.value.option3},
                {optionID:4,option:this.questionForm.value.option4});         
              this.questionForm.value.options=this.optionsArray;
                //Validation for singleSelect
                if((this.questionForm.value.questionType=="SingleSelect")&& (this.answerArray.toString().length)>1)
                {console.log("only one"+this.questionForm.value.answerID)
                alert("Only one option can be selected as the questionType is SingleSelect");                
                return false;
              }       
              this.questionID++;                
              this.questionForm.value.questionID=this.questionID;
              
          this.apiService.createQuestion(this.questionForm.value).subscribe(
            (res) => {
              console.log('Question successfully created!');
              window.confirm('Succesfully added to QuestionBank');
              this.formReset = true;
              this.questionForm.reset();
              this.ngZone.run(() => this.router.navigateByUrl('/manage-questionbank'))
            }, (error) => {
              console.log(error);
            }); 
          }
        }
      }

}
