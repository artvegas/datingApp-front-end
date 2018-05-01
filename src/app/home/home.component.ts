import { Component } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { SharedService } from '../active/service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 title = "Dating App";

 constructor(private cookieService: CookieService, private sharedService: SharedService,
  private router: Router){}

 userLoggedIn = false;
 ngOnInit() {
   this.sharedService.userIsLoggedIn.subscribe( value =>
       this.userLoggedIn = value
   );

   if(this.cookieService.get("session") === "true"){
       this.sharedService.userIsLoggedIn.next(true);
   }else{
       this.sharedService.userIsLoggedIn.next(false);
   }

  if(this.userLoggedIn == true){
    this.router.navigateByUrl('/profile');
  }
 }

}
