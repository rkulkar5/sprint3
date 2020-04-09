import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultPageService {

 userResultUri:string = 'http://localhost:4000/result';
 headers = new HttpHeaders().set('Content-Type', 'application/json');

 constructor(private http: HttpClient) { }
  
  
   // Create
  saveResult(data): Observable<any> {
    let url = `${this.userResultUri}/saveResult`;
	
    return this.http.post(url, data, { headers: this.headers });
      
  }
}
