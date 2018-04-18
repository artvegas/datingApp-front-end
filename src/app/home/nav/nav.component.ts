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
  constructor(private router:Router, private cookieService: CookieService,
  private sharedService :SharedService){}
  ngOnInit() {
      this.userLoggedIn = this.cookieService.get("session").match("true") ? true : false;
      this.sharedService.currentAccount.subscribe( value =>
          this.currentAccount = value
      );
      this.sharedService.userIsLoggedIn.subscribe( value =>
          this.userLoggedIn = value
      );
      this.sharedService.currentProfile.subscribe( value =>
          this.currentProfile = value
      );
    }

  logout(): void{
    console.log("logging out");
    this.cookieService.put("session", "false");
    this.userIsLoggedOut();
    console.log(this.userLoggedIn, "userLoggedIn");
    this.router.navigateByUrl('/signin');
  }

  ngDoCheck(): void{
    console.log(this.userLoggedIn, "userLoggedIn");
  }

  userIsLoggedOut(){
    this.sharedService.userIsLoggedIn.next(false);
  }
}
