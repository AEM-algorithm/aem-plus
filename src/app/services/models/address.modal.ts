export class walletAddress {
  type: string;
  address: string;
  description?: string;
}

export class Address {
  constructor(
    public id: string,
    public name: string,
    public ABNNum?: number,
    public email?: string,
    public companyAddress?: string,
    public companyName?: string,
    public walletsAddresses?: walletAddress[]
  ) {}
}
