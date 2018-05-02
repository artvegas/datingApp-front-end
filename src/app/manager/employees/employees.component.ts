import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { User } from '../../models/user/user';
import { Employee } from '../../models/employee/employee';
import { Account } from '../../models/account/account';
import { PersonService } from '../../models/person/service/person.service';
import { AccountService } from '../../models/account/service/account.service'
import { ProfileService } from '../../models/profile/service/profile.service'
import {CookieService} from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../active/service/shared.service';
import { ReportService } from '../service/service';

@Component({
	selector: 'employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
	constructor(
    private accountService: AccountService,
    private cookieService: CookieService,
    private profileService:ProfileService,
    private sharedService : SharedService,
    private reportService: ReportService) {}

  alertSuccess = false;
	userData = "";
	userHasNoAccounts = false;
	userHasNoEmployees = false;
	alertShow = false;
	delEmployee: Employee = null;
	alertMessage = "";
  alertWarning = false;
	delToggle = false;
	delMessage = "";
	activeEmployee: Employee = new Employee();
	editMode = false;
  employee : Employee = new Employee();
  delAlert = false;
  delWarning = false;
	dashboardMessage = "Create New Employee";
	dashboardBtnMessage = "Create Employee";
  allEmployees = [];
  loaded = false;
	// model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com",
	// 	"917-932-7046", "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
	userEmployees: Employee[] = [];
	ngOnInit(): void {
		this.userData = JSON.parse(this.cookieService.get("userData"));
    this.reportService.getAllEmployees().subscribe(
      response => this.updateAllEmployees(response)
    )

    this.resetEmployee();
    console.log(this.employee, "employee");

	}

  resetEmployee(){
    this.employee = new Employee();
    this.employee.hourlyRate = null;
    this.employee.ssn = "";
    this.employee.startDate = null;
    this.employee.person = new Person(null, null, null, null, null, null, null, null, null, null);
  }

	updateAllEmployees(response): void {
		if(response.statusCode === 200){
      this.allEmployees = response.object;
      this.loaded = true;
    }
	}
	onSubmit(form): void {
		console.log("adding new employee\n");
		console.log(form, "form");
		console.log(this.employee);
    this.employee.ssn = this.employee.person.ssn;
		if(this.editMode){
      this.reportService.updateEmployee(this.employee).subscribe(response => this
  			.showAlert(response, this.employee))
    }else{
      this.reportService.addEmployee(this.employee).subscribe(response => this
  			.showAlert(response, this.employee))
    }
	}
	createPersonId(employee){

	}
	showAlert(response, employee): void {
    this.alertShow = false;
    this.alertMessage = "";
    this.alertWarning = false;
		if (response.statusCode !== 200) {
			this.alertMessage = response.status;
      this.alertWarning = true;
		} else {
      this.alertShow = true;
      if(this.editMode){
        this.updatesEditedEmployee(this.employee);
        this.alertMessage = "Sucessfully saved Employee.";
        this.resetEmployee();
      }else{
        this.allEmployees.push(employee);
        console.log(this.allEmployees, "empty user employees");
        this.alertMessage = "Sucessfully created Employee.";
        this.resetEmployee();
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
	editEmployee(employee): void {
		this.editMode = true;
		this.employee = employee;
		this.dashboardMessage = "Editing Employee";
		this.dashboardBtnMessage = "Save Employee";
    this.alertSuccess = false;
	}
	doneEditing(): void {
		this.editMode = false;
		this.resetEmployee();
		this.dashboardMessage = "Create New Employee";
		this.dashboardBtnMessage = "Create Employee";
    this.alertShow = false;
    this.alertMessage = "";
    this.alertWarning = false;
	}
	activeEmployeeCheck(employee): boolean {
		if (this.activeEmployee.ssn === employee.ssn) {
			return true;
		}
		return false;
	}
	editEmployeeCheck(employee): boolean {
		if (this.employee.ssn === employee.ssn) {
			return true;
		}
		return false;
	}
  updatesEditedEmployee(employee): void{
  //  this.allEmployees.filter(x => x.ssn == employee.ssn)[0].person.lastModDate = (new Date());
  }

  getBtnMessageActive(employee){
    if (this.activeEmployee.ssn === employee.ssn) {
				return "Using";
		}
		return "Use";
  }
	getBtnMessageEdit(employee){
    if (this.employee.ssn === employee.ssn) {
				return "Editing";
		}
		return "Edit";
  }
	deleteEmployee(){
		this.reportService.deleteEmployee(this.delEmployee).subscribe(response => this.displayDeleteMsg(response));
	}
	displayDeleteMsg(response){
		this.delToggle = true;
    this.delAlert = false;
    this.delWarning = false;
    this.delMessage = "";
		if(response.statusCode === 200){
      this.delAlert = true;
			this.delMessage = "Succesfuly deleted Employee.";
			for(var i = 0; i < this.allEmployees.length; i++){
				if(this.allEmployees[i].ssn === this.delEmployee.ssn){
					this.allEmployees.splice(i, 1);
				}
			}

		}else{
      this.delWarning = true;
			this.delMessage = response.status;
		}
	}
	setDelEmployee(employee){
		this.delEmployee = employee;
	}

  getDate(time){
    return moment(time).format('MMMM D, Y');
  }
}
