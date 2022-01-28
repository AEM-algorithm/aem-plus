export class ExportTransactionModel {
  date: string;
  walletAddress: string;
  token: string;
  transactionAmount: string;
  convertedAmount: string;
  convertedCurrency: string;
  payer: string;
  message: string;

  constructor(
    date: string,
    walletAddress: string,
    token: string,
    transactionAmount: string,
    convertedAmount: string,
    convertedCurrency: string,
    payer: string,
    message: string
  ) {
    this.date = date;
    this.walletAddress = walletAddress;
    this.token = token;
    this.transactionAmount = transactionAmount;
    this.convertedAmount = convertedAmount;
    this.convertedCurrency = convertedCurrency;
    this.payer = payer;
    this.message = message;
  }

  public format() {
    return {
      ['Date']: this.date,
      ['Wallet Address']: this.walletAddress,
      ['Token']: this.token,
      ['Transaction Amount']: this.transactionAmount,
      ['Converted Amount']: this.convertedAmount,
      ['Converted Currency']: this.convertedCurrency,
      ['Payer']: this.payer,
      ['Message']: this.message,
    };
  }
}
