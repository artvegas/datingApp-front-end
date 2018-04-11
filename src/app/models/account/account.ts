import { AccountId } from "./accountId";
import { User } from "../user/user";
export class Account {

  constructor(
    private account: AccountId,
    private user: User
  ) {  }

}
