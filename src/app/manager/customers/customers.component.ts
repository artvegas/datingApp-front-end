import { Component } from '@angular/core';
import { User } from '../../models/user/user';
import { Person } from '../../models/person/person';
import { Employee } from '../../models/employee/employee';
import { Account } from '../../models/account/account';
import { UserService } from '../../models/user/service/user.service';
import { AccountService } from '../../models/account/service/account.service'
import { ProfileService } from '../../models/profile/service/profile.service'
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../active/service/shared.service';
import { ReportService } from '../service/service';

@Component({
	selector: 'customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
	constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService,
    private reportService: ReportService,
    private userService: UserService) {}

  alertSuccess = false;
	userData = "";
	userHasNoAccounts = false;
	userHasNoUsers = false;
	alertShow = false;
	delUser: User = null;
	alertMessage = "";
  alertWarning = false;
	delToggle = false;
	delMessage = "";
	activeUser: User = new User(null, null, null, null, null);
	editMode = false;
  user : User = new User(null, null, null, null, null);
  delAlert = false;
  delWarning = false;
	dashboardMessage = "Create New User";
	dashboardBtnMessage = "Create User";
  allUsers = [];
  loaded = false;
	// model = new User("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com",
	// 	"917-932-7046", "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
	userUsers: User[] = [];
	ngOnInit(): void {
		this.userData = JSON.parse(this.cookieService.get("userData"));
    this.userService.getAllUsers().subscribe(
      response => this.updateAllUsers(response)
    )

    this.resetUser();
    console.log(this.user, "user");

	}

  resetUser(){
    this.user = new User(null, null, "User-User", null, null);
    this.user.person = new Person(null, null, null, null, null, null, null, null, null, null);
  }

	updateAllUsers(response): void {
		if(response.statusCode === 200){
      this.allUsers = response.object;
      this.loaded = true;
    }
	}

	onSubmit(form): void {
		console.log("adding new user\n");
		console.log(form, "form");
		console.log(this.user);
    this.user.ssn = this.user.person.ssn;
		if(this.editMode){
      this.userService.saveUser(this.user).subscribe(response => this
  			.showAlert(response, this.user))
    }else{
      this.userService.addUser(this.user).subscribe(response => this
  			.showAlert(response, this.user))
    }
	}
	createUserId(user){

	}
	showAlert(response, user): void {
    this.alertShow = false;
    this.alertMessage = "";
    this.alertWarning = false;
		if (response.statusCode !== 200) {
			this.alertMessage = response.status;
      this.alertWarning = true;
		} else {
      this.alertShow = true;
      if(this.editMode){
        this.updatesEditedUser(this.user);
        this.alertMessage = "Sucessfully saved User.";
        this.resetUser();
      }else{
        this.allUsers.push(user);
        console.log(this.allUsers, "empty user users");
        this.alertMessage = "Sucessfully created User.";
        this.resetUser();
      }
		}
	}
	timeSince(date): string {
		var curDate: any = new Date();
		var seconds = Math.floor((curDate - date) / 1000);
		var interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return interval + " years";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes";
		}
		return Math.floor(seconds) + " seconds";
	}
	editUser(user): void {
		this.editMode = true;
		this.user = user;
		this.dashboardMessage = "Editing User";
		this.dashboardBtnMessage = "Save User";
    this.alertSuccess = false;
	}
	doneEditing(): void {
		this.editMode = false;
		this.resetUser();
		this.dashboardMessage = "Create New User";
		this.dashboardBtnMessage = "Create User";
    this.alertShow = false;
    this.alertMessage = "";
    this.alertWarning = false;
	}
	activeUserCheck(user): boolean {
		if (this.activeUser.ssn === user.ssn) {
			return true;
		}
		return false;
	}
	editUserCheck(user): boolean {
		if (this.user.ssn === user.ssn) {
			return true;
		}
		return false;
	}
  updatesEditedUser(user): void{
  //  this.allUsers.filter(x => x.ssn == user.ssn)[0].user.lastModDate = (new Date());
  }

  getBtnMessageActive(user){
    if (this.activeUser.ssn === user.ssn) {
				return "Using";
		}
		return "Use";
  }
	getBtnMessageEdit(user){
    if (this.user.ssn === user.ssn) {
				return "Editing";
		}
		return "Edit";
  }
	deleteUser(){
		this.userService.deleteUser(this.delUser).subscribe(response => this.displayDeleteMsg(response));
	}
	displayDeleteMsg(response){
		this.delToggle = true;
    this.delAlert = false;
    this.delWarning = false;
    this.delMessage = "";
		if(response.statusCode === 200){
      this.delAlert = true;
			this.delMessage = "Succesfuly deleted User.";
			for(var i = 0; i < this.allUsers.length; i++){
				if(this.allUsers[i].ssn === this.delUser.ssn){
					this.allUsers.splice(i, 1);
				}
			}

		}else{
      this.delWarning = true;
			this.delMessage = response.status;
		}
	}
	setDelUser(user){
		this.delUser = user;
	}

  getDate(time){
    return moment(time).format('MMMM D, Y');
  }
}
