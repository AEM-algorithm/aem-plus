import { Transaction } from '../../models/transaction.model';

const today = new Date().getTime();

export const w1Transctions: Transaction[] = [
  // time: milliseconds
  //  -------------  2019: Feb,Dec
  {
    time: 1549756800000, // 10/02/2019
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,
    amount: 0.23,
    hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
    confirmations: 1,
    // backend no this value
    amountAUD: 10,
    businessName: 'AEM',
    receiver: 'Chaofan',
    recevierAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
    description: 'a transaction from chaofan',
    ABN: '030793768392355',
    tax: 1,
  },
  {
    time: 1549929600000, // 12/02/2019,
    incoming: true,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.023,
    hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
    confirmations: 2,
    // backend no this value
    amountAUD: 18,
    businessName: 'AEM',
    receiver: 'Rochelle',
    recevierAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
    description: 'a transaction from chaofan',

    ABN: '030793768392355',
    tax: 2,
  },

  {
    time: 1549929603322, // 12/02/2019,
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.03,
    hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
    confirmations: 3,
    // backend no this value
    amountAUD: 62,
    businessName: 'AEM',
    receiver: 'Chaofan',
    recevierAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
    description: 'a transaction from chaofan',
    ABN: '030793768392355',
    tax: 3,
  },

  {
    time: 1575118800000, //01/12/2019
    incoming: true,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.0035,
    hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
    confirmations: 4,
    // backend no this value
    amountAUD: 23,
    businessName: 'AEM',
    receiver: 'Sunny',
    recevierAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
    description: 'a transaction from chaofan',

    ABN: '030793768392355',
    tax: 4,
  },

  // ------------ 2020:
  {
    time: 1578700800000, //11/01/2020
    incoming: true,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.19,
    hash: 'sdfjsdashjdfwohehbvasndalsfasdfadsfdsfdf',
    confirmations: 5,
    // backend no this value
    amountAUD: 89,
    businessName: 'AEM',
    receiver: 'Chaofan',
    recevierAddress: 'sdfasdfasdfslkjojdrhnqewlkfn',
    description: 'payment for aem',
    ABN: '030793768392355',
    tax: 5,
  },
  {
    time: 1580475600000, //01/02/2020
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.002,
    hash: 'fdsnvjnsdjpafhiaqhopajdvnjdnvkldmfdfjf',
    confirmations: 6,
    // backend no this value
    amountAUD: 78,
    businessName: 'AEM',
    receiver: 'Rochelle',
    recevierAddress: 'sdfalkjdfisdjfkhfkjdsfasdfasdfsd',
    description: 'a transaction dee paid ',
    ABN: '030793768392355',
    tax: 6,
  },
  {
    time: 1584921600000, //23/03/2020
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.81,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 7,
    // backend no this value
    amountAUD: 235,
    businessName: 'AEM',
    receiver: 'Sunny',
    recevierAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
    description: 'another transaction',
    ABN: '030793768392355',
    tax: 10,
  },
  {
    time: 1586959200000, //16/04/2020
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.67,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 8,
    // backend no this value
    amountAUD: 120,
    businessName: 'AEM',
    receiver: 'Serin',
    recevierAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 7,
  },
  {
    time: 1589810400000, // 19/05/2020
    incoming: true,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.91,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 32,
    businessName: 'AEM',
    receiver: 'Jakub',
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 8,
  },

  //  ---------- 2021
  {
    time: 1610283600000, // 11/01/2021
    incoming: true,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.0081,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 99,
    businessName: 'AEM',
    receiver: 'Jakub',
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 10,
  },
  {
    time: 1610409600000, // 12/01/2021
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
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
    address: 'sjdfasfl45asdfass454dfasdfsd',
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
  },
  {
    time: 1612879258000, // 10/02/2021
    incoming: true,
    address: 'sjdfasfl45asdfass454dfasdfsd',
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
    address: 'sjdfasfl45asdfass454dfasdfsd',
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
    address: 'sjdfasfl45asdfass454dfasdfsd',
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
  },
  {
    time: +today + 1232,
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
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
  {
    time: +today + 2372,
    incoming: false,
    address: 'sjdfasfl45asdfass454dfasdfsd',
    feeCrypto: 0.25,
    feeAud: 2,

    amount: 0.01,
    hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
    confirmations: 9,
    // backend no this value
    amountAUD: 300,
    businessName: 'AEM',
    receiver: 'Today2',
    recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
    description: 'a transaction',
    ABN: '030793768392355',
    tax: 15,
  },
];
