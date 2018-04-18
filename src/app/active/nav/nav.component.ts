import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { SharedService } from '../service/shared.service'

@Component({
  selector: 'active-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class ActiveNavComponent {
  currentAccount = "None";
  userLoggedIn = false;
  constructor(private router:Router, private cookieService: CookieService,
    private sharedService :SharedService){}
  ngOnInit() {
        this.userLoggedIn = this.cookieService.get("session").match("true") ? true : false;
        this.sharedService.currentAccount.subscribe( value =>
            this.currentAccount = value
        );
    }

  logout(): void{
    console.log("yooo");
    this.cookieService.put("session", "false");
    this.router.navigateByUrl('/signin');
  }

  ngDoCheck(): void{

  }
}
