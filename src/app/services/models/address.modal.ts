export class walletAddress {
  type: string;
  address: string;
  description?: string;
}

export class Address {
  constructor(
    public id: number,
    public image: string,
    public fname: string,
    public lname: string,
    public ABNNum?: number,
    public email?: string,
    public phone?: string,
    public companyAddress?: string,
    public companyName?: string,
    public walletsAddresses?: walletAddress[]
  ) {}
}
