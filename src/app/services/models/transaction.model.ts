export class Transaction {
  constructor(
    public time: number,
    public incoming: boolean,
    public address: string, // -------------- address of the user's wallet
    public feeCrypto: number,
    public feeAud: number,
    public amount: number,
    public hash: string, // ------------------  ???? contains what info???
    public confirmations: number, //  --------  pending or confirmed?????
    //  back end without the following data prepoties
    public amountAUD: number,
    public businessName: string, // ----------  user's business name
    public receiver: string, //   ------------  receiver's name
    public receiverAddress: string, //--------- receiver's wallet address
    public description: string,
    // Tax info:
    public ABN: number,
    public tax: number,
    //  --- option token id property to identify the transaction
    public tokenId?: string
  ) {}
}

// ===== Backend data structure: =====
// time: number,
// incoming: boolean,
// address: string,
// fee: number,
// amount: number,
// hash: string,

//  ========= questions:
//    we can get transactions of this wallet by address
//    how to determine which tokens' transaction????
