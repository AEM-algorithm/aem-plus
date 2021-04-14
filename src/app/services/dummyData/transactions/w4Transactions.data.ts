import { Transaction } from '../../models/transaction.model';

const rate = 0.1;
export const w4Transactions: Transaction[] = [
  {
    time: 1584921600000,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 3,
    amount: 0.00081,
    hash: 'fsdfahythdsasdf345erddfgdfsadfht',
    confirmations: 4,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Sunny',
    recevierAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
    description: 'another transaction',
    ABN: '030793768392355',
    tax: (rate * 10) / 1 + rate,
  },
  {
    time: 1586959200000,
    incoming: false,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 5,
    amount: 0.00081,
    hash: 'fsdfahythdsasdf345erddfgdfsadfht',
    confirmations: 5,
    // backend no this value
    amountAUD: 398,
    businessName: 'AEM',
    receiver: 'Serin',
    recevierAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: (rate * 398) / 1 + rate,
  },
  {
    time: 1589810400000,
    incoming: true,
    address: 'jknlkasdfjaskdnfaksldfwieeesdf',
    feeCrypto: 0.25,
    feeAud: 7,
    amount: 0.00081,
    hash: 'fsdfahythdsasdf345erddfgdfsadfht',
    confirmations: 6,
    // backend no this value
    amountAUD: 523,
    businessName: 'AEM',
    receiver: 'Jakub',
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: (rate * 523) / 1 + rate,
  },
];
