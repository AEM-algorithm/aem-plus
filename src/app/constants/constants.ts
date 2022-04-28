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

export const ERC_20_ABI = [
  {
    "name" : "transfer",
    "type" : "function",
    "inputs" : [
      {
          "name" : "_to",
          "type" : "address"
      },
      {
          "type" : "uint256",
          "name" : "_tokens"
      }
    ],
    "constant" : false,
    "outputs" : [],
    "payable" : false
  }
];


export const ERC_721_ABI= [{
  inputs: [],
  stateMutability: "nonpayable",
  type: "constructor",
},
{
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "owner",
    type: "address",
  },
  {
    indexed: true,
    internalType: "address",
    name: "approved",
    type: "address",
  },
  {
    indexed: true,
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },
  ],
  name: "Approval",
  type: "event",
},
{
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "owner",
    type: "address",
  },
  {
    indexed: true,
    internalType: "address",
    name: "operator",
    type: "address",
  },
  {
    indexed: false,
    internalType: "bool",
    name: "approved",
    type: "bool",
  },
  ],
  name: "ApprovalForAll",
  type: "event",
},
{
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "previousOwner",
    type: "address",
  },
  {
    indexed: true,
    internalType: "address",
    name: "newOwner",
    type: "address",
  },
  ],
  name: "OwnershipTransferred",
  type: "event",
},
{
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "from",
    type: "address",
  },
  {
    indexed: true,
    internalType: "address",
    name: "to",
    type: "address",
  },
  {
    indexed: true,
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },
  ],
  name: "Transfer",
  type: "event",
},
{
  inputs: [{
    internalType: "address",
    name: "to",
    type: "address",
  },
  {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },
  ],
  name: "approve",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address",
  },],
  name: "balanceOf",
  outputs: [{
    internalType: "uint256",
    name: "",
    type: "uint256",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },],
  name: "getApproved",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address",
  },
  {
    internalType: "address",
    name: "operator",
    type: "address",
  },
  ],
  name: "isApprovedForAll",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [],
  name: "name",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [],
  name: "owner",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },],
  name: "ownerOf",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [],
  name: "renounceOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "to",
    type: "address",
  },],
  name: "safeMint",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "from",
    type: "address",
  },
  {
    internalType: "address",
    name: "to",
    type: "address",
  },
  {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },
  ],
  name: "safeTransferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "from",
    type: "address",
  },
  {
    internalType: "address",
    name: "to",
    type: "address",
  },
  {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },
  {
    internalType: "bytes",
    name: "_data",
    type: "bytes",
  },
  ],
  name: "safeTransferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "operator",
    type: "address",
  },
  {
    internalType: "bool",
    name: "approved",
    type: "bool",
  },
  ],
  name: "setApprovalForAll",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "bytes4",
    name: "interfaceId",
    type: "bytes4",
  },],
  name: "supportsInterface",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [],
  name: "symbol",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [{
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },],
  name: "tokenURI",
  outputs: [{
    internalType: "string",
    name: "",
    type: "string",
  },],
  stateMutability: "view",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "from",
    type: "address",
  },
  {
    internalType: "address",
    name: "to",
    type: "address",
  },
  {
    internalType: "uint256",
    name: "tokenId",
    type: "uint256",
  },
  ],
  name: "transferFrom",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
{
  inputs: [{
    internalType: "address",
    name: "newOwner",
    type: "address",
  },],
  name: "transferOwnership",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
},
];
