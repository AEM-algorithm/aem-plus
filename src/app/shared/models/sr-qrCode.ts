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
}
