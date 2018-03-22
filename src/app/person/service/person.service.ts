import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Person } from '../person'
@Injectable()
export class PersonService{
constructor(
    private http: HttpClient){}
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
     console.log('PersonService: ' + message);
    }

   private baseUrl = "http://localhost:8080";
   private personUrl = this.baseUrl + '/persons';  // URL to web api

   getAllPerson (): Observable<Person[]> {
    return this.http.get<Person[]>(this.personUrl + "/all")
  }
}
