import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { Account } from '../../models/account/account';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service'
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private accountService: AccountService, private cookieService: CookieService){}
  userData = "";
  userHasNoAccounts = true;
  model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com", "917-932-7046",
   "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    //this.getAllUserAccounts(this.userData[0].ssn);
  }

  getAllUserAccounts(ssn: string): void{
    this.accountService.getAccountsWithSSN(ssn).subscribe(response => this.updateUserHasNoAccounts(response));
  }

  updateUserHasNoAccounts(response): void{
    this.userHasNoAccounts = response.object == null ? true : false;
  }

}
