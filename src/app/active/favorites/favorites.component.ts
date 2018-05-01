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
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService,
		private likeService: LikeService,
    private dateService: DatesService) {}

    userData: User;
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
    setUpBtnMsg = "Set Up Date";
    waitingDates: Dates[] = [];
    currentProfileNull = true;
    ngOnInit(): void {
      this.userData = JSON.parse(this.cookieService.get("userData"));
      this.getAllUserAccounts(this.userData[0]['ssn']);
      if(this.cookieService.get("currentProfile") != null){
          var tempProfile = JSON.parse(this.cookieService.get("currentProfile"));
          this.profile = tempProfile;
          this.currentProfileNull = false;
      }else{
        this.currentProfileNull = true;
      }
      this.likeService.getAllLikesByLiker(this.profile.profileId).subscribe(
        response => this.getLikedProfiles(response))
        this.activeProfile.user = new User(null, null, null, null, null);
        this.activeProfile.user.person = new Person("", "", "", "", "", "", "", "", "", null);
      this.dateService.getRequestsSent(this.profile.profileId).
      subscribe(response => this.updatesWaitingDates(response));

    }

    updatesWaitingDates(response){
      if(response.statusCode === 200){
        this.waitingDates = response.object;
      }
    }

    getLikedProfiles(response){
      if(response.statusCode === 200){
        for(var i = 0; i < response.object.length; i++){
          var curProfile = response.object[i].likeKey.likee;
          this.likedProfiles.push(curProfile);
        }
      }
      this.loaded = true;
    }

    getAllUserAccounts(ssn: string): void{
      this.accountService.getAccountsWithSSN(ssn).subscribe(response => this.updatesUserHasNoAccounts(response));
    }

    updatesUserHasNoAccounts(response): void{
      this.userHasNoAccounts = response.object == null ? true : false;
    }

    userProfile(profile: Profile){
      this.activeProfile = profile;
      this.activeHobbiesList = profile.hobbiesList;
      this.setUpDatesOn = false;
      this.setUpBtnMsg = "Set Up Date";
      this.datingAlert = false;
      this.datingWarning = false;
      this.dateService.getRequestsSent(this.profile.profileId).
      subscribe(response => this.updatesWaitingDates(response));
      this.date = new Dates();
    }

    activeHobbiesCheck(hobbies: string){
			var curHobbiesList = this.profile.hobbies.split(",");
			console.log(curHobbiesList, "list");
			for(var i = 0; i < curHobbiesList.length; i++){
				if(curHobbiesList[i] === hobbies){
					return true;
				}
			}
			return false;
		}

    onSubmit(form) : void {
      this.date.dateKey = new DateKey();
      this.date.dateKey.profile1 = this.profile;
      this.date.dateKey.profile2 = this.activeProfile;
      this.date.employee = null;
      this.addDate();
    }

    addDate(){
      this.dateService.addDate(this.date).subscribe(
        response => this.displayDatesAlert(response))
    }

    displayDatesAlert(response){
      this.datingAlert = true;
      if(response.statusCode === 200){
        this.datingAlertMsg = "Succesfuly sent dates request.";
      }else{
        this.datingWarning = true;
        this.datingAlertMsg = "Error sending dates request";
      }
    }

    checkIfUserSentDatesRequestAlready(profile){
      console.log(this.waitingDates, "hello");
      for(var i = 0; i < this.waitingDates.length; i++)
        {
          if(this.waitingDates[i].dateKey.profile2.profileId ===
            profile.profileId){
              return true;
            }
        }
        return false;
    }



    setUpDatesToggle(){
      if(this.setUpDatesOn){
        this.setUpDatesOn = false;
        this.setUpBtnMsg = "Set Up Date";
        this.datingAlert = false;
        this.datingWarning = false;
      }else{
        this.setUpDatesOn = true;
        this.setUpBtnMsg = "Back To Profile";
      }
    }

}
