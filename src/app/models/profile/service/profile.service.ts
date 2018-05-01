import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Profile } from '../profile'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class ProfileService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('ProfileService: ' + message);
    }

   private baseUrl = "http://localhost:8080/profiles/";
   private getAllUrl = this.baseUrl + "all"; // URL to web api
   private addProfileUrl = this.baseUrl + "add";
   private saveProfileUrl = this.baseUrl + "save";
   private findProfileUrl = this.baseUrl + "find";
   private deleteProfileUrl = this.baseUrl + "delete";

   getAllProfile (): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.getAllUrl)
  }

  getProfilesWithSSN (ssn: string): Observable<Profile[]> {
   return this.http.get<Profile[]>(this.baseUrl + ssn);
 }

  addProfile (profile: Profile, ssn: string): Observable<Profile> {
    console.log(profile, "profile");
    return this.http.post<Profile>((this.addProfileUrl + "/" + ssn), profile, httpOptions).pipe(
    tap((profile: Profile) => this.log(`added profile ${profile}`)),
    catchError(this.handleError<Profile>('addProfile'))
  )}

  saveProfile (profile: Profile, ssn: string): Observable<Profile> {
    console.log(profile, "profile");
    return this.http.post<Profile>((this.saveProfileUrl + "/" + ssn), profile, httpOptions).pipe(
    tap((profile: Profile) => this.log(`saved profile ${profile}`)),
    catchError(this.handleError<Profile>('saveProfile'))
  )}

   findProfiles (profile: Profile): Observable<Profile> {
    console.log(profile, "profile");
    return this.http.post<Profile>((this.findProfileUrl), profile, httpOptions).pipe(
    tap((profile: Profile) => this.log(`find profiles ${profile}`)),
    catchError(this.handleError<Profile>('findProfiles'))
  )}

  deleteProfile (profile: Profile): Observable<Profile> {
   console.log(profile, "profile");
   return this.http.post<Profile>((this.deleteProfileUrl), profile, httpOptions).pipe(
   tap((profile: Profile) => this.log(`delete profiles ${profile}`)),
   catchError(this.handleError<Profile>('delete profile'))
 )}

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
