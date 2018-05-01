import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Like } from '../like'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class LikeService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('LikeService: ' + message);
    }

   private baseUrl = "http://localhost:8080/likes/";
   private getAllUrl = this.baseUrl + "all"; // URL to web api
   private addLikeUrl = this.baseUrl + "add";

   getAllLike (): Observable<Like[]> {
    return this.http.get<Like[]>(this.getAllUrl)
  }

  like (like: Like): Observable<Like> {
    return this.http.post<Like>(this.addLikeUrl, like, httpOptions).pipe(
    tap((like: Like) => this.log(`added like ${like}`)),
    catchError(this.handleError<Like>('addLike'))
  )}

  getAllLikesByLiker (profileId: string): Observable<Like[]> {
    return this.http.post<Like[]>(this.baseUrl + profileId, httpOptions).pipe(
    tap((like: Like[]) => this.log(`getAllLikesByLiker ${like}`)),
    catchError(this.handleError<Like[]>('getAllLikesByLiker'))
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
