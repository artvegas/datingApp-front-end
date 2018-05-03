import { Component } from '@angular/core';
import { User } from '../../models/user/user';
import { Person } from '../../models/person/person';
import { Account } from '../../models/account/account';
import { AccountId } from '../../models/account/accountId';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service'
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class HelpComponent {
  userLoggedIn = false;
  currentAccount = "None";
  currentProfile = "None";
  managerIsLoggedIn = false;
  custRepIsLoggedIn = false;
  constructor(private accountService: AccountService, private cookieService: CookieService,
  private sharedService : SharedService){}

  ngOnInit(): void{

    this.sharedService.currentAccount.subscribe( value =>
        this.currentAccount = value
    );
    this.sharedService.userIsLoggedIn.subscribe( value =>
        this.userLoggedIn = value
    );
    this.sharedService.managerIsLoggedIn.subscribe( value =>
        this.managerIsLoggedIn = value
    );
    this.sharedService.custRepIsLoggedIn.subscribe( value =>
        this.custRepIsLoggedIn = value
    );
    this.sharedService.currentProfile.subscribe( value =>
        this.currentProfile = value
    );
    if(this.cookieService.get("session") === "true"){
      if(this.cookieService.get("managerOn") === "true"){
        this.sharedService.managerIsLoggedIn.next(true);
        this.sharedService.userIsLoggedIn.next(false);
        this.sharedService.custRepIsLoggedIn.next(false);
      }else if(this.cookieService.get("custRepOn") === "true"){
        this.sharedService.custRepIsLoggedIn.next(true);
        this.sharedService.userIsLoggedIn.next(false);
        this.sharedService.managerIsLoggedIn.next(false);
      }else{
        this.sharedService.userIsLoggedIn.next(true);
        this.sharedService.managerIsLoggedIn.next(false);
        this.sharedService.custRepIsLoggedIn.next(false);
      }

    }else{
        this.sharedService.userIsLoggedIn.next(false);
    }
  }
}
