import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { User } from '../user'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class UserService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('UserService: ' + message);
    }

   private baseUrl = "http://localhost:8080/users/";
   private getAllUrl = this.baseUrl + "all"; // URL to web api
   private addUserUrl = this.baseUrl + "add";

   getALlUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUrl)
  }

  getUserWithSSN (ssn: String): Observable<User[]> {
   return this.http.get<User[]>(this.baseUrl + ssn)
 }

  addUser (user: User): Observable<User> {
    console.log(user, "user");
    return this.http.post<User>(this.addUserUrl, user, httpOptions).pipe(
    tap((user: User) => this.log(`added user ${user}`)),
    catchError(this.handleError<User>('addUser'))
  );
}



  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
   private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {

       // TODO: send the error to remote logging infrastructure
       console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption
       this.log(`${operation} failed: ${error.message}`);

       // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }



}
