export class Token {
  id: string;
  name: string;
  balance: number[];
  constructor(id: string, name: string, balance: number[]) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }
}
