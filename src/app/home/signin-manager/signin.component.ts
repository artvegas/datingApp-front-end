import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { PersonService } from '../../models/person/service/person.service';
import { Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { SharedService } from '../../active/service/shared.service'

@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInManagerComponent {
  model = new Person(null, null, null, null, null, null, null, null, null, null);
  private password: string;
  private email: string;
  alertShow = false;
  alertMessage = "";
  role = "0";
  emailPattern = '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$';

  constructor(private personService: PersonService, private router: Router,
  private cookieService:CookieService, private sharedService : SharedService){}

  onSubmit(form) : void {
    console.log("logging in person to server\n");
    if(this.role === "1")
    {
      this.personService.loginManager(this.model).subscribe(
        response => this.showAlert(response, this.role)
      )
    }else if(this.role === "2"){
      this.personService.loginCustRep(this.model).subscribe(
        response => this.showAlert(response, this.role)
      )
    }
  }

  showAlert(response, role) : void {
    if(response.statusCode != 200){
      this.alertShow = true;
      this.alertMessage = response.status;
    }else{
      this.cookieService.putObject("userData", response.object);
      this.cookieService.put("session", "true");
      if(role === "1"){
        this.cookieService.put("managerOn", "true");
        this.managerIsLoggedIn();
              this.router.navigateByUrl('/reports');
      }else if(role === "2"){
        this.cookieService.put("custRepOn", "true");
        this.custRepIsLoggedIn();
              this.router.navigateByUrl('/edit-customers');
      }
    }
  }

  custRepIsLoggedIn(){
    this.sharedService.custRepIsLoggedIn.next(true);
  }

  managerIsLoggedIn(){
    this.sharedService.managerIsLoggedIn.next(true);
  }

  userIsLoggedIn(){
    this.sharedService.userIsLoggedIn.next(true);
  }
}
