import { Person } from "../person/person"

export class User {

  constructor(
    private ssn: string,
    private person: Person,
    private ppp: string,
    private rating: number,
    private dateOfLastAct: Date
  ) {  }

}
