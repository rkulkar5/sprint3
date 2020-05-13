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
  userResultUri:string = 'http://localhost:4000/result';
  baseloginUri:string = 'http://localhost:4000/api/login';
  baseBandUri:string = 'http://localhost:4000/api/band';
  baseJrssUri:string = 'http://localhost:4000/api/jrss';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
// Get all JRSS
getJRSS() {
  return this.http.get(`${this.baseJrssUri}`);
}
  // Create Candidate
  createCandidate(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // GET Candidate JRSS
  getCandidateJrss(username): Observable<any> {
    let url = `${this.baseUri}/candidatejrss/${username}`;
    return this.http.get(url)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Create Question
  createQuestion(data): Observable<any> {
    console.log('create question apiservice');
    let url = `${this.baseUri}/createquestion`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

    // get max Question
    getQuestionID(): Observable<any> {
      console.log('get question ID apiservice');
      let url = `${this.baseUri}/getMaxQuestionID`;
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {    
          return res || {}
        }),
        catchError(this.errorMgmt)
        )
    }
  // Create User Details
  createUserDetails(data): Observable<any> {
    let url = `${this.baseUri}/createUser`;
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

  // Get all candidates
  getCandidates() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get candidate
  getCandidate(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get User Details by ID
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/readUser/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get Unique Username
  findUniqueUsername(email): Observable<any> {
    let url = `${this.baseUri}/findUser/${email}`;
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
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

// Get Users table records based on username
getUserByUserName(id): Observable<any> {
  let url = `${this.baseloginUri}/getUser/${id}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {    
      return res || {}
    }),
    catchError(this.errorMgmt)
    )
  }

// Get results based on search criteria
getResultsSearch(query) {
  let url = `${this.userResultUri}/getresultSearch/${query}`;
  console.log("here in api",url,"\n")
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {    
      return res || {}
    }),
    catchError(this.errorMgmt)
    )
}
  // Update Users table status,quizNumber,UpdatedBy and UpdatedDate columns based on candidate table username
  updateUsersStatusAndQuizNum(id,quiznum,status,uname): Observable<any> {    
    let url = `${this.baseloginUri}/updateUserStatusAndQuizNum/${id}/${quiznum}/${status}/${uname}`;  
    return this.http.put(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
    )
  }

// Update Users table status,UpdatedBy and UpdatedDate columns based on candidate table username
  updateUsersStatus(id,status,uname): Observable<any> {  
    let url = `${this.baseloginUri}/updateUserStatus/${id}/${status}/${uname}`;    
    return this.http.put(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
    )
  }
  
 // Update password
 updatepassword(id, pwd): Observable<any> {
     let url = `${this.baseloginUri}/updatepassword/${id}/${pwd}`;
  return this.http.put(url, pwd).pipe(
    catchError(this.errorMgmt)
  )
}
  // Update candidate
  updateCandidate(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

   // Update User by ID
   updateUserDetails(id, data): Observable<any> {
    let url = `${this.baseUri}/updateUser/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete candidate and user
  deleteCandidate(id,username): Observable<any> {
    let url = `${this.baseUri}/delete/${id}/${username}`;
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

  // Update userLoggedin status.
 updateUserLoggedinStatus(username, userloggedin): Observable<any> {
  let url = `${this.baseloginUri}/${username}/${userloggedin}`;
return this.http.put(url, status).pipe(
 catchError(this.errorMgmt)
)
}


//Start JRSS:

// Create jrss
createJrss(data): Observable<any> {
  let url = `${this.baseJrssUri}/createJrss`;
  return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    )
}

// Get all jrss
getJrsss() {
  return this.http.get(`${this.baseJrssUri}`);
}

// Get jrss
getJrss(id): Observable<any> {
  let url = `${this.baseJrssUri}/readJrss/${id}`;
  return this.http.get(url, {headers: this.headers}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}

// Delete jrss
deleteJrss(id): Observable<any> {
  let url = `${this.baseJrssUri}/deleteJrss/${id}`;
  return this.http.delete(url, { headers: this.headers }).pipe(
    catchError(this.errorMgmt)
  )
}
//End of JRSS:

}
