import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Dates } from '../dates'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class DatesService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('DatesService: ' + message);
    }

   private baseUrl = "http://localhost:8080/dates/";
   private getAllUrl = this.baseUrl + "all"; // URL to web api
   private addDatesUrl = this.baseUrl + "add";
   private upcomingDatesUrl = this.baseUrl + "upcoming/";
   private requestsSentUrl = this.baseUrl + "requests/sent/";
   private pastDatesUrl = this.baseUrl + "past/";
   private requestsRecievedUrl = this.baseUrl + "requests/";
   private acceptDateUrl = this.baseUrl + "accept/";
   private rejectDateUrl = this.baseUrl + "reject/";
   private cancelDateUrl = this.baseUrl + "cancel/";
   private datesForTodayUrl = this.baseUrl + "today/";
   private addCommentUrl = this.addDatesUrl + "/comment/"
   private rateDateUrl = this.baseUrl + "rate/"

   getAllDates (): Observable<Dates[]> {
    return this.http.get<Dates[]>(this.getAllUrl)
  }

  addDate (dates: Dates): Observable<Dates> {
    return this.http.post<Dates>(this.addDatesUrl, dates, httpOptions).pipe(
    tap((dates: Dates) => this.log(`added dates ${dates}`)),
    catchError(this.handleError<Dates>('addDates'))
  )}

  rateDate (dates: Dates): Observable<Dates> {
    return this.http.post<Dates>(this.rateDateUrl, dates, httpOptions).pipe(
    tap((dates: Dates) => this.log(` rateDate ${dates}`)),
    catchError(this.handleError<Dates>('rateDate'))
  )}

  addComment (dates: Dates): Observable<Dates> {
    return this.http.post<Dates>(this.addCommentUrl, dates, httpOptions).pipe(
    tap((dates: Dates) => this.log(` addComment ${dates}`)),
    catchError(this.handleError<Dates>('addComment'))
  )}

  acceptDate (dates: Dates): Observable<Dates> {
    return this.http.post<Dates>(this.acceptDateUrl, dates, httpOptions).pipe(
    tap((dates: Dates) => this.log(`acceptDate ${dates}`)),
    catchError(this.handleError<Dates>('acceptDate'))
  )}

  rejectDate (dates: Dates): Observable<Dates> {
    return this.http.post<Dates>(this.rejectDateUrl, dates, httpOptions).pipe(
    tap((dates: Dates) => this.log(`rejectDate ${dates}`)),
    catchError(this.handleError<Dates>('rejectDate'))
  )}

  cancelDate (dates: Dates): Observable<Dates> {
    return this.http.post<Dates>(this.cancelDateUrl, dates, httpOptions).pipe(
    tap((dates: Dates) => this.log(`cancelDate ${dates}`)),
    catchError(this.handleError<Dates>('cancelDate'))
  )}

  getUpcomingDates (profileId: string): Observable<Dates[]> {
    return this.http.get<Dates[]>(this.upcomingDatesUrl + profileId, httpOptions).pipe(
    tap((dates: Dates[]) => this.log(`getUpcomingDates ${dates}`)),
    catchError(this.handleError<Dates[]>('getUpcomingDates'))
  )}

  getRequestsSent (profileId: string): Observable<Dates[]> {
    return this.http.get<Dates[]>(this.requestsSentUrl + profileId, httpOptions).pipe(
    tap((dates: Dates[]) => this.log(`getRequestsSent ${dates}`)),
    catchError(this.handleError<Dates[]>('getRequestsSent'))
  )}

  getPastDates (profileId: string): Observable<Dates[]> {
    return this.http.get<Dates[]>(this.pastDatesUrl + profileId, httpOptions).pipe(
    tap((dates: Dates[]) => this.log(`getPastDates ${dates}`)),
    catchError(this.handleError<Dates[]>('getPastDates'))
  )}

  getRequestsRecieved (profileId: string): Observable<Dates[]> {
    return this.http.get<Dates[]>(this.requestsRecievedUrl + profileId, httpOptions).pipe(
      tap((dates: Dates[]) => this.log(`getRequestsRecieved ${dates}`)),
      catchError(this.handleError<Dates[]>('getRequestsRecieved'))
    )}

    getDatesForToday (profileId: string): Observable<Dates[]> {
      return this.http.get<Dates[]>(this.datesForTodayUrl + profileId, httpOptions).pipe(
        tap((dates: Dates[]) => this.log(`getDatesForToday ${dates}`)),
        catchError(this.handleError<Dates[]>('getDatesForToday'))
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
