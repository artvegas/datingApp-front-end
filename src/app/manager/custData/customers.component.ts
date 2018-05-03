import { Component } from '@angular/core';
import { User } from '../../models/user/user';
import { Person } from '../../models/person/person';
import { Account } from '../../models/account/account';
import { Dates } from '../../models/dates/dates';
import { Employee } from '../../models/employee/employee';
import { AccountId } from '../../models/account/accountId';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service';
import { ReportService } from '../service/service';
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../active/service/shared.service';

@Component({
  selector: 'cust-data',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustDataComponent {
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
  profiles = [];
	profile = null;
  profileId = 0;
  loaded = false;
	suggestions = [];
	activeHobbiesList = "";
	mailingList = [];
	pageName ="";
  curDate: Dates = new Dates();
  dates = [];
  ngOnInit(): void {
			this.setActivePage(0);
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.reportService.getMailingList().subscribe(
      response => this.updateMailingList(response)
    )
		this.reportService.getAllProfiles().subscribe(
			response => this.updateAllProfiles(response)
		)

    this.reportService.getAllDates().subscribe(
      response => this.updateAllDates(response)
    )

  }

  setCurDate(date){
    console.log(date, "datess");
  }
  recordDate(form){

    var employee = new Employee();
    employee.ssn = this.userData[0]["ssn"];
    this.curDate.employee = employee;
        console.log(this.curDate, "datess");
    this.reportService.bookDate(this.curDate).subscribe(
      response => this.updateRecordDate(response)
    )
  }

  updateRecordDate(response){
    if(response.statusCode === 200){
      this.reportAlert = true;
      this.reportMsg = "Sucessfully Booked Date.";
      for(var i = 0; i < this.dates.length; i++){
        if(this.dates[i].dateKey.profile1.user.person.ssn === this.curDate.dateKey.profile1.user.person.ssn &&
        this.dates[i].dateKey.profile2.user.person.ssn === this.curDate.dateKey.profile2.user.person.ssn){
          this.dates.splice(i, 1);
        }
        this.curDate = new Dates();
      }
    }else{
      this.reportWarning = true;
      this.reportMsg = "Error booking date";
    }
  }

  updateAllDates(response){
		if(response.statusCode === 200){
			this.dates = response.object;
		}
	}

	updateAllProfiles(response){
		if(response.statusCode === 200){
			this.profiles = response.object;
		}
	}

	getAge(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.age;
		}else{
			return suggestion.id.profile1.age;
		}
	}

	getHeight(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.height;
		}else{
			return suggestion.id.profile1.height;
		}
	}

	getWeight(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.weight;
		}else{
			return suggestion.id.profile1.weight;
		}
	}


	getGender(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.m_f;
		}else{
			return suggestion.id.profile1.m_f;
		}
	}
	getlastActive(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.user.dateOfLastAct
		}else{
			return suggestion.id.profile1.user.dateOfLastAct;
		}
	}

	getHairColor(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.hairColor;
		}else{
			return suggestion.id.profile1.hairColor;
		}
	}

	getHobbies(suggestion){
				console.log(suggestion, "suggest");
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.hobbiesList;
		}else{
			return suggestion.id.profile1.hobbiesList;
		}
	}

	getLocation(suggestion){
		console.log(suggestion, "suggest");
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.user.person.city + ", "  + suggestion.id.profile2.user.person.state;
		}else{
			return suggestion.id.profile1.user.person.city + ", "  + suggestion.id.profile1.user.person.state;

		}
	}

	getName(suggestion){
		if(suggestion.id.profile1.ssn === this.profile.user.person.ssn){
			return suggestion.id.profile2.user.person.firstName + " "  + suggestion.id.profile2.user.person.lastName;
		}else{
			return suggestion.id.profile1.user.person.firstName + " "  + suggestion.id.profile1.user.person.lastName;

		}
	}


  getSuggestionsByProfileId(form){
		for(var i = 0; i < this.profiles.length; i++){
			if(this.profiles[i].profileId === this.profileId){
				this.profile = this.profiles[i];
						this.activeHobbiesList = this.profile.hobbies;
										console.log(this.profile, "profile");
			}
		}
    this.reportService.getSuggestions(this.profileId).subscribe(
      response => this.updateSuggestions(response)
    )
  }
  checkRating(rating){
    if(rating == -1){
      return "Not yet Rated";
    }else{
      return rating;
    }
  }

  updateSuggestions(response){
    if(response.statusCode === 200){
      this.suggestions = response.object;
    }
		this.loaded = true;
  }

  updateMailingList(response){
		if(response.statusCode === 200){
			this.mailingList = response.object;
		}
		this.loaded = true;
  }

	activeHobbiesCheck(hobbies: string){
		var curHobbiesList = this.activeHobbiesList.split(",");
		console.log(curHobbiesList, "list");
		for(var i = 0; i < curHobbiesList.length; i++){
			if(curHobbiesList[i] === hobbies){
				return true;
			}
		}
		return false;
	}


  activePage(type){
    return this.page == type;
  }

  setActivePage(type){
    this.reportAlert = false;
    this.reportWarning = false;
    this.reportMsg = "";
    this.page = type;
		if(type === 0){
			this.pageName = "Mailing List";
		}else if(type === 1){
			this.pageName = "Suggestion List";
		}else if(type === 2){
      this.pageName = "Book Date";
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
