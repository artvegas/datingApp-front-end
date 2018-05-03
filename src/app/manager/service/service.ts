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
   private allDatesByDateUrl = this.baseUrl + "dates/";
   private highestCalenderDate = this.baseUrl + "report_highest_rating_dates/100";
   private profilesUrl = this.baseUrl + "profile";
   private userDatedUrl = this.baseUrl + "list_profiles_dated_one_profile/"
   private highestRevenueUserUrl = this.baseUrl + "List_TotalRevenue_per_user/best"
   private highestRevenueCustRepUrl = this.baseUrl + "List_TotalRevenue_per_cr/best";
   private addCustRepUrl = this.baseUrl + "add/custRep";
   private addManagerUrl = this.baseUrl + "add/manager";
   private updateEmployeeUrl = this.baseUrl + "update";
   private deleteEmployeeUrl = this.baseUrl + "/delete"
   private sugggestionsUrl = "http://localhost:8080/suggestedBys/";
   private mailingListUrl = "http://localhost:8080/users/mailingList";
   private addSuggestionUrl = "http://localhost:8080/suggestedBys/";
   private addBlindDateUrl = "http://localhost:8080/blindDates/add"
   private allDatesUrl = this.baseUrl + "dates";
   private bookDateUrl = this.baseUrl + "dates/record";

   getAllEmployees (): Observable<Object[]> {
    return this.http.get<Object[]>(this.getAllUrl)
  }


    getSalesReport(year: string, month: number): Observable<Object[]> {
   return this.http.get<Object[]>(this.salesReportUrl + year + "/" + month, httpOptions).pipe(
     catchError(this.handleError<Object[]>('getSalesReport'))
   )}

   addCustRep(employee): Observable<Object[]> {
  return this.http.post<Object[]>(this.addCustRepUrl, employee, httpOptions).pipe(
    catchError(this.handleError<Object[]>('getSalesReport'))
  )}

  addEmployee(employee): Observable<Object[]>{
    if(employee.role === "Manager"){
      return this.addManager(employee);
    }

    if(employee.role == "CustRep"){
      return this.addCustRep(employee);
    }
  }
  addManager(employee): Observable<Object[]> {
 return this.http.post<Object[]>(this.addManagerUrl, employee, httpOptions).pipe(
   catchError(this.handleError<Object[]>('getSalesReport'))
 )}

 updateEmployee(employee): Observable<Object[]> {
return this.http.post<Object[]>(this.updateEmployeeUrl, employee, httpOptions).pipe(
  catchError(this.handleError<Object[]>('getSalesReport'))
)}

deleteEmployee(employee): Observable<Object[]> {
return this.http.post<Object[]>(this.deleteEmployeeUrl, employee, httpOptions).pipe(
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

getAllDatesByUser(firstName, lastName): Observable<Object[]> {
return this.http.get<Object[]>(this.allDatesByDateUrl + firstName + "/" + lastName, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getHighestCalenderDayForDate(): Observable<Object[]> {
return this.http.get<Object[]>(this.highestCalenderDate, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getAllProfiles(): Observable<Object[]> {
return this.http.get<Object[]>(this.profilesUrl, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getAllDatesByDate(startYear, startMonth, startDate,
endYear, endMonth, endDate): Observable<Object[]> {
return this.http.get<Object[]>(this.allDatesByDateUrl + startYear + "/" + startMonth + "/" + startDate +
"/" + endYear + "/" + endMonth + "/" + endDate , httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}


getMoneyByDate(startYear, startMonth, startDate,
endYear, endMonth, endDate): Observable<Object[]> {
return this.http.get<Object[]>(this.allDatesByDateUrl + "report/" + startYear + "/" + startMonth + "/" + startDate +
"/" + endYear + "/" + endMonth + "/" + endDate , httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}



getUsersWhoDatedUser(profileId): Observable<Object[]> {
return this.http.get<Object[]>(this.userDatedUrl + profileId, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getHighestRevenueUser(): Observable<Object[]> {
return this.http.get<Object[]>(this.highestRevenueUserUrl, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getHighestRevenueCustRep(): Observable<Object[]> {
return this.http.get<Object[]>(this.highestRevenueCustRepUrl, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getSuggestions(profileId): Observable<Object[]> {
return this.http.get<Object[]>(this.sugggestionsUrl + profileId, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getMailingList(): Observable<Object[]> {
return this.http.get<Object[]>(this.mailingListUrl, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

getAllDates(): Observable<Object[]> {
return this.http.get<Object[]>(this.allDatesUrl, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

bookDate(date): Observable<Object[]> {
return this.http.post<Object[]>(this.bookDateUrl, date, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

addSuggestion(profile1, profile2, custRep): Observable<Object[]> {
return this.http.post<Object[]>(this.addSuggestionUrl + profile1 + "/" + profile2 + "/" + custRep, httpOptions).pipe(
 catchError(this.handleError<Object[]>('getSalesReport'))
)}

addBlindDate(date): Observable<Object[]> {
return this.http.post<Object[]>(this.addBlindDateUrl, date, httpOptions).pipe(
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
