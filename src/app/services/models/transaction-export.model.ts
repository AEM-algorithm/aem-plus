export class TransactionExportModel {
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
    message: string,
  ) {
    this.date = date;
    this.walletAddress = walletAddress;
    this.token = token;
    this.transactionAmount = transactionAmount;
    this.convertedAmount =  convertedAmount;
    this.convertedCurrency = convertedCurrency;
    this.payer = payer;
    this.message = message;
  }
}
