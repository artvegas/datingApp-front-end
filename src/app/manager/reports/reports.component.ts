import { Component } from '@angular/core';
import { User } from '../../models/user/user';
import { Person } from '../../models/person/person';
import { Account } from '../../models/account/account';
import { AccountId } from '../../models/account/accountId';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service';
import { ReportService } from '../service/service';
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../active/service/shared.service';

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  constructor(private accountService: AccountService, private cookieService: CookieService,
  private sharedService : SharedService, private reportService: ReportService){}
  userData = "";
  year = "";
  month = 0;
  reportAlert = false;
  reportMsg = "";
  reportWarning = false;
  reports = [];
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));

  }

  onSubmit(form){
    this.reportService.getSalesReport(this.year, this.month).subscribe(
      response => this.updateReports(response)
    )
  }

  updateReports(response){
    if(response.statusCode === 200){
      this.reportAlert = true;
      this.reportMsg = "Succesfuly generated sales report for";
      if(this.month == 1){
          this.reportMsg += " January, " + this.year;
      }else if(this.month == 2){
        this.reportMsg += " February, " + this.year;
      }else if(this.month == 3){
        this.reportMsg += " March, " + this.year;
      }else if(this.month == 4){
        this.reportMsg += " April, " + this.year;
      }else if(this.month == 5){
        this.reportMsg += " May, " + this.year;
      }else if(this.month == 6){
        this.reportMsg += " June, " + this.year;
      }else if(this.month == 7){
        this.reportMsg += " July, " + this.year;
      }else if(this.month == 8){
        this.reportMsg += " August, " + this.year;
      }else if(this.month == 9){
        this.reportMsg += " September, " + this.year;
      }else if(this.month == 10){
        this.reportMsg += " October, " + this.year;
      }else if(this.month == 11){
        this.reportMsg += " November, " + this.year;
      }else if(this.month == 12){
        this.reportMsg += " December, " + this.year;
      }
      this.reports = response.object;
    }else{
      this.reportWarning = true;
      this.reportMsg = "Error generating sales report";
    }
  }





}
