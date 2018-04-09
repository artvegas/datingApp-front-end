import { Component } from '@angular/core';
import { Person } from '../person/person';
import { PersonService } from '../person/service/person.service';

@Component({
  selector: 'sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {
  model = new Person();
  private password: string;
  private email: string;

  constructor(private personService: PersonService){}

  onSubmit(form) {
    console.log("logging in person to server\n");
    this.personService.login(this.model).subscribe(
      response =>
        console.log(response, "response");
  }
}
