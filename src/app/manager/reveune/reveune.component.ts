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
  selector: 'reveune-stats',
  templateUrl: './reveune.component.html',
  styleUrls: ['./reveune.component.css']
})
export class RevenueComponent {
  constructor(private accountService: AccountService, private cookieService: CookieService,
  private sharedService : SharedService, private reportService: ReportService){}
  userData = "";
  year ="";
  month = 0;
  reportAlert = false;
  reportMsg = "";
  reportWarning = false;
  reports = [];
  page = 0;
  allUsers = [];
  activeUsers = [];
  ratedUsers = [];
  displayUsers = [];
  startYear = "";
  startMonth = 0;
  startDate = null;
  endYear = "";
  endMonth = 0;
  endDate = null;
  displayDates = [];
  firstName = "";
  lastName = "";
  calenderDates = [];
  highestDay = null;
  loaded = false;
  bestUser = null;
  bestCustRep = null;
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.reportService.getHighestRevenueUser().subscribe(
      response => this.updatedHighestRevenueUser(response)
    )
    this.reportService.getHighestRevenueCustRep().subscribe(
      response => this.updatedHighestRevenueCustRep(response)
    )
  }

  updatedHighestRevenueUser(response){
    if(response.statusCode === 200){
      this.loaded = true;
      this.bestUser = response.object[0];
    }else{
      this.reportWarning  = true;
      this.reportMsg = "Error generating required dates";
    }
  }

  updatedHighestRevenueCustRep(response){
    if(response.statusCode === 200){
      this.loaded = true;
      this.bestCustRep = response.object[0];
    }else{
      this.reportWarning  = true;
      this.reportMsg = "Error generating required dates";
    }
  }

  activePage(type){
    return this.page == type;
  }

  setActivePage(type){

    this.page = type;
    this.displayDates = [];
    this.reportAlert = false;
    this.reportWarning = false;
    this.reportMsg = "";
    if(type == 2){
      if(this.bestUser){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated highest revenue generating User.";
      }
    }

    if(type == 3){
      if(this.bestCustRep){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated highest revenue generating Customer Rep.";
      }
    }

  }

  timeSince(date): string {
		var curDate: any = new Date();
		var seconds = Math.floor((curDate - date) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}

  getByDate(form){
    this.reportService.getAllDatesByDate(this.startYear, this.startMonth, this.startDate, this.endYear,
    this.endMonth, this.endDate).subscribe(response => this.updateDateByDate(response))
  }

  getByUser(form){
    this.reportService.getAllDatesByUser(this.firstName, this.lastName).subscribe(
      response => this.updateDateByUser(response)
    )
  }

  updateDateByDate(response){
      if(response.statusCode === 200){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated required dates.";
        this.displayDates = response.object;
      }else{
        this.reportWarning  = true;
        this.reportMsg = "Error generating required dates";
      }

      this.startYear = "";
      this.startMonth = 0;
      this.startDate = null;
      this.endYear = "";
      this.endMonth = 0;
      this.endDate = null;
  }

  updateDateByUser(response){
      if(response.statusCode === 200){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated required dates for " + this.firstName + " " + this.lastName;
        this.displayDates = response.object;
      }else{
        this.reportWarning  = true;
        this.reportMsg = "Error generating required dates for " + this.firstName + " " + this.lastName;
      }
      this.firstName = "";
      this.lastName = "";
  }


  getTime(time){
    return moment(time).format('hh:mm A');
  }

  getDatesTime(time){

    return moment(time).format('MMMM, D Y');
  }

  getStatus(status){
    if(status == 0){
      return "Waiting to be accepted";
    }else if(status == 1){
      return "Date has been scheduled";
    }else if(status == 2){
      return "Date currently occuring";
    }else if(status == 3){
      return "Date Complete";
    }else if(status == 0){
      return "Date was cancelled or rejected";
    }
  }



}
