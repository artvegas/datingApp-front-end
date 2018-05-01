import { Person } from "../person/person"

export class User {

  constructor(
    public ssn: string,
    public person: Person,
    public ppp: string,
    public rating: number,
    public dateOfLastAct: Date
  ) {  }

  setSSN(ssn: string): void{
    this.ssn = ssn;
  }
}
