import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Account } from '../account'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class AccountService{
constructor( private http: HttpClient){}

    private log(message: string) {
     console.log('AccountService: ' + message);
    }

   private baseUrl = "http://localhost:8080/accounts/";
   private getAllUrl = this.baseUrl + "all"; // URL to web api
   private addAccountUrl = this.baseUrl + "add";

   getAllAccount (): Observable<Account[]> {
    return this.http.get<Account[]>(this.getAllUrl)
  }

  getAccountsWithSSN (ssn: string): Observable<Account[]> {
   return this.http.get<Account[]>(this.baseUrl + ssn);
 }

  addAccount (account: Account): Observable<Account> {
    console.log(account, "account");
    return this.http.post<Account>(this.addAccountUrl, account, httpOptions).pipe(
    tap((account: Account) => this.log(`added account ${account}`)),
    catchError(this.handleError<Account>('addAccount'))
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
