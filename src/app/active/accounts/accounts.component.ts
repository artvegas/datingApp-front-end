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
  alertSuccess = false;
  dashboardMessage = "Create New Account";
  dashboardBtnMessage = "Create Account";
  editMode = false;
  currAcc: Account = new Account();
  delToggle = false;
  delAcct: Account = new Account();
  delMessage = "";
  activeAccount: Account = new Account();
  // model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com", "917-932-7046",
  //  "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
  accountId: AccountId = new AccountId();
  userAccounts = null;
  ngOnInit(): void {
    this.userData = JSON.parse(this.cookieService.get("userData"));
    this.getAllUserAccounts(this.userData[0]['ssn']);
    this.activeAccount.account = new AccountId();
    this.currAcc.account = new AccountId();
    console.log(this.activeAccount, "active");
    this.accountId.cardNumber = "";
    this.accountId.acctNum = "";
    this.accountId.acctName = "";
    if(this.cookieService.get("currentAccount") != null){
        var tempAccount = JSON.parse(this.cookieService.get("currentAccount"));
        this.useAccount(tempAccount);
    }
  }

  getAllUserAccounts(ssn: string): void{
    this.accountService.getAccountsWithSSN(ssn).subscribe(response => this.updatesUserHasNoAccounts(response));
  }

  updatesUserHasNoAccounts(response): void{
    this.userHasNoAccounts = response.object == null ? true : false;
    if(this.userHasNoAccounts == false){
      this.userAccounts = response.object;
    }
    console.log(this.userAccounts, "response");
  }


  ValidatesCreditCardNumber() : void {
    let ccNum : string = this.accountId.cardNumber;
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
      if(this.editMode){
          this.alertMessage = "Error editing account";
      }else{
          this.alertMessage = "Error creating account";
      }
    }else{
      this.alertSuccess = true;
      if(this.editMode){
          this.alertMessage = "Sucesfully edited account";
          this.closeEdit();
      }else{
          this.alertMessage = "Sucesfully created account";
          this.userAccounts.push(account);
      }
    }
  }

  onSubmit(form) : void {
    console.log("adding new account\n");
    let user : User = new User(this.userData[0]['ssn'], null, null, null, null);
    var account = new Account();
    account.user = user;
    account.account = this.accountId;
    if(this.editMode){
      console.log(account, "edit");
      this.accountService.editAccount(account).subscribe(
        response => this.showAlert(response, account)
      )
    }else{
      this.accountService.addAccount(account).subscribe(
        response => this.showAlert(response, account)
      )
    }

  }

  closeEdit(){
    this.editMode = false;
    this.dashboardMessage = "Create New Account";
    this.dashboardBtnMessage = "Create Account";
    this.alertShow = false;
    this.alertSuccess =  false;
    this.alertMessage = "";
    this.accountId = new AccountId();
    this.currAcc = new Account();
  }

  editAccount(account){
   this.currAcc = account;
   this.accountId = account.account;
   this.editMode = true;
   this.dashboardMessage = "Edit Account";
   this.dashboardBtnMessage = "Save Account";
  }


  activeAccountCheck(account): boolean {
		if (this.activeAccount.account.acctNum === account.account.acctNum) {
			return true;
		}
		return false;
	}

  useAccount(account){
    this.sharedService.currentAccount.next(account.account.acctName);
    this.activeAccount = account;
    this.activeAccount.account = account.account;
    this.cookieService.putObject("currentAccount", account);
  }
  getBtnMessageActive(account){
    if (this.activeAccount.account.acctNum === account.account.acctNum) {
      return "Using"
		}
		return "Use";
  }
  getBtnMessageEdit(account){
    if (this.currAcc.account.acctNum === account.account.acctNum) {
      return "Editing"
		}
		return "Edit";
  }
  editAccountCheck(account): boolean {
		if (this.currAcc.account.acctNum === account.account.acctNum) {
			return true;
		}
		return false;
	}

  deleteAccount(){
    var account = new Account();
    let user : User = new User(this.userData[0]['ssn'], null, null, null, null);
    account.account = this.delAcct.account;
    account.user = user;
    this.accountService.deleteAccount(account).subscribe(
      response => this.showDelAlert(response, account))
  }

  showDelAlert(response, account){
    this.delToggle = true;
    if(response.statusCode == 200){
			this.delMessage = "Succesfuly deleted account.";
			for(var i = 0; i < this.userAccounts.length; i++){
				if(this.userAccounts[i].account.acctNum === this.delAcct.account.acctNum){
					this.userAccounts.splice(i, 1);
				}
			}
		}else{
			this.delMessage = "Error deleting account";
		}
  }

}
