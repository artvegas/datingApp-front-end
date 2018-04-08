import { Component } from '@angular/core';
import { Person } from '../person/person';
import { PersonService } from '../person/service/person.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
 title = "Sign Up";

 constructor(private personService: PersonService){
 }
 model = new Person("", "", "", "", "", "", "", "", "", "", "", "");

 private ssn: string;
 private username: string;
 private password: string;
 private firstName: string;
 private lastName: string;
 private email: string;
 private telephone: string;
 private street: string;
 private state: string;
 private city: string;
 private zipcode: number;

 persons: Person[];

getPersons(): void {
  console.log(this.personService);
  this.personService.getAllPerson().subscribe(persons => this.persons = persons);
}

onSubmit(form) {
  console.log("adding person to server\n");
  this.getPersons();
  this.personService.addPerson(this.model).subscribe(response => console.log(response));
}
 ssnPattern = '^\\d{3}-?\\d{2}-?\\d{4}$';
 phonePattern = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';
 emailPattern = '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$';

ngDoCheck(): void{
  console.log(this.persons, "persons");
}

}
