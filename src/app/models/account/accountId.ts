export class AccountId {

  constructor(
    private cardNumber: string,
    private acctNum: string,
    private acctName: string
  ) {  }

  getAcctName(): string{
    return this.acctName;
  }

  getCardNum(): string{
    return this.cardNumber;
  }
}
