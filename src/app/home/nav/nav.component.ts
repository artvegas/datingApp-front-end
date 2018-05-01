import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { SharedService } from '../../active/service/shared.service'

@Component({
  selector: 'home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class HomeNavComponent {
  userLoggedIn = false;
  currentAccount = "None";
  currentProfile = "None";
  managerIsLoggedIn = false;
  constructor(private router:Router, private cookieService: CookieService,
  private sharedService :SharedService){}
  ngOnInit() {
      this.sharedService.currentAccount.subscribe( value =>
          this.currentAccount = value
      );
      this.sharedService.userIsLoggedIn.subscribe( value =>
          this.userLoggedIn = value
      );
      this.sharedService.managerIsLoggedIn.subscribe( value =>
          this.managerIsLoggedIn = value
      );
      this.sharedService.currentProfile.subscribe( value =>
          this.currentProfile = value
      );
      if(this.cookieService.get("session") === "true"){
        if(this.cookieService.get("managerOn") === "true"){
          this.sharedService.managerIsLoggedIn.next(true);
          this.sharedService.userIsLoggedIn.next(false);
        }else{
          this.sharedService.userIsLoggedIn.next(true);
        }

      }else{
          this.sharedService.userIsLoggedIn.next(false);
      }
      if(this.cookieService.get("currentProfile") != null){
          var tempProfile = JSON.parse(this.cookieService.get("currentProfile"));
          this.currentProfile = tempProfile.profileName;
      }
      if(this.cookieService.get("currentAccount") != null){
          var tempAccount = JSON.parse(this.cookieService.get("currentAccount"));
          this.currentAccount = tempAccount.account.acctName;
      }
      console.log(this.managerIsLoggedIn, "manager");
      console.log(this.userLoggedIn, "user ");
    }

  logout(): void{
    console.log("logging out");
    this.cookieService.put("session", "false");
    this.userIsLoggedOut();
    this.managerIsLoggedOut();
    console.log(this.userLoggedIn, "userLoggedIn");
    this.router.navigateByUrl('/signin');
  }

  ngDoCheck(): void{
    console.log(this.userLoggedIn, "userLoggedIn");
  }

  userIsLoggedOut(){
    this.sharedService.userIsLoggedIn.next(false);
  }
  managerIsLoggedOut(){
    this.sharedService.managerIsLoggedIn.next(false);
  }
}
