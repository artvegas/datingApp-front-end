import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { Account } from '../../models/account/account';
import { AccountId } from '../../models/account/accountId';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service'
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountComponent {
  constructor(private accountService: AccountService, private cookieService: CookieService){}
  userData = "";
  userHasNoAccounts = true;
  ccAlert = false;
  showAlert = false;
  alertMessage = "";
  // model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com", "917-932-7046",
  //  "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
  accountId = new AccountId("", "", "");
  userAccounts = "";
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.getAllUserAccounts(this.userData[0]['ssn']);
  }

  getAllUserAccounts(ssn: string): void{
    this.accountService.getAccountsWithSSN(ssn).subscribe(response => this.updateUserHasNoAccounts(response));
  }

  updateUserHasNoAccounts(response): void{
    this.userHasNoAccounts = response.object == null ? true : false;
    if(this.userHasNoAccounts == false){
      this.userAccounts = response.object;
    }
    console.log(this.userAccounts, "response");
  }


  ValidateCreditCardNumber() : void {
    let ccNum : string = this.accountId.getCardNum();
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if(mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if(amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if(discovRegEx.test(ccNum)) {
      isValid = true;
    }

    this.ccAlert = !isValid;
     console.log(this.ccAlert);
  }

  showAlert(response) : void {
    if(response.statusCode != 200){
      this.alertShow = true;
      this.alertMessage = response.status;
    }
  }

  onSubmit(form) : void {
    console.log("adding new account\n");
    var account = new Account(this.accountId, this.userData[0]);
    this.accountService.addAccount(account).subscribe(
      response => this.showAlert(response)
  )}


}
