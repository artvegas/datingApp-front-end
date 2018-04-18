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
export class AccountComponent {
  constructor(private accountService: AccountService, private cookieService: CookieService,
  private sharedService : SharedService){}
  userData = "";
  userHasNoAccounts = true;
  ccAlert = false;
  alertShow = false;
  alertMessage = "";
  activeAccount = {account: null};
  // model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com", "917-932-7046",
  //  "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
  accountId = new AccountId("", "", "");
  userAccounts = null;
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.getAllUserAccounts(this.userData[0]['ssn']);
    if(this.cookieService.get("currentAccount") != null){
        var tempAccount = JSON.parse(this.cookieService.get("currentAccount"));
        this.useAccount(tempAccount);
    }
    console.log(this.activeAccount, "active");
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

  showAlert(response, account) : void {
    if(response.statusCode != 200){
      this.alertShow = true;
      this.alertMessage = response.status;
    }else{
      this.userAccounts.push(account);
    }
  }

  onSubmit(form) : void {
    console.log("adding new account\n");
    let user : User = new User(this.userData[0]['ssn'], null, null, null, null);
    var account = new Account(this.accountId, user);
    this.accountService.addAccount(account).subscribe(
      response => this.showAlert(response, account)
    )

  }


  activeAccountCheck(account): boolean {
		if (this.activeAccount.account.acctName === account.account.acctName) {
			return true;
		}
		return false;
	}

  useAccount(account){
    this.sharedService.currentAccount.next(account.account.acctName);
    this.activeAccount = account;
    this.cookieService.putObject("currentAccount", account);
  }

  getBtnMessage(account){
    if (this.activeAccount.account.acctName === account.account.acctName) {
			return "Using Account";
		}
		return "Use Account";
  }

}
