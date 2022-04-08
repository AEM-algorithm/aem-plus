import { Coin } from '@app/enums/enums';

export class CoinInfo {
  public id: Coin;
  public name: string;
}
export const WALLET_ICON = {
  XEM: 'assets/img/nem-icon.png',
  XYM: 'assets/img/symbol-icon.png',
  BTC: 'assets/img/bitcoin.png',
  ETH: 'assets/img/ethereum.png',
  BTC_50: 'assets/img/Bitcoin_50px.png',
};

export const WALLET_NAME = {
  XEM: 'NEM',
  XYM: 'Symbol',
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
};

export const EDIT_WALLET_IMG = {
  yourprivatekey: 'assets/img/edit-wallet/yourprivatekey.jpg',
  youradress: 'assets/img/edit-wallet/youradresskey.jpg',
  yourbalance: 'assets/img/edit-wallet/balance.jpg',
};

export const SUPPORTED_COINS = [
  { id: Coin.BITCOIN, name: 'Bitcoin (BTC)' },
  { id: Coin.NEM, name: 'NEM (XEM)' },
  { id: Coin.SYMBOL, name: 'Symbol (XYM)' },
  { id: Coin.ETH, name: 'Ethereum (ETH)' },
];

export const BIOMETRY_VERIFIED = 'BIOMETRY_VERIFIED';

export const SUPPORTED_CURENCIES = {
  aud: {
    value: 'aud',
    name: 'AUD',
  },
  jpy: {
    value: 'jpy',
    name: 'JPY',
  },
  usd: {
    value: 'usd',
    name: 'USD',
  },
  gbp: {
    value: 'gbp',
    name: 'GBP',
  },
  chf: {
    value: 'chf',
    name: 'CHF',
  },
  cny: {
    value: 'cny',
    name: 'CNY',
  },
  eur: {
    value: 'eur',
    name: 'EUR',
  },
  pln: {
    value: 'pln',
    name: 'PLN',
  },
};

export const ETHERS_NETWORKS = {
  homestead: {
    network_name: 'Ethereum Mainnet',
    spotlight: '#29B6AF',
  },
  ropsten: {
    network_name: 'Ropsten Test Network',
    spotlight: '#FF4A8D',
  },
  rinkeby: {
    network_name: 'Rinkeby Test Network',
    spotlight: '#F6C343',
  },
  goerli: {
    network_name: 'Goerli Test Network',
    spotlight: '#3099F2',
  },
  kovan: {
    network_name: 'Kovan Test Network',
    spotlight: '#9064FF',
  }
};

export const ERC20_ABI_SEND =  [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address'
      },
      {
          'name': '_value',
          'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
          'name': '',
          'type': 'bool'
      }
    ],
  }
];
