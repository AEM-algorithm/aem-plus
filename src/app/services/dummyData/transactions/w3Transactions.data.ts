import { Transaction } from '../../models/transaction.model';

const rate = 0.1;

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
    hash: 'dfjasdfjasldkfja34sldkfjlasfdfasdfa',
    confirmations: 5,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Serin',
    receiverAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 10) / 1 + rate,
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
    receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: 76839235556,
    tax: (rate * 10) / 1 + rate,
  },
];
