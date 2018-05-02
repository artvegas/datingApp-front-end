import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { User } from '../../models/user/user';
import { Profile } from '../../models/profile/profile';
import { Account } from '../../models/account/account';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service'
import { ProfileService } from '../../models/profile/service/profile.service'
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../service/shared.service';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService) {}

		filterByMostActiveBool = false;
		filterByHighestRated = false;
  alertSuccess = false;
	userData = "";
	userHasNoAccounts = false;
	userHasNoProfiles = false;
	alertShow = false;
	delProfile: Profile = null;
	alertMessage = "";
	delToggle = false;
	delMessage = "";
	activeProfile : Profile = new Profile();
	editMode = false;
	dashboardMessage = "Create New Profile";
	dashboardBtnMessage = "Create Profile";
	// model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com",
	// 	"917-932-7046", "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
	profile = new Profile();
	userProfiles: Profile[] = [];
	ngOnInit(): void {
    if(this.cookieService.get("currentProfile") != null){
        var tempProfile = JSON.parse(this.cookieService.get("currentProfile"));
        this.useProfile(tempProfile);
    }
		this.userData = JSON.parse(this.cookieService.get("userData"));
		this.getAllUserAccounts(this.userData[0]['ssn']);
		this.getAllUserProfiles(this.userData[0]['ssn']);
		let user: User = new User(this.userData[0]['ssn'], null, null, null, null);
		this.profile.setM_F("");
		this.profile.setProfileName("Summer 2018");
		this.profile.setAge(18);
		this.profile.setHobbies("Drawing, Music, Dancing");
		this.profile.setWeight(155);
		this.profile.setHeight(5.7);
		this.profile.setHairColor("Black");
		this.profile.setDatingGeoRange(10);
		this.profile.setDatingAgeRangeStart(18);
		this.profile.setDatingAgeRangeEnd(22);
		this.profile.setUser(user);
	}
	getAllUserAccounts(ssn: string): void {
		this.accountService.getAccountsWithSSN(ssn).subscribe(response => this.updatesUserHasNoAccounts(
			response));
	}
	getAllUserProfiles(ssn: string): void {
		this.profileService.getProfilesWithSSN(ssn).subscribe(response => this.updatesUserHasNoProfiles(
			response));
	}
	updatesUserHasNoAccounts(response): void {
		this.userHasNoAccounts = response.object == null ? true : false;
	}
	updatesUserHasNoProfiles(response): void {
		this.userHasNoProfiles = response.object == null ? true : false;
		this.userProfiles = response.object;
		if(this.userProfiles == null){
			this.userProfiles = [];
		}
	}
	filterByMostActive(){

		if(this.userProfiles.length > 0){
			this.filterByMostActiveBool = true;
			for(var i = 0; i < this.userProfiles.length; i++){

				for(var j = 0; j < this.userProfiles.length; j++){
					if(this.userProfiles[i].lastModDate > this.userProfiles[j].lastModDate){
						var temp = this.userProfiles[i];
						this.userProfiles[i] = this.userProfiles[j];
						this.userProfiles[j] = temp;
					}
				}
			}
		}
	}


	onSubmit(form): void {
		console.log("adding new profile\n");
		console.log(form, "form");
		console.log(this.profile);
		if(this.editMode){
      this.profileService.saveProfile(this.profile, this.userData[0]['ssn']).subscribe(response => this
  			.showAlert(response, this.profile))
    }else{
			this.createProfile(this.profile);
      this.profileService.addProfile(this.profile, this.userData[0]['ssn']).subscribe(response => this
  			.showAlert(response, this.profile))
    }
	}
	createProfile(profile){
			var chars = ['a','b','c','d','e',
		'f','g','h', 'i', 'j', 'k', 'l'];
			var profileId = this.userData[0]['firstName'];
			var profileName = profile.profileName.substring(0,6);
			profileId += profileName;
			for(var i = 0; i < 20 - profileId.length; i++) {
				var rand = Math.floor((Math.random() * 1100)) % 11;
				console.log(rand, "random");
				console.log(chars[rand], "string");
				profileId += chars[rand];
			}
			profile.profileId = profileId;
			console.log(profileId);
	}
	showAlert(response, profile): void {
		if (response.statusCode != 200) {
			this.alertShow = true;
			this.alertMessage = response.status;
		} else {
      this.alertSuccess = true;
      if(this.editMode){
        this.updatesEditedProfile(this.profile);
        this.profile = new Profile();
        this.profile.setM_F("");
        this.alertMessage = "Sucessfully saved profile.";
      }else{
				profile.lastModDate = new Date();
				profile.user.person = this.userData[0];
				console.log(profile, "wdf profile");
				console.log(this.userProfiles, "empty user profiles");
        this.userProfiles.push(profile);
        this.alertMessage = "Sucessfully created profile.";
				this.profile = new Profile();
				this.profile.setM_F("");
				this.userHasNoProfiles = false;
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
	editProfile(profile): void {
		this.editMode = true;
		this.profile = profile;
		this.dashboardMessage = "Editing Profile";
		this.dashboardBtnMessage = "Save Profile";
    this.alertSuccess = false;
	}
	doneEditing(): void {
		this.editMode = false;
		this.profile = new Profile();
		this.dashboardMessage = "Create New Profile";
		this.dashboardBtnMessage = "Create Profile";
    this.alertSuccess = false;
	}
	activeProfileCheck(profile): boolean {
		if (this.activeProfile.profileId === profile.profileId) {
			return true;
		}
		return false;
	}
	editProfileCheck(profile): boolean {
		if (this.profile.profileName === profile.profileName) {
			return true;
		}
		return false;
	}
  updatesEditedProfile(profile): void{
    this.userProfiles.filter(x => x.profileName == profile.profileName)[0].lastModDate = (new Date());
  }
  useProfile(profile): void{
    this.sharedService.currentProfile.next(profile.profileName);
    this.activeProfile = profile;
    this.cookieService.putObject("currentProfile", profile);
  }
  getBtnMessageActive(profile){
    if (this.activeProfile.profileId === profile.profileId) {
				return "Using";
		}
		return "Use";
  }
	getBtnMessageEdit(profile){
    if (this.profile.profileId === profile.profileId) {
				return "Editing";
		}
		return "Edit";
  }
	deleteProfile(){
		this.profileService.deleteProfile(this.delProfile).subscribe(response => this.displayDeleteMsg(response));
	}
	displayDeleteMsg(response){
		this.delToggle = true;
		if(response.statusCode == 200){
			this.delMessage = "Succesfuly deleted profile.";
			for(var i = 0; i < this.userProfiles.length; i++){
				if(this.userProfiles[i].profileId === this.delProfile.profileId){
					this.userProfiles.splice(i, 1);
				}
			}
			if(this.userProfiles.length === 0){
				this.userHasNoProfiles = true;
			}
		}else{
			this.delMessage = "Error deleting profile";
		}
	}
	setDelProfile(profile){
		this.delProfile = profile;
	}
}
