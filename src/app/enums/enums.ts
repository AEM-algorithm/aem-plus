export enum Coin {
  BITCOIN = "BTC",
  NEM = "XEM",
  SYMBOL = "XYM",
}

export enum WalletDataType {
  MNEMONIC = 1,
  PRIVATE_KEY = 2,
}

export enum NotificationType {
  TRANSACTION = 1,
  SYSTEM = 2,
}

export enum TransactionNotificationType {
  UNCONFIRMED_TRANSACTION = 'unconfirmedTransaction',
  CONFIRMED_TRANSACTION = 'confirmTransaction',
}
