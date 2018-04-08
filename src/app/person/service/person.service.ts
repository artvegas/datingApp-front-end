import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Person } from '../person'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class PersonService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('PersonService: ' + message);
    }

   private baseUrl = "http://localhost:8080/persons";
   private getAllUrl = this.baseUrl + '/all';  // URL to web api
   private addPersonUrl = this.baseUrl + "/add";

   getAllPerson (): Observable<Person[]> {
    return this.http.get<Person[]>(this.getAllUrl)
  }

  // signUpPerson(person): {
  //   return this.http
  //   .put(this.addPerson, JSON.stringify(person), {headers: headers} )
  //   .map(res => res.json());
  // }

  addPerson (person: Person): Observable<Person> {
    console.log(person, "person");
  return this.http.post<Person>(this.addPersonUrl, person, httpOptions).pipe(
    tap((person: Person) => this.log(`added person w/ ssn=${person.ssn}`)),
    catchError(this.handleError<Person>('addPerson'))
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
