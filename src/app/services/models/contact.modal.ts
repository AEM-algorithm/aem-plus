export class ContactWallets {
  id: number;
  type: string;
  address: string;
  description?: string;
}

export class Contact {
  constructor(
    public id: number,
    public image: string,
    public firstName: string,
    public lastName: string,
    public ABNNumber?: number,
    public email?: string,
    public phone?: string,
    public companyAddress?: string,
    public companyName?: string,
    public wallets?: ContactWallets[]
  ) {}
}
