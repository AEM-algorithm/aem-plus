import { Transaction } from '../../models/transaction.model';

const today = new Date().getTime();

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
    recevierAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
    description: 'a transaction from chaofan',
    ABN: '030793768392355',
    tax: 16,
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
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Chaofan',
    recevierAddress: 'sdfasdfasdfslkjojdrhnqewlkfn',
    description: 'payment for aem',
    ABN: '030793768392355',
    tax: 10,
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
    recevierAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
    description: 'another transaction',
    ABN: '030793768392355',
    tax: 10,
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
    recevierAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 10,
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
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 10,
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
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Serin',
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 9,
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
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 10,
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
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 11,
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
    amountAUD: 100,
    businessName: 'AEM',
    receiver: 'Jakub',
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 12,
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
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 13,
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
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',

    ABN: '030793768392355',
    tax: 14,
  },
];
