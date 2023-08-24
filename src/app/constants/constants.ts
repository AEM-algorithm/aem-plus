import { Coin } from '@app/enums/enums';

export class CoinInfo {
  public id: Coin;
  public name: string;
}
export const WALLET_ICON = {
  XEM: origin + '/assets/icon/ic-nem-wallet.png',
  XYM: origin + '/assets/icon/ic-symbol-wallet.png',
  BTC: origin + '/assets/icon/ic-btc-wallet.png',
  ETH: origin + '/assets/icon/ic-eth-wallet.png',
  BNB: origin + '/assets/icon/BNB.png',
  BTC_50: origin + '/assets/icon/ic-btc-wallet.png',
};

export const WALLET_NAME = {
  XEM: 'NEM',
  XYM: 'Symbol',
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  BNB: 'Binance Smart Chain'
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
  { id: Coin.BNB, name: 'Binance Smart Chain (BNB)' },
];

export const MULTISIG_SUPPORTED_COINS = [
  { id: Coin.BITCOIN, name: 'Bitcoin (BTC)' },
  { id: Coin.NEM, name: 'NEM (XEM)' },
  { id: Coin.SYMBOL, name: 'Symbol (XYM)' },
];

export const BIOMETRY_VERIFIED = 'BIOMETRY_VERIFIED';

export const SUPPORTED_CURRENCIES = {
  aud: {
    value: 'aud',
    name: 'AUD',
    fiatSymbol: '$',
    coiMarketCapId: 2782,
  },
  jpy: {
    value: 'jpy',
    name: 'JPY',
    fiatSymbol: '¥',
    coiMarketCapId: 2797,
  },
  usd: {
    value: 'usd',
    name: 'USD',
    fiatSymbol: '$',
    coiMarketCapId: 2781,
  },
  gbp: {
    value: 'gbp',
    name: 'GBP',
    fiatSymbol: '£',
    coiMarketCapId: 2791,
  },
  chf: {
    value: 'chf',
    name: 'CHF',
    fiatSymbol: 'CHF',
    coiMarketCapId: 2785,
  },
  cny: {
    value: 'cny',
    name: 'CNY',
    fiatSymbol: '¥',
    coiMarketCapId: 2787,
  },
  eur: {
    value: 'eur',
    name: 'EUR',
    fiatSymbol: '€',
    coiMarketCapId: 2790,
  },
  pln: {
    value: 'pln',
    name: 'PLN',
    fiatSymbol: 'zł',
    coiMarketCapId: 2805,
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
  },
  sepolia: {
    network_name: 'Sepolia Test Network',
    spotlight: 'rgba(144,100,255,0.53)',
  },
};

export const ERC_20_ABI = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        type: 'uint256',
        name: '_tokens',
      },
    ],
    constant: false,
    outputs: [],
    payable: false,
  },
];

export const ERC_721_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
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
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const SUPPORTED_LANGUAGE = {
  en: { key: 'en', value: 'English' },
  jp: { key: 'jp', value: 'Japanese 日本' },
  zh_CN: { key: 'zh_CN', value: 'Mandarin 普通话' },
  ko: { key: 'ko', value: 'Korean 한국어' },
};

export const rpcMainNetEndpoints = [
  'https://bsc-dataseed1.binance.org/',
  'https://bsc-dataseed2.binance.org/',
  'https://bsc-dataseed3.binance.org/',
  'https://bsc-dataseed4.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed2.defibit.io/',
  'https://bsc-dataseed3.defibit.io/',
  'https://bsc-dataseed4.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/',
  'https://bsc-dataseed2.ninicoin.io/',
  'https://bsc-dataseed3.ninicoin.io/',
  'https://bsc-dataseed4.ninicoin.io/',
];

export const rpcTestNetEndpoints = [
  'https://data-seed-prebsc-1-s1.binance.org:8545/',
  'https://data-seed-prebsc-2-s1.binance.org:8545/',
  'https://data-seed-prebsc-1-s2.binance.org:8545/',
  'https://data-seed-prebsc-2-s2.binance.org:8545/',
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
  'https://data-seed-prebsc-2-s3.binance.org:8545/',
];