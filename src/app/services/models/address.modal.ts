interface walletsList {
  type: string;
  address: string;
}

export class Address {
  constructor(
    public id: string,
    public name: string,
    public ABNNum?: number,
    public email?: string,
    public companyAddress?: string,
    public walletsList?: walletsList[]
  ) {}
}
