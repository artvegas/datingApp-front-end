import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class ReportService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('ReportService: ' + message);
    }

   private baseUrl = "http://localhost:8080/employees/";
   private getAllUrl = this.baseUrl + "all"; // URL to web api
   private salesReportUrl = this.baseUrl + "saleReport/";
   private allUsersUrl = this.baseUrl + "/users/all";
   private activeUsersUrl = this.baseUrl + "/list_active_users/100";
   private highestRatedUsersUrl = this.baseUrl + "/list_hightest_rating_users/100";


   getAllReport (): Observable<Object[]> {
    return this.http.get<Object[]>(this.getAllUrl)
  }


    getSalesReport(year: string, month: number): Observable<Object[]> {
   return this.http.get<Object[]>(this.salesReportUrl + year + "/" + month, httpOptions).pipe(
     catchError(this.handleError<Object[]>('getSalesReport'))
   )}

   getAllUsers(): Observable<Object[]> {
  return this.http.get<Object[]>(this.allUsersUrl, httpOptions).pipe(
    catchError(this.handleError<Object[]>('getSalesReport'))
  )}

  getMostActiveUsers(): Observable<Object[]> {
 return this.http.get<Object[]>(this.highestRatedUsersUrl, httpOptions).pipe(
   catchError(this.handleError<Object[]>('getSalesReport'))
 )}

 getHighestRatedUsers(): Observable<Object[]> {
return this.http.get<Object[]>(this.activeUsersUrl, httpOptions).pipe(
  catchError(this.handleError<Object[]>('getSalesReport'))
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
