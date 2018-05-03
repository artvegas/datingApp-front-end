import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { User } from '../../models/user/user';
import { Like } from '../../models/like/like';
import { Dates } from '../../models/dates/dates';
import { DateKey } from '../../models/dates/dateKey';
import { LikeKey } from '../../models/like/likeKey';
import { Profile } from '../../models/profile/profile';
import { Account } from '../../models/account/account';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service';
import { ProfileService } from '../../models/profile/service/profile.service';
import { DatesService } from '../../models/dates/service/dates.service';
import { LikeService } from '../../models/like/service/like.service';
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent {
  constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService,
		private likeService: LikeService,
    private dateService: DatesService) {}

    userData: User;
    rating = 0;
    loaded = false;
    alertSuccess = false;
    alertWarning = false;
    alertMessage = null;
    profile: Profile = new Profile();
    likedProfiles: Profile[] = [];
    userHasNoAccounts = false;
    activeProfile: Profile = new Profile();
    activeHobbiesList: string[] = [];
    setUpDatesOn = false;
    date = new Dates();
    datingAlert = false;
    datingAlertMsg = "";
    datingWarning = false;
    datingSucces = false;
    setUpBtnMsg = "Set Up Dates";
    upcomingDates: Dates[] = [];
    pastDates: Dates[] = [];
    requestDates: Dates[] = [];
    requestsSentDates: Dates[] = [];
    activePage = 4;
    displayDates: Dates[] = [];
    todayDates: Dates[] = [];
    currentProfileNull = true;
    comment: string = "";
    dateComments: string[] = [];
    rateAlert = false;
    rateWarning = false
    rateMessage = "";
    ratingToggle = false;
    blindDates = [];
    suggestions = [];
    ngOnInit(): void {
      this.userData = JSON.parse(this.cookieService.get("userData"));
      this.getAllUserAccounts(this.userData[0]['ssn']);
      if(this.cookieService.get("currentProfile") != null){
          var tempProfile = JSON.parse(this.cookieService.get("currentProfile"));
          this.profile = tempProfile;
          this.currentProfileNull = false;
          this.dateService.getUpcomingDates(this.profile.profileId).
          subscribe(response => this.updatesUpcomingDates(response));
          this.dateService.getBlindDates(this.profile.profileId).
          subscribe(response => this.updateBlindDates(response));
          this.dateService.getPastDates(this.profile.profileId).
          subscribe(response => this.updatesPastDates(response));
          this.dateService.getRequestsRecieved(this.profile.profileId).
          subscribe(response => this.updatesRequestsDates(response));
          this.dateService.getRequestsSent(this.profile.profileId).
          subscribe(response => this.updateRequestsSentDates(response));
          this.dateService.getDatesForToday(this.profile.profileId).
          subscribe(response => this.updateDatesForToday(response));
          this.dateService.getSuggestions(this.profile.profileId).
          subscribe(response => this.updateSuggestions(response));
      }else{
          this.currentProfileNull = true;
          this.loaded = true;
      }
        this.activeProfile.user = new User(null, null, null, null, null);
        this.activeProfile.user.person = new Person("", "", "", "", "", "", "", "", "", null);

    }

    updateRequestsSentDates(response){
      if(response.statusCode === 200){
          this.requestsSentDates = response.object;
      }
    }

    updateSuggestions(response){
      if(response.statusCode === 200){
          this.suggestions = response.object;
      }
    }


    updateBlindDates(response){
      if(response.statusCode === 200){
          this.blindDates = response.object;
      }
    }

    updateDatesForToday(response){
      if(response.statusCode === 200){
        this.todayDates = response.object;
      }
        this.displayDates = this.todayDates;
        this.loaded = true;
    }

    updatesActivePage(page){
      this.activePage = page;
      if(page == 0){
        this.displayDates = this.upcomingDates;
      }else if(page == 1){
        this.displayDates = this.requestsSentDates;
      }else if(page == 2){
        this.displayDates = this.requestDates;
      }else if(page == 3){
        this.displayDates = this.pastDates;
      }else if(page == 4){
        this.displayDates = this.todayDates;
      }
      this.datingSucces = false;
      this.datingAlert = false;
      this.datingAlertMsg = "";
      console.log(this.displayDates, "dates");
    }

    updatesUpcomingDates(response){
      if(response.statusCode === 200){
        this.upcomingDates = response.object;
      }
              this.loaded = true;
    }
    updatesRequestsDates(response){
      if(response.statusCode === 200){
        this.requestDates = response.object;
      }
    }
    updatesPastDates(response){
      if(response.statusCode === 200){
        this.pastDates = response.object;
      }
    }

    activePageCheck(page){
      return this.activePage === page;
    }

    getBookedStats(status){
      if(status === 1){
        return "Booked";
      }else{
        return "Not yet booked";
      }
    }

    finishedDate(date){
      this.dateService.finishedDate(date).subscribe(
        resposne => updateFinishedDate(response)
      )
    }


    updateFinishedDate(response, date){
      if(response.statusCode === 200){
        this.datingSucces = true;
        this.datingAlertMsg = "Sucessfully finished date."
        for(var i = 0; i < this.todayDates.length; i++){
          if(this.todayDates[i].dateKey.profile2.profileId === date.dateKey.profile2.profileId){
            this.todayDates.splice(i, 1);
          }
        }
      }else{
        this.datingAlert = true;
        this.datingAlertMsg = "Error finishing date."
      }
    }


    getAllUserAccounts(ssn: string): void{
      this.accountService.getAccountsWithSSN(ssn).subscribe(response => this.updatesUserHasNoAccounts(response));
    }

    updatesUserHasNoAccounts(response): void{
      this.userHasNoAccounts = response.object == null ? true : false;
    }

    getDatesTime(time){
      if(this.activePage == 4){
        return this.getTime(time);
      }
      return moment(time).format('MMMM D, Y');
    }

    getTime(time){
      return moment(time).format('hh:mm A');
    }

    cancelDate(date){
      this.dateService.cancelDate(date).subscribe(
        response => this.updateCancelAlert(response, date)
      )
    }

    acceptDate(date){
      this.dateService.acceptDate(date).subscribe(
        response => this.updateAcceptAlert(response, date)
      )
    }

    rejectDate(date){
      this.dateService.rejectDate(date).subscribe(
        response => this.updateRejectAlert(response, date)
      )
    }

    updateCancelAlert(response, date){
      if(response.statusCode === 200){
        this.datingSucces = true;
        this.datingAlertMsg = "Sucessfully cancelled date."
        for(var i = 0; i < this.upcomingDates.length; i++){
          if(this.upcomingDates[i].dateKey.profile2.profileId === date.dateKey.profile2.profileId){
            this.upcomingDates.splice(i, 1);
          }
        }
      }else{
        this.datingAlert = true;
        this.datingAlertMsg = "Error cancelling date."
      }
    }

    updateAcceptAlert(response,date){
      if(response.statusCode === 200){
        this.datingSucces = true;
        this.datingAlertMsg = "Sucessfully accepted date."
        this.upcomingDates.push(date);
        for(var i = 0; i < this.requestDates.length; i++){
          if(this.requestDates[i].dateKey.profile2.profileId === date.dateKey.profile2.profileId){
            this.requestDates.splice(i, 1);
          }
        }
      }else{
        this.datingAlert = true;
        this.datingAlertMsg = "Error accepting date."
      }
    }

    updateRejectAlert(response, date){
      if(response.statusCode === 200){
        this.datingSucces = true;
        this.datingAlertMsg = "Sucessfully rejected date."
        for(var i = 0; i < this.requestDates.length; i++){
          if(this.requestDates[i].dateKey.profile2.profileId === date.dateKey.profile2.profileId){
            this.requestDates.splice(i, 1);
          }
        }
      }else{
        this.datingAlert = true;
        this.datingAlertMsg = "Error rejecting date."
      }
    }

    getDateWithName(date){
      if(date.dateKey.profile1.profileId === this.profile.profileId){
        return date.dateKey.profile2.user.person.firstName + " " +  date.dateKey.profile2.user.person.lastName;
      }else{
        return date.dateKey.profile1.user.person.firstName + " " + date.dateKey.profile1.user.person.lastName;
      }
    }

    viewComments(date){
      this.ratingToggle = false;
      this.date = date;
      this.dateComments = date.comments.split("/end");
      if(this.dateComments[this.dateComments.length - 1] == ""){
        this.dateComments.splice(this.dateComments.length - 1, 1);
      }
      console.log(this.dateComments, "comments");
    }

    onSubmit(form) : void {
      var prefix = this.profile.user.person.firstName + "~// ";
      prefix += this.comment;
      this.comment = prefix + "/end";
      if(this.date.comments == null){
        this.date.comments = "";
      }
      this.date.comments += this.comment;
      this.dateService.addComment(this.date).subscribe(
        response => this.updateCommentDisplay(response, prefix)
      )
      this.comment = "";

    }

    updateCommentDisplay(response, prefix){
      if(response.statusCode === 200){
        this.dateComments.push(prefix);
      }
      this.comment = "";
    }

    displayComment(comment){
      return comment.replace("~//", ":");
    }

    checkIfUserComment(comment){
      var prefix = comment.split("~//");
      if(prefix[0] === this.profile.user.person.firstName){
        return true;
      }else{
        return false;
      }
    }

    updateRating(){
      if(this.profile.profileId === this.date.dateKey.profile1.profileId){
        this.date.user1Rating = this.rating;
      }else{
        this.date.user2Rating = this.rating;
      }
      this.dateService.rateDate(this.date).subscribe(
        response => this.updateRatingAlert(response)
      )
    }
    setActiveDate(date){
      this.date = date;
      this.rateAlert = false;
      this.rateWarning = false;
      this.rateMessage = "";
      this.ratingToggle = true;
    }

    updateRatingAlert(response){
      if(response.statusCode === 200){
        this.rateAlert = true;
        this.rateMessage = "Succesfuly rated date.";
      }else{
        this.rateWarning = true;
        this.rateMessage = "Error rating date.";
      }
    }

    getDateRating(date, type){
      if(type == 0){
        if(this.profile.profileId === date.dateKey.profile1.profileId){
          if(date.user1Rating == 1){
            return "Poor";
          }else if(date.user1Rating == 2){
            return "Fair";
          }else if(date.user1Rating == 3){
            return "Good";
          }else if(date.user1Rating == 4){
            return "Very Good";
          }else if(date.user1Rating == 5){
            return "Excellent";
          }
        }else{
          if(date.user2Rating == 1){
            return "Poor";
          }else if(date.user2Rating == 2){
            return "Fair";
          }else if(date.user2Rating == 3){
            return "Good";
          }else if(date.user2Rating == 4){
            return "Very Good";
          }else if(date.user2Rating == 5){
            return "Excellent";
          }
        }
      }else{
        if(this.profile.profileId != date.dateKey.profile1.profileId){
          if(date.user1Rating == 1){
            return "Poor";
          }else if(date.user1Rating == 2){
            return "Fair";
          }else if(date.user1Rating == 3){
            return "Good";
          }else if(date.user1Rating == 4){
            return "Very Good";
          }else if(date.user1Rating == 5){
            return "Excellent";
          }
        }else{
          if(date.user2Rating == 1){
            return "Poor";
          }else if(date.user2Rating == 2){
            return "Fair";
          }else if(date.user2Rating == 3){
            return "Good";
          }else if(date.user2Rating == 4){
            return "Very Good";
          }else if(date.user2Rating == 5){
            return "Excellent";
          }
        }
      }
    }







}
