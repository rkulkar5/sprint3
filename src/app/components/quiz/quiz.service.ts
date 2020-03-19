import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

 baseUri:string = 'http://localhost:4000/api/quiz';
 headers = new HttpHeaders().set('Content-Type', 'application/json');

 constructor(private http: HttpClient) { }

  // Get all questions
  getQuizQuestions() {
    return this.http.get(`${this.baseUri}`);
  }

  // Create
  saveAnswer(data): Observable<any> {
  console.log("Data inside service method **** ",data);
    let url = `${this.baseUri}/saveAns`;
	
    return this.http.post(url, data, { headers: this.headers });
      
  }
  
  
}
