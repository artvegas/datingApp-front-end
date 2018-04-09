import { Component } from '@angular/core';
import { Person } from '../person/person';
import { PersonService } from '../person/service/person.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(personService: PersonService){}

  userHasNoAccounts = true;
}
