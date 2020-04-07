import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuizService  {


  baseQuestionUri:string = 'http://localhost:4000/api/question';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

   // Get all Questions
    //getAll(): Observable<any> {
      //return this.http.get(`${this.baseQuestionUri}`);
    //}

    getAll() {
        return [
          { id: 'data/javascript.json', name: 'JavaScript' },
          { id: 'data/aspnet.json', name: 'Asp.Net' },
          { id: 'data/csharp.json', name: 'C Sharp' },
          { id: 'data/designPatterns.json', name: 'Design Patterns' }
        ];
      }
    get(url: string) {
        return this.http.get(url);
    }
    // Get Question
    //get(id): Observable<any> {
      //let url = `${this.baseQuestionUri}/readQuestion/${id}`;
      //return this.http.get(url, {headers: this.headers}).pipe(
        //map((res: Response) => {
          //return res || {}
        //}),
        //catchError(this.errorMgmt)
      //)
    //}

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error getUserResultsCode: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
