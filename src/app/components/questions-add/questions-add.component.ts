import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Question } from 'src/app/model/Questions';
import { ResourceLoader } from '@angular/compiler';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-questions-add',
  templateUrl: './questions-add.component.html',
  styleUrls: ['./questions-add.component.css']
})
export class QuestionsAddComponent implements OnInit {
  submitted = false;
  formReset = false;
  questionForm: FormGroup;
  uploadFile: String = "Please select a file";
  userName: String = "admin";
  JRSS:any = [];
  technologyStream:any = [];
  QuestionTypes:any = ['SingleSelect','MultiSelect'];
  answerArray:Array<String>=[];
  optionsArray:Array<Object>=[];
  questionID:any;
  validJRSS:any;
  validQuestionType:any;
  bulkUploadQuestions:number;
  totalBulkQuestions:number;
  file: File;
  arrayBuffer: any;
  filelist: any;
  constructor(public fb: FormBuilder,
                  private router: Router,
                  private ngZone: NgZone,
                  private apiService: ApiService) { this.readJRSS();this.mainForm();}

  ngOnInit() {this.apiService.getQuestionID().subscribe(
    (res) => {
      console.log("Question successfully created! ",+res.questionID);                  
      this.questionID=res.questionID;
      
    }, (error) => {
      console.log(error);
    });       }

  mainForm() {
      this.questionForm = this.fb.group({
        jrss: ['', [Validators.required]],
        technologyStream: ['', [Validators.required]],
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

  // Choose JRSS with select dropdown
  updateJRSSProfile(e){
    this.questionForm.get('jrss').setValue(e, {
    onlySelf: true
    })
  // Get technologyStream from JRSS
       for (var jrss of this.JRSS){
         if(jrss.jrss == e){
           this.technologyStream = [];
           for (var skill of jrss.technologyStream){
             this.technologyStream.push(skill);
           }
         }
   }
  }

  // Choose Technology Stream with select dropdown
      updateTechnologyStream(e){
        this.questionForm.get('TechnologyStream').setValue(e, {
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
        this.formReset = false;
        if (!this.questionForm.valid) {
          console.log('error part');
          return false;
        } else {            
          this.answerArray=[];  
          this.optionsArray=[];
          this.questionForm.value.jrss=this.questionForm.value.jrss
          this.questionForm.value.technologyStream=this.questionForm.value.technologyStream
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
      addfile(event)     
  {    
  this.file= event.target.files[0]; 
  console.log(this.file.type);
  if(this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  {
    window.alert("Please upload an .XLSX file")
  }
  }
  bulkUploadFile()
  { 
  let fileReader = new FileReader();   
  this.bulkUploadQuestions=0;
  this.totalBulkQuestions=0; 
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];  
      var worksheet = workbook.Sheets[first_sheet_name];      
      let jsonQuestionObj = XLSX.utils.sheet_to_json(worksheet);
      console.log("Number of JSON Objects "+jsonQuestionObj.length);  
      this.totalBulkQuestions=jsonQuestionObj.length;
      //Check if File uploaded is Empty
      if ( jsonQuestionObj.length == 0 ) {
        window.alert("The upload file is empty. Please check the file");
        return false;
       }
      //File is not empty, loop through the details
      for(var i = 0; i < jsonQuestionObj.length; i++)
      {
      this.answerArray=[];  
      this.optionsArray=[];   
      this.validJRSS=false;
      this.validQuestionType=false;
            
      //Check if JRSS in sheet is Valid
      for(var j = 0; j<this.JRSS.length; j++){
        if(jsonQuestionObj[i]["JRSS"] == this.JRSS[j]["jrss"]){
          this.questionForm.value.jrss = jsonQuestionObj[i]["JRSS"];
          console.log(this.questionForm.value.jrss+" is a valid JRSS");
          this.validJRSS = true;
        }
      }
      if(!this.validJRSS)
      {
        console.log("This is not a valid JRSS "+jsonQuestionObj[i]["JRSS"])
        continue;
      }

      //Check if Question is entered and update in the Question Form
      if(!(jsonQuestionObj[i]["Question"])){
        console.log("The quesiton is not found in row number "+(i+1));
        continue;
      }
      this.questionForm.value.question=jsonQuestionObj[i]["Question"];
      console.log("The Question is "+this.questionForm.value.question);
          
      //Check if All 4 options  are present
      if(!(jsonQuestionObj[i]["Option 1"] || jsonQuestionObj[i]["Option 2"]
            || jsonQuestionObj[i]["Option 3"] || jsonQuestionObj[i]["Option 4"])){
              alert("All 4 options are not given entered");
              continue;
      }
      this.optionsArray.push({optionID:1,option:jsonQuestionObj[i]["Option 1"]},
      {optionID:2,option:jsonQuestionObj[i]["Option 2"]},
      {optionID:3,option:jsonQuestionObj[i]["Option 3"]},
      {optionID:4,option:jsonQuestionObj[i]["Option 4"]});         
      this.questionForm.value.options=this.optionsArray;

      //Check if Answer ID is updated
      if(!(jsonQuestionObj[i]["Answer ID"])){  
          alert("Answer ID is not populated");
          continue;
      }   
      this.questionForm.value.answerID=jsonQuestionObj[i]["Answer ID"];
      console.log("Question Form Answer ID "+this.questionForm.value.answerID);
            
      //Check Valid QuestionType And update
      for(var j = 0; j<this.QuestionTypes.length; j++){
        if(jsonQuestionObj[i]["QuestionType"] == this.QuestionTypes[j]){
          this.questionForm.value.questionType = jsonQuestionObj[i]["QuestionType"];
          console.log(this.questionForm.value.questionType+" is a valid QuestionType");
          this.validQuestionType = true;
        }
      }
      if(!this.validQuestionType)
      {
        console.log("This is not a valid Question Type "+jsonQuestionObj[i]["QuestionType"])
        continue;
      }
      
               /**for(var j = 0; j<this.questionForm.value.options.length; j++){
                console.log("Question Form Options Array "+this.questionForm.value.options[j]["optionID"]+" "+this.questionForm.value.options[j]["option"]);
                }
                //Validation for singleSelect
               if((this.questionForm.value.questionType=="SingleSelect")&& (this.answerArray.toString().length)>1){
                 console.log("only one"+this.questionForm.value.answerID)
                alert("Only one option can be selected as the questionType is SingleSelect");                
                return false;
              }   **/   
    //Update Question ID
    if(!(this.questionID)){
      this.questionID=0;
    }      
    this.questionID++;    
    this.questionForm.value.questionID=this.questionID;
    console.log("The questionID for this question is "+this.questionForm.value.questionID);

    this.apiService.createQuestion(this.questionForm.value).subscribe(
      (res) => {
        console.log('Question successfully created!');
        this.bulkUploadQuestions=this.bulkUploadQuestions+1;
        console.log("Number of Questions uploaded "+this.bulkUploadQuestions);
        this.questionForm.reset();
        this.ngZone.run(() => this.router.navigateByUrl('/manage-questionbank'))
      }, (error) => {
        console.log(error);
      }); 
    }
    }    
 
 }
}


