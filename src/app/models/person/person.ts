export class Person {

  constructor(
    public ssn: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public telephone: string,
    public street: string,
    public state: string,
    public city: string,
    public zipcode: number
  ) {  }

  getSSN(): string{
    return this.ssn;
  }
}
