import { Component } from '@angular/core';
import { User } from '../../models/user/user';
import { Person } from '../../models/person/person';
import { Profile } from '../../models/profile/profile';
import { Account } from '../../models/account/account';
import { AccountId } from '../../models/account/accountId';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service';
import { ReportService } from '../service/service';
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../active/service/shared.service';
import { ProfileService } from '../../models/profile/service/profile.service';

@Component({
  selector: 'custDate',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class CustDatesComponent {
  constructor(private accountService: AccountService, private cookieService: CookieService,
  private sharedService : SharedService, private reportService: ReportService,
  private profileService: ProfileService){}
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
  profileToggle = true;
  foundProfiles: Profile[] = [];
  profileCount = 0;
  alertSuccess = false;
  alertShow = false;
  alertMsg = "";
  alertWarning = false;

  profile1 = new Profile();
  profile2 = new Profile();
  profile  : Profile = new Profile();
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.resetProfile();
    this.resetProfiles();
    this.loaded = true;
      console.log(this.userData, "user daaata");

  }
  resetProfile(){
    this.profile = new Profile();
    var person = new Person(null, null, null, null, null, null, null, null, null, null);
      this.profile.user = new User("122-22-2222", person, "User-User", -1, new Date());
        this.profile.m_f = "";
        this.profile.user.person.street = "";
        this.profile.user.person.state = "";
        this.profile.user.person.city = "";
        this.profile.user.person.zipcode = null;
        this.profile.hairColor = "";
        this.profile.hobbies = "";
        this.profile.weight = null;
        this.profile.height = null;
        this.profile.m_f = "";

  }
  resetProfiles(){
    this.profile2 = new Profile();
    var person = new Person("1", null, null, null, null, null, null, null, null, null);
    var person2 = new Person("1", null, null, null, null, null, null, null, null, null);

    this.profile2.user = new User("", person, "User-User", -1, new Date());
    this.profile1 = new Profile();
    this.profile1.user = new User("", person2, "User-User", -1, new Date());

  }

  searchForProfiles(profile: Profile): void {
    this.profileService.findProfiles(profile).subscribe(response => this.updatesProfileToggle(
      response));
  }
  onSubmit(form): void {
    this.profileToggle = false;
    this.searchForProfiles(this.profile);
  }

  updatesProfileToggle(response): void {
    if(response.statusCode === 200){
      this.alertSuccess = true;
      this.alertShow = false;
      this.foundProfiles = response.object;
      this.profileCount = response.object.length;
      this.alertMsg = "Found " + this.profileCount + " matches.";
    }else{
      this.alertShow = true;
      this.foundProfiles = [];
      this.alertMsg = "Found 0 matches.";
      this.alertSuccess = false;
    }


  }

  updateCalenderDates(response){
    if(response.statusCode === 200){
      this.highestDay = response.object[0];
      this.loaded = true;
    }else{
      this.reportWarning  = true;
      this.reportMsg = "Error generating required dates";
    }
  }

  selectedProfileCheck(profile){
    return profile.profileId === this.profile1.profileId ||
    profile.profileId === this.profile2.profileId
  }

  selectProfile(profile){
    if(this.selectedProfileCheck(profile)){
      if(this.profile1.profileId == profile.profileId)
      {
        this.profile1 = new Profile();
        var person = new Person("1", null, null, null, null, null, null, null, null, null);
          this.profile1.user = new User("", person, "User-User", -1, new Date());

      }else{
        this.profile2 = new Profile();
        var person = new Person("1", null, null, null, null, null, null, null, null, null);
          this.profile2.user = new User("", person, "User-User", -1, new Date());

      }
    }else{
      if(this.profile1.user.person.ssn === "1"){
        this.profile1 = profile;
      }else if(this.profile2.user.person.ssn === "1"){
        this.profile2 = profile;
      }else{
        this.profile1 = profile;
      }
    }
    console.log(this.profile1, "profile1");
    console.log(this.profile2, "profile2");
  }

  selctedBtnMsg(profile){
    if(this.selectedProfileCheck(profile)){
        return "Unselect Profile";
    }else{
      return "Select Profile";
    }
  }

  addSuggestion(form){
    this.reportService.addSuggestion(this.profile1.profileId, this.profile2.profileId, this.userData[0]["ssn"]).subscribe(
      response => this.updateSuggestionAlert(response)
    )
  }

  updateSuggestionAlert(response){
    if(response.statusCode === 200){
      this.alertShow = true;
      this.alertMsg = "Suggestion added."
    }else{
      this.alertWarning = true;
      this.alertMsg = "Error adding suggestion."
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
      if(this.highestDay){
        this.reportAlert = true;
        this.reportMsg = "Succesfuly generated required highest rated day for dates.";
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
