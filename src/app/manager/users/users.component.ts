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
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
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
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.reportService.getAllUsers().subscribe(
      response => this.updateAllUsers(response)
    )
    this.reportService.getMostActiveUsers().subscribe(
      response => this.updateMosActicetUsers(response)
    )
    this.reportService.getHighestRatedUsers().subscribe(
      response => this.updateRatedUsers(response)
    )
  }

  updateAllUsers(response){
      if(response.statusCode === 200){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated all users";
        console.log(response.object, " data");
        console.log(response, "resp");
        this.allUsers = response.object;
        this.displayUsers = this.allUsers;
        this.setActivePage(0);
      }else{
        this.reportWarning  = true;
        this.reportMsg = "Error generating all users;"
      }
  }

  updateMosActicetUsers(response){
      if(response.statusCode === 200){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated most active users";
        this.activeUsers = response.object;
        this.displayUsers = this.activeUsers;
      }else{
        this.reportWarning  = true;
        this.reportMsg = "Error generating most active users;"
      }
  }


  updateRatedUsers(response){
      if(response.statusCode === 200){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated highest rated users";
        this.ratedUsers = response.object;
        this.displayUsers = this.ratedUsers;
      }else{
        this.reportWarning  = true;
        this.reportMsg = "Error generating highest rated users";
      }
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


  activePage(type){
    return this.page == type;
  }

  setActivePage(type){
    this.page = type;
    if(type == 0){
      this.displayUsers = this.allUsers;
    }else if(type == 1){
      this.displayUsers = this.activeUsers;
    }else if(type == 2){
      this.displayUsers = this.ratedUsers;
    }
    console.log(this.displayUsers, " users");
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




}
