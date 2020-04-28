import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class QuizService {

 baseUri:string = 'http://localhost:4000/api/quiz';
 userAnswerUri:string = 'http://localhost:4000/api/userAnswer';
 headers = new HttpHeaders().set('Content-Type', 'application/json');

 constructor(private http: HttpClient) { }

  // Get all questions
  getQuizQuestions(noOfQuestions,userName) {
    let url = `${this.baseUri}/${noOfQuestions}/${userName}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
      return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  
  // Get All userAnswers by username
    getUserAnswers(userName): Observable<any> {
      let url = `${this.userAnswerUri}/${userName}`;
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  
  
     // Get User Result
 getUserResults(userName, quizNum): Observable<any> {
  let url = `${this.userAnswerUri}/getResults/${userName}/${quizNum}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}
    

  // Create
  saveAnswer(data): Observable<any> {
  console.log("Data inside service method **** ",data);
    let url = `${this.userAnswerUri}/saveAns`;
	
    return this.http.post(url, data, { headers: this.headers });
      
  }
  
  // Error handling
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
