import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { User } from '../../models/user/user';
import { Like } from '../../models/like/like';
import { LikeKey } from '../../models/like/likeKey';
import { Profile } from '../../models/profile/profile';
import { Account } from '../../models/account/account';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service';
import { ProfileService } from '../../models/profile/service/profile.service';
import { LikeService } from '../../models/like/service/like.service';
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../service/shared.service';
import { DatesService } from '../../models/dates/service/dates.service';
import { Dates } from '../../models/dates/dates';
import { DateKey } from '../../models/dates/dateKey';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
	constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService,
		private likeService: LikeService,
		private dateService: DatesService) {}
    profile = new Profile();
		tempProfile = new Profile();
    profileToggle = true;
    foundProfiles: Profile[] = [];
    profileCount = 0;
    alertSuccess = false;
		alertShow = false;
		alertMessage = "";
		userData: User;
		showProfile = true;
		activeProfile = new Profile();
		activeHobbiesList: string[];
		likedButtonProfile = new Profile();
		userLikedProfiles : Like[] = [];
		setUpDatesOn = false;
		date = new Dates();
		datingAlert = false;
		datingAlertMsg = "";
		datingWarning = false;
		datingSucces = false;
		setUpBtnMsg = "Set Up Date";
		waitingDates: Dates[] = [];
		dateTime = "";
		currentProfileNull = true;
    ngOnInit(): void {
      if(this.cookieService.get("currentProfile") != null){
          var tempProfile = JSON.parse(this.cookieService.get("currentProfile"));
					console.log(tempProfile, "temp");
          this.profile.datingGeoRange = tempProfile.datingGeoRange;
          this.profile.datingAgeRangeStart = tempProfile.datingAgeRangeStart;
          this.profile.datingAgeRangeEnd = tempProfile.datingAgeRangeEnd;
					this.tempProfile.hobbies = tempProfile.hobbies;
					this.profile.user = tempProfile.user;
					this.profile.user.person = tempProfile.user.person;
					this.profile.user.person.street = "";
					this.profile.user.person.state = "";
					this.profile.user.person.city = "";
					this.profile.user.person.zipcode = null;
					this.profile.hairColor = "";
					this.profile.hobbies = "";
					this.profile.weight = null;
					this.profile.height = null;
					this.profile.m_f = "";
					this.profile.profileId = tempProfile.profileId;
					console.log(tempProfile, "temppto");
					this.currentProfileNull = false;
      }else{
				this.currentProfileNull = true;
			}
						this.date.dateKey = new DateKey();

						console.log(this.date, "wdff");
			this.likeService.getAllLikesByLiker(this.profile.profileId).subscribe(
				response => this.getLikedProfiles(response));
  		this.userData = JSON.parse(this.cookieService.get("userData"));
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
			this.userLikedProfiles = response.object;
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
			}else{
				this.alertShow = true;
				this.foundProfiles = [];
				this.alertMessage = "Found 0 matches.";
				this.alertSuccess = false;
			}

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
		likeProfile(profile: Profile){
			var like: Like = new Like();
			like.likeKey = new LikeKey();
			like.likeKey.liker = this.profile;
			like.likeKey.likee = profile;
			console.log(this.profile.profileId, "donoald");
			console.log(profile.profileId, "profileId");
			this.likeService.like(like).subscribe(response => this.updatesdLikedButton(response, like))
		}
		updatesdLikedButton(response, like: Like): void{
			if(response.statusCode === 200){
				this.userLikedProfiles.push(like);
			}
		}
		likedButtonMsg(profile: Profile) : string{
			for(var i = 0; i < this.userLikedProfiles.length; i++){
				// console.log(this.userLikedProfiles[i].likeKey.likee.profileId, "check liker");
				// console.log(profile.profileId, "liked");
				if(this.userLikedProfiles[i].likeKey.likee.profileId
				=== profile.profileId){
					return "Liked Profile";
				}
			}
			return "Like Profile";
		}
		likedButtonCheck(profile: Profile): boolean{
			for(var i = 0; i < this.userLikedProfiles.length; i++){
				if(this.userLikedProfiles[i].likeKey.likee.profileId
				=== profile.profileId){
					return true;
				}
			}
			return false;
		}
		activeHobbiesCheck(hobbies: string){
			var curHobbiesList = this.tempProfile.hobbies.split(",");
			console.log(curHobbiesList, "list");
			for(var i = 0; i < curHobbiesList.length; i++){
				if(curHobbiesList[i] === hobbies){
					return true;
				}
			}
			return false;
		}

		displayDatesAlert(response){
			this.datingAlert = true;
			if(response.statusCode === 200){
				this.datingAlertMsg = "Succesfuly sent date request.";
			}else{
				this.datingWarning = true;
				this.datingAlertMsg = "Error sending date request";
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
		submitDateFrom(form) : void {
			this.date.dateKey = new DateKey();
			this.date.dateKey.profile1 = this.profile;
			this.date.dateKey.profile2 = this.activeProfile;
			this.date.dateKey.dateTime = this.dateTime;
			this.date.employee = null;
			this.addDate();
		}

		addDate(){
      this.dateService.addDate(this.date).subscribe(
        response => this.displayDatesAlert(response))
    }

}
