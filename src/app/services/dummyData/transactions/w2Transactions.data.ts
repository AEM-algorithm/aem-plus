import { Transaction } from '../../models/transaction.model';

const today = new Date().getTime();
const rate = 0.1; // hard code

// ------- Mock token transaction

export const w2Transactions: Transaction[] = [
  {
    time: 1575118800000,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,
    amount: 0.000023,
    hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
    confirmations: 1,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Chaofan',
    receiverAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
    description: 'a transaction from chaofan',
    ABN: 76839235556,
    tax: (rate * 10) / 1 + rate,
    // --- how to identify transaction happens on wallet or its token???
    //           quick workaround: add the token id:
    tokenId: 'w2token1',
  },
  {
    time: 1578700800000,
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.000019,
    hash: 'sdfjsdashjdfwohehbvasndalsfasdfadsfdsfdf',
    confirmations: 2,
    // backend no this value
    amountAUD: 880,
    businessName: 'AEM',
    receiver: 'Chaofan',
    receiverAddress: 'sdfasdfasdfslkjojdrhnqewlkfn',
    description: 'payment for aem',
    ABN: 76839235556,
    tax: (rate * 880) / 1 + rate,
    tokenId: 'w2token1',
  },

  {
    time: 1584921600000,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.00081,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 4,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Sunny',
    receiverAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
    description: 'another transaction',
    ABN: 76839235556,
    tax: (rate * 10) / 1 + rate,
  },
  {
    time: 1586959200000,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.00081,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 5,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Serin',
    receiverAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 10) / 1 + rate,
    tokenId: 'w2token1',
  },
  {
    time: 1589810400000,
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.00081,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 6,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Jakub',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 10) / 1 + rate,
    tokenId: 'w2token2',
  },

  // --------------------------------------------------------------------------------
  {
    time: 1610409600000, // 12/01/2021
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.21,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 251,
    businessName: 'AEM',
    receiver: 'Serin',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 251) / 1 + rate,
  },
  {
    time: 1610582432000, //14/01/2021
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.1,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 130,
    businessName: 'AEM',
    receiver: 'Rochelle',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 130) / 1 + rate,
    tokenId: 'w2token1',
  },
  {
    time: 1612879258000, // 10/02/2021
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.51,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 100,
    businessName: 'AEM',
    receiver: 'Sunny',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 100) / 1 + rate,
  },
  {
    time: 1613260800000, // 14/02/2021
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.27,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 150,
    businessName: 'AEM',
    receiver: 'Jakub',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 150) / 1 + rate,
  },

  //   ---> for testing day filter
  {
    time: +today,
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.61,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 120,
    businessName: 'AEM',
    receiver: 'Today1',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 210) / 1 + rate,
    tokenId: 'w2token2',
  },
  {
    time: +today + 1232,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.71,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 210,
    businessName: 'AEM',
    receiver: 'Today2',
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',

    ABN: 76839235556,
    tax: (rate * 210) / 1 + rate,
  },
];
