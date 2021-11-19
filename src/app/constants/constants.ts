import { Coin } from "@app/enums/enums";
export class CoinInfo {
  public id: Coin
  public name: string
}
export const WALLET_ICON = {
  XEM: 'assets/img/nem-icon.png',
  XYM: 'assets/img/symbol-icon.png',
  BTC: 'assets/img/bitcoin.png',
  ETH: 'assets/img/ethereum.png',
};

export const SUPPORTED_COINS = {
  BITCOIN: { id: Coin.BITCOIN, name: 'Bitcoin (BTC)' },
  NEM: { id: Coin.NEM, name: "NEM (XEM)" },
  SYMBOL: { id: Coin.SYMBOL, name: "Symbol (XYM)" },
}
export const BIOMETRY_VERIFIED = 'BIOMETRY_VERIFIED';
