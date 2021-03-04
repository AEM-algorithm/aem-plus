import { Transaction } from '../../models/transaction.model';

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
  },
];
