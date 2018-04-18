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
	selector: 'search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
	constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService) {}
    profile = new Profile();
    profileToggle = false;
    foundProfiles = {profile: "none"};
    profileCount = 0;
    alertSuccess = true;
    ngOnInit(): void {
      if(this.cookieService.get("currentProfile") != null){
          var tempProfile = JSON.parse(this.cookieService.get("currentProfile"));
          this.profile.datingGeoRange = tempProfile.datingGeoRange;
          this.profile.datingAgeRangeStart = tempProfile.datingAgeRangeStart;
          this.profile.datingAgeRangeEnd = tempProfile.datingAgeRangeEnd;

      }
  		this.userData = JSON.parse(this.cookieService.get("userData"));
      this.profile.m_f = "";
      this.getAllUserProfiles(this.userData[0]['ssn']);
  	}
    getAllUserProfiles(ssn: string): void {
  		// this.profileService.getProfilesWithSSN(ssn).subscribe(response => this.updateProfileToggle(
  		// 	response));
      this.profileService.getAllProfile(ssn).subscribe(response => this.updateProfileToggle(
  			response));
  	}
    updateProfileToggle(response): void {
  		this.profileToggle = response.object == null ? false : true;
  		this.foundProfiles = response.object;
      this.profileCount = response.object.length;
      console.log(response, "search response");

  	}
}
