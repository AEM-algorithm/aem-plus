import { Transaction } from '../../models/transaction.model';

export const w3Transactions: Transaction[] = [
  {
    time: 1584921600000,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,

    feeAud: 3,
    amount: 0.00081,
    hash: 'dfjasdfjasldkfja34sldkfjlasfdfasdfa',
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
    hash: 'dfjasdfjasldkfja34sldkfjlasfdfasdfa',
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
    hash: 'dfjasdfjasldkfja34sldkfjlasfdfasdfa',
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
