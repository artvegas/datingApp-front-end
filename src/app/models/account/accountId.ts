export class AccountId {

  constructor(
  ) {  }

  public cardNumber: string;
  public acctNum: string;
  public acctName: string;
  
  getAcctName(): string{
    return this.acctName;
  }

  getCardNum(): string{
    return this.cardNumber;
  }
}
