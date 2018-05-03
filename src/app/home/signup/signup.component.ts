import { Component } from '@angular/core';
import { Person } from '../../models/person/person';
import { PersonService } from '../../models/person/service/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {

 constructor(private personService: PersonService, private router: Router){}
 // model = new Person("111-11-1111", "123456", "Aritra", "Nirmal", "aritranirmal@gmail.com", "917-932-7046",
 //  "109-24 Francis Lewis Blvd", "NY", "Queens", 11429);
 model = new Person(null, null, null, null, null, null, null, null, null, null);
 alertShow = false;
 alertMessage = "";

 private ssn: string;
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
  this.personService.getAllPersons().subscribe(persons => this.persons = persons);
}

onSubmit(form) : void {
  console.log("adding person to server\n");
  this.getPersons();
  this.personService.addPerson(this.model).subscribe(
    response => this.showAlert(response))
}

showAlert(response) : void {
  if(response.statusCode != 200){
    this.alertShow = true;
    this.alertMessage = response.status;
  }else{
    this.router.navigateByUrl('/signin');
  }
}

 ssnPattern = '^\\d{3}-?\\d{2}-?\\d{4}$';
 phonePattern = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';
 emailPattern = '^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4})?$';

ngDoCheck(): void{
  console.log(this.persons, "persons");
}

}
