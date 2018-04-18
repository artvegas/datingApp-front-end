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
export class SignInComponent {
  model = new Person(null, null, null, null, null, null, null, null, null, null);
  private password: string;
  private email: string;
  alertShow = false;
  alertMessage = "";

  emailPattern = '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$';

  constructor(private personService: PersonService, private router: Router,
  private cookieService:CookieService, private sharedService : SharedService){}

  onSubmit(form) : void {
    console.log("logging in person to server\n");
    this.personService.login(this.model).subscribe(
      response => this.showAlert(response)
  )}

  showAlert(response) : void {
    if(response.statusCode != 200){
      this.alertShow = true;
      this.alertMessage = response.status;
    }else{
      this.cookieService.putObject("userData", response.object);
      this.cookieService.put("session", "true");
      this.userIsLoggedIn();
      this.router.navigateByUrl('/profile');
    }
  }

  userIsLoggedIn(){
    this.sharedService.userIsLoggedIn.next(true);
  }
}
