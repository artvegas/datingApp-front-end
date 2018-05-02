import {Person} from "../person/person";

export class Employee{
  constructor(){}

  public person: Person;
  public role: string;
  public startDate: Date;
  public hourlyRate: number;
  public ssn: string;
}
