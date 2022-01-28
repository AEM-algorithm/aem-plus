export class SendReceiveQrCode {
  public version: number;
  public data: QRCodeData;
  constructor(version: number, data: QRCodeData) {
    this.version = version;
    this.data = data;
  }
}

export class QRCodeData {
  public address: string;
  public walletType: string;
  public amountCurrency: number;
  public amountCrypto: number;
  public selectedTax: number;
  public name: string;
  public msg: string;
  public userInfo: any;
  public type: string;
  public tokenId: string;
  // constructor(
  //   address: string,
  //   walletType: string,
  //   amountCurrency: number,
  //   amountCrypto: number,
  //   selectedTax: string,
  //   name: string,
  //   msg: string,
  //   userInfo: any,
  //   type: string,
  // ) {
  //   this.address = address;
  //   this.walletType = walletType;
  //   this.amountCrypto = amountCrypto;
  //   this.amountCrypto = amountCurrency;
  //   this.selectedTax = selectedTax;
  //   this.name = name;
  //   this.msg = msg;
  //   this.userInfo = userInfo;
  //   this.type = type;
  // }
}
