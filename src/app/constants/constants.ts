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

export const MULTISIG_SUPPORTED_COINS = [
  { id: Coin.BITCOIN, name: 'Bitcoin (BTC)' },
  { id: Coin.NEM, name: 'NEM (XEM)' },
  { id: Coin.SYMBOL, name: 'Symbol (XYM)' },
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

export const ERC_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];
