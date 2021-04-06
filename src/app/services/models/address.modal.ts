interface walletsList {
  type: string;
  address: string;
  note?: string;
}

export class Address {
  constructor(
    public id: string,
    public name: string,
    public ABNNum?: number,
    public email?: string,
    public companyAddress?: string,
    public companyName?: string,
    public walletsList?: walletsList[]
  ) {}
}
