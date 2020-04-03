import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//var passport = require('passport');
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  baseUri:string = 'http://localhost:4000/api';
  baseloginUri:string = 'http://localhost:4000/api/login';
  baseBandUri:string = 'http://localhost:4000/api/band';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Create user
  createUser(data): Observable<any> {

    let url = `${this.baseloginUri}/login`;
    console.log('API SERVICE')
    console.log('---get--'+ this.http.get(`${this.baseloginUri}`));
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
     
  }

  



  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


 // Get User
 getUserByIdAndPwd(id, pwd): Observable<any> {
  let url = `${this.baseloginUri}/readUser/${id}/${pwd}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
  console.log("res inside service API ",res);
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

 // Get User by Username and DateOfJoining
 getUserByIdAndDOJ(id, doj): Observable<any> {
  let url = `${this.baseloginUri}/getUserDOJ/${id}/${doj}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
  console.log("res inside service API for forgot password ",res);
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Create band
    createBand(data): Observable<any> {
      let url = `${this.baseBandUri}/createBand`;
      return this.http.post(url, data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }

    // Get all bands
    getBands() {
      return this.http.get(`${this.baseBandUri}`);
    }

    // Get band
    getBand(id): Observable<any> {
      let url = `${this.baseBandUri}/readBand/${id}`;
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    // Update band
    updateBand(id, data): Observable<any> {
      let url = `${this.baseBandUri}/updateBand/${id}`;
      return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
      )
    }

    // Delete band
    deleteBand(id): Observable<any> {
      let url = `${this.baseBandUri}/deleteBand/${id}`;
      return this.http.delete(url, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
      )
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
