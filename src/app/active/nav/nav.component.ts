import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'active-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class ActiveNavComponent {

  constructor(private router:Router, private cookieService: CookieService){}
  // ngOnInit() {
  //       this.userLoggedIn = this.cookieService.get("session").match("true") ? true : false;
  //
  //   }

  logout(): void{
    console.log("yooo");
    this.cookieService.put("session", "false");
    this.router.navigateByUrl('/signin');
  }

  ngDoCheck(): void{
    
  }
}
