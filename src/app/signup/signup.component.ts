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
 model = new Person("111-11-1111", "artvegas", "a6041234", "Aritra", "Nirmal", "aritranirmal@gmail.com",
                    "917-932-7046", "109-24 Francis Lewis", "California", "Queens", "11429");
 // model = new Person("", "", "", "", "", "", "", "", "", "", "", "");

 private ssn: string,
 private username: string,
 private password: string,
 private firstName: string,
 private lastName: string,
 private email: string,
 private telephone: string,
 private address: string,
 private state: string,
 private city: string,
 private zipcode: number

 //console.log(personService.getAllPerson(), "person");
 persons: Person[];

getPersons(): void {
  console.log(this.personService);
  this.personService.getAllPerson().subscribe(persons => this.persons = persons);
}

onSubmit(form) {
  this.getPersons();
}
 ssnPattern = '^\\d{3}-?\\d{2}-?\\d{4}$';
 phonePattern = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';
 emailPattern = '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$';

ngDoCheck(): void{
  console.log(this.persons, "persons");
}

}
