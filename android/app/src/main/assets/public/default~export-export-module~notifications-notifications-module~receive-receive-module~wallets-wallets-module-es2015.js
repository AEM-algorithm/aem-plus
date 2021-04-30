(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~export-export-module~notifications-notifications-module~receive-receive-module~wallets-wallets-module"],{

/***/ "./src/app/services/dummyData/transactions/w1transaction.data.ts":
/*!***********************************************************************!*\
  !*** ./src/app/services/dummyData/transactions/w1transaction.data.ts ***!
  \***********************************************************************/
/*! exports provided: w1Transctions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w1Transctions", function() { return w1Transctions; });
const today = new Date().getTime();
const rate = 0.1; // hard code
const w1Transctions = [
    //BTC no token
    // time: milliseconds
    //  -------------  2019: Feb,Dec
    {
        transId: 'sdfasdfasdfasdfasdfa',
        time: 1549756800000,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.23,
        hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
        confirmations: 1,
        amountAUD: 10,
        businessName: 'AEM',
        receiver: 'Chaofan',
        receiverAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
        description: 'a transaction from chaofan',
        ABN: 30793768392355,
        tax: (10 * rate) / (1 + rate),
    },
    {
        transId: 's2dfasdfasdfasdfasdf',
        time: 1549929600000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.023,
        hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
        confirmations: 2,
        amountAUD: 18,
        businessName: 'AEM',
        receiver: 'Rochelle',
        receiverAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
        description: 'a transaction from chaofan',
        ABN: 30793768392355,
        tax: (18 * rate) / (1 + rate),
    },
    {
        transId: 'sd3asdfasdfasdfasdfa',
        time: 1549929603322,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.03,
        hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
        confirmations: 3,
        amountAUD: 62,
        businessName: 'AEM',
        receiver: 'Chaofan',
        receiverAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
        description: 'a transaction from chaofan',
        ABN: 30793768392355,
        tax: (62 * rate) / (1 + rate),
    },
    {
        transId: 'sdf5sdfasdfasdfasdfa',
        time: 1575118800000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.0035,
        hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
        confirmations: 4,
        amountAUD: 23,
        businessName: 'AEM',
        receiver: 'Sunny',
        receiverAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
        description: 'a transaction from chaofan',
        ABN: 30793768392355,
        tax: (23 * rate) / (1 + rate),
    },
    // ------------ 2020:
    {
        transId: 'sdfas6fasdfasdfasdfa',
        time: 1578700800000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.19,
        hash: 'sdfjsdashjdfwohehbvasndalsfasdfadsfdsfdf',
        confirmations: 5,
        amountAUD: 89,
        businessName: 'AEM',
        receiver: 'Chaofan',
        receiverAddress: 'sdfasdfasdfslkjojdrhnqewlkfn',
        description: 'payment for aem',
        ABN: 30793768392355,
        tax: (89 * rate) / (1 + rate),
    },
    {
        transId: 'sdfasdfas6fasdfasdfa',
        time: 1580475600000,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.002,
        hash: 'fdsnvjnsdjpafhiaqhopajdvnjdnvkldmfdfjf',
        confirmations: 6,
        amountAUD: 78,
        businessName: 'AEM',
        receiver: 'Rochelle',
        receiverAddress: 'sdfalkjdfisdjfkhfkjdsfasdfasdfsd',
        description: 'a transaction dee paid ',
        ABN: 30793768392355,
        tax: (78 * rate) / (1 + rate),
    },
    {
        transId: 'sdfas7fasdfasdfasdfa',
        time: 1584921600000,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.81,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 7,
        amountAUD: 235,
        businessName: 'AEM',
        receiver: 'Sunny',
        receiverAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
        description: 'another transaction',
        ABN: 793768392355,
        tax: (235 * rate) / (1 + rate),
    },
    {
        transId: 'sdfa8dfasdfasdfasdfa',
        time: 1586959200000,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.67,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 8,
        amountAUD: 120,
        businessName: 'AEM',
        receiver: 'Serin',
        receiverAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
        description: 'a transaction',
        ABN: 9376839235556,
        tax: (120 * rate) / (1 + rate),
    },
    {
        transId: 'sdfasdf9sdfasdfasdfa',
        time: 1589810400000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.91,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 32,
        businessName: 'AEM',
        receiver: 'Jakub',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 3768392355333,
        tax: (32 * rate) / (1 + rate),
    },
    //  ---------- 2021
    {
        transId: 'sdfasd10sdfasdfasdfa',
        time: 1610283600000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.0081,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 99,
        businessName: 'AEM',
        receiver: 'Jakub',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (99 * rate) / (1 + rate),
    },
    {
        transId: 'sdf11dfasdfasdfasdfa',
        time: 1610409600000,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.21,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 10,
        businessName: 'AEM',
        receiver: 'Serin',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (10 * rate) / (1 + rate),
    },
    {
        transId: 'sdfa12fasdfasdfasdfa',
        time: 1610582432000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.1,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 130,
        businessName: 'AEM',
        receiver: 'Rochelle',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (130 * rate) / (1 + rate),
    },
    {
        transId: 'sdfasd13sdfasdfasdfa',
        time: 1612879258000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.51,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 100,
        businessName: 'AEM',
        receiver: 'Sunny',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (100 * rate) / (1 + rate),
    },
    {
        transId: 'sdfasdf131dfasdfasdfa',
        time: 1613260800000,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.27,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 100,
        businessName: 'AEM',
        receiver: 'Jakub',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (100 * rate) / (1 + rate),
    },
    //   ---> for testing day filter
    {
        transId: 'sdfasd15sdfasdfasdfa',
        time: +today,
        incoming: true,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.61,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 120,
        businessName: 'AEM',
        receiver: 'Today1',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (120 * rate) / (1 + rate),
    },
    {
        transId: 'sdfa16fasdfasdfasdfa',
        time: +today + 1232,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.71,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 210,
        businessName: 'AEM',
        receiver: 'Today2',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (210 * rate) / (1 + rate),
    },
    {
        transId: 'sdfa17fasdfasdfasdfa',
        time: +today + 2372,
        incoming: false,
        address: 'sjdfasfl45asdfass454dfasdfsd',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.01,
        hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
        confirmations: 9,
        amountAUD: 300,
        businessName: 'AEM',
        receiver: 'Today2',
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (300 * rate) / (1 + rate),
    },
];


/***/ }),

/***/ "./src/app/services/dummyData/transactions/w2Transactions.data.ts":
/*!************************************************************************!*\
  !*** ./src/app/services/dummyData/transactions/w2Transactions.data.ts ***!
  \************************************************************************/
/*! exports provided: w2Transactions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w2Transactions", function() { return w2Transactions; });
const today = new Date().getTime();
const rate = 0.1; // hard code
// ------- Mock token transaction
const w2Transactions = [
    {
        transId: 'sdfasdfasdfahyhgdsfgu',
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
        transId: 'sdfas2fasdfahyhgdsfgu',
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
        transId: 'sdfasdf3sdfahyhgdsfgu',
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
        transId: 'sdfasfasdfahyhgdsfgu',
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
        transId: 'sdfasdfasd5ahyhgdsfgu',
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
        transId: 'sdfasdf6sdfahyhgdsfgu',
        time: 1610409600000,
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
        transId: 'sdfasdf7sdfahyhgdsfgu',
        time: 1610582432000,
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
        transId: 'sdfasdfasd8ahyhgdsfgu',
        time: 1612879258000,
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
        transId: 'sdfasdfasdf9hyhgdsfgu',
        time: 1613260800000,
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
        transId: 'sdfasdfasd10hyhgdsfgu',
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
        transId: 'sdfasd12sdfahyhgdsfgu',
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


/***/ }),

/***/ "./src/app/services/dummyData/transactions/w3Transactions.data.ts":
/*!************************************************************************!*\
  !*** ./src/app/services/dummyData/transactions/w3Transactions.data.ts ***!
  \************************************************************************/
/*! exports provided: w3Transactions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w3Transactions", function() { return w3Transactions; });
const rate = 0.1;
const w3Transactions = [
    {
        transId: 'jhs1dfddhgjytgfdfs',
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
        transId: 'jhs1dfddgjytgfdfs',
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
        transId: 'jhs1dfddh5jytgfdfs',
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


/***/ }),

/***/ "./src/app/services/dummyData/transactions/w4Transactions.data.ts":
/*!************************************************************************!*\
  !*** ./src/app/services/dummyData/transactions/w4Transactions.data.ts ***!
  \************************************************************************/
/*! exports provided: w4Transactions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w4Transactions", function() { return w4Transactions; });
const rate = 0.1;
const w4Transactions = [
    {
        transId: 'jhs1df2dhgjytgfdfs',
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
        receiverAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
        description: 'another transaction',
        ABN: 76839235556,
        tax: (rate * 10) / 1 + rate,
    },
    {
        transId: 'jhs1dfd1hgjytgfdfs',
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
        receiverAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (rate * 398) / 1 + rate,
    },
    {
        transId: 'jhs1dfdd5gjytgfdfs',
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
        receiverAddress: 'xgksjdlfkjerhtndsnclaksdas',
        description: 'a transaction',
        ABN: 76839235556,
        tax: (rate * 523) / 1 + rate,
    },
];


/***/ }),

/***/ "./src/app/services/dummyData/transactions/w5Transactions.data.ts":
/*!************************************************************************!*\
  !*** ./src/app/services/dummyData/transactions/w5Transactions.data.ts ***!
  \************************************************************************/
/*! exports provided: w5Transactions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w5Transactions", function() { return w5Transactions; });
const rate = 0.1;
const w5Transactions = [
    {
        transId: 'dg3sdadasdfhyty',
        time: 1584921600000,
        incoming: false,
        address: 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
        feeCrypto: 0.25,
        feeAud: 12,
        amount: 0.00081,
        hash: 'fsdfahythdsasdf345erddfgdfsadfht',
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
        transId: 'dg3sdad3sdfhyty',
        time: 1584921600000,
        incoming: false,
        address: 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
        feeCrypto: 0.25,
        feeAud: 9,
        amount: 0.00081,
        hash: 'fsdfahythdsasdf345erddfgdfsadfht',
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
        transId: 'dg3sd5dasdfhyty',
        time: 1584921600000,
        incoming: false,
        address: 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
        feeCrypto: 0.25,
        feeAud: 2,
        amount: 0.00081,
        hash: 'fsdfahythdsasdf345erddfgdfsadfht',
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
        transId: 'dg3sdad9sdfhyty',
        time: 1584921600000,
        incoming: false,
        address: 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
        feeCrypto: 0.25,
        feeAud: 3,
        amount: 0.00081,
        hash: 'fsdfahythdsasdf345erddfgdfsadfht',
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
        transId: 'dg3sdadasd8hyty',
        time: 1586959200000,
        incoming: false,
        address: 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
        feeCrypto: 0.25,
        feeAud: 5,
        amount: 0.00081,
        hash: 'fsdfahythdsasdf345erddfgdfsadfht',
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
        transId: 'dg3sdad7sdfhyty',
        time: 1589810400000,
        incoming: true,
        address: 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
        feeCrypto: 0.25,
        feeAud: 3,
        amount: 0.00081,
        hash: 'fsdfahythdsasdf345erddfgdfsadfht',
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


/***/ }),

/***/ "./src/app/services/dummyData/wallets.data.ts":
/*!****************************************************!*\
  !*** ./src/app/services/dummyData/wallets.data.ts ***!
  \****************************************************/
/*! exports provided: wallets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wallets", function() { return wallets; });
/* harmony import */ var _models_wallet_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/wallet.model */ "./src/app/services/models/wallet.model.ts");
/* harmony import */ var _transactions_w1transaction_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transactions/w1transaction.data */ "./src/app/services/dummyData/transactions/w1transaction.data.ts");
/* harmony import */ var _transactions_w2Transactions_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transactions/w2Transactions.data */ "./src/app/services/dummyData/transactions/w2Transactions.data.ts");
/* harmony import */ var _transactions_w3Transactions_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactions/w3Transactions.data */ "./src/app/services/dummyData/transactions/w3Transactions.data.ts");
/* harmony import */ var _transactions_w4Transactions_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactions/w4Transactions.data */ "./src/app/services/dummyData/transactions/w4Transactions.data.ts");
/* harmony import */ var _transactions_w5Transactions_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transactions/w5Transactions.data */ "./src/app/services/dummyData/transactions/w5Transactions.data.ts");






//  type: BTC, NEM, ETH
const wallets = [
    new _models_wallet_model__WEBPACK_IMPORTED_MODULE_0__["Wallet"]('w1', 'u1', 'myBTCwallet1', 'BTC', 'sjdfasfl45asdfass454dfasdfsd', [100.0, 0.0000123], false, [], 'fkjhsdfsdfa', ['btc', 'first', 'key', 'more', 'any'], _transactions_w1transaction_data__WEBPACK_IMPORTED_MODULE_1__["w1Transctions"]),
    new _models_wallet_model__WEBPACK_IMPORTED_MODULE_0__["Wallet"]('w2', 'u1', 'myXEMwallet1', 'NEM', 'jknlkasdfjaskdnfaksldfwieeesdf', [100.0, 0.0000123], false, [
        // ----- The token db structure????? how to identify a token & its transaction??
        { id: 'w2token1', name: 'exmToken1', balance: [78.0, 0.0000042] },
        { id: 'w2token2', name: 'exmToken2', balance: [22.0, 0.0000012] },
    ], 'fkjhsdfsdfa', ['xem', 'first', 'key', 'more', 'any'], _transactions_w2Transactions_data__WEBPACK_IMPORTED_MODULE_2__["w2Transactions"]),
    new _models_wallet_model__WEBPACK_IMPORTED_MODULE_0__["Wallet"]('w3', 'u1', 'myETHwallet1', 'ETH', 'dfjasdfjasldkfja34sldkfjlasfdfasdfa', [172.23, 0.0000233], false, [
        { id: 'w3token1', name: 'ethToken1', balance: [52.0, 0.0000082] },
        { id: 'w3token2', name: 'ethToken2', balance: [122.0, 0.0000032] },
    ], 'fkjhsdfsdfa', ['eth', ' first', 'key', 'more', 'any'], _transactions_w3Transactions_data__WEBPACK_IMPORTED_MODULE_3__["w3Transactions"]),
    new _models_wallet_model__WEBPACK_IMPORTED_MODULE_0__["Wallet"]('w4', 'u1', 'myBTCwallet2', 'BTC', 'fsdfahythdsasdf345erddfgdfsadfht', [423.0, 0.0000023], false, [], 'fkjhsdfsdfa', ['btc', 'second', 'key', 'more', 'any'], _transactions_w4Transactions_data__WEBPACK_IMPORTED_MODULE_4__["w4Transactions"]),
    new _models_wallet_model__WEBPACK_IMPORTED_MODULE_0__["Wallet"]('w5', 'u1', 'myXEMwallet2', 'NEM', 'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq', [289.0, 0.0000343], false, [
        { id: 'w5token1', name: 'exm2Token1', balance: [120.0, 0.000029] },
        { id: 'w5token2', name: 'exm2Token2', balance: [169.0, 0.000042] },
    ], 'fkjhsdfsdfa', ['xem', 'second', 'key', 'more', 'any'], _transactions_w5Transactions_data__WEBPACK_IMPORTED_MODULE_5__["w5Transactions"]),
];


/***/ }),

/***/ "./src/app/services/models/wallet.model.ts":
/*!*************************************************!*\
  !*** ./src/app/services/models/wallet.model.ts ***!
  \*************************************************/
/*! exports provided: Wallet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wallet", function() { return Wallet; });
class Wallet {
    constructor(walletId, userId, walletName, walletType, walletAddress, walletBalance, isMultisig, tokens, privateKey, mnemonic, transactions) {
        this.walletId = walletId;
        this.userId = userId;
        this.walletName = walletName;
        this.walletType = walletType;
        this.walletAddress = walletAddress;
        this.walletBalance = walletBalance;
        this.isMultisig = isMultisig;
        this.tokens = tokens;
        this.privateKey = privateKey;
        this.mnemonic = mnemonic;
        this.transactions = transactions;
    }
}


/***/ }),

/***/ "./src/app/services/wallets/wallets.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/wallets/wallets.service.ts ***!
  \*****************************************************/
/*! exports provided: WalletsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalletsService", function() { return WalletsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _models_wallet_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/wallet.model */ "./src/app/services/models/wallet.model.ts");
/* harmony import */ var _dummyData_wallets_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dummyData/wallets.data */ "./src/app/services/dummyData/wallets.data.ts");




let WalletsService = class WalletsService {
    constructor() {
        this.wallets = _dummyData_wallets_data__WEBPACK_IMPORTED_MODULE_3__["wallets"];
    }
    getWallets() {
        return this.wallets;
    }
    getAllBalanceAud() {
        let balance = 0;
        this.wallets.forEach((wallet) => {
            balance += wallet.walletBalance[0];
        });
        return balance;
    }
    /**
     * get wallet by id:
     */
    getWallet(id) {
        return this.wallets.find((wallet) => wallet.walletId === id);
    }
    /**
     * Get wallet by address:
     */
    getWalletByAddress(address) {
        return this.wallets.find((wallet) => wallet.walletAddress === address);
    }
    /**
     * Get a wallet's token by token index (use case: navigate to token/ wallet page)
     */
    getTokenByIndex(wallet, index) {
        return wallet.tokens[index];
    }
    /**
     * Get a wallet token by token id
     */
    getToken(wallet, tokenId) {
        return wallet.tokens.find((token) => token.id === tokenId);
    }
    /**
     * Generate the token's transaction from the wallet's all transaction by tokenid
     */
    getTokenTransaction(wallet, tokenId) {
        return wallet.transactions.filter((tran) => tran.tokenId === tokenId);
    }
    /**
     * Get user's a certain type of wallets
     */
    getSameTypeWallets(type) {
        return this.wallets.filter((wallet) => wallet.walletType === type);
    }
    /**
     * Add a wallet by private key (with user's input info)
     */
    addWallet(name, address, type, mnemonic, privateKey) {
        const newWallet = new _models_wallet_model__WEBPACK_IMPORTED_MODULE_2__["Wallet"](
        //  hard code the userId/balance, add empty tokens/pk/transaction,
        (Math.random() * 1000).toString(), 'u1', name, type, address, [100, 0.00003], false, [], privateKey, //pk: sdfasdfasdfasdf
        mnemonic, []);
        console.log(newWallet);
        return this.wallets.push(newWallet);
    }
    // TODO on add wallet page.
    addWalletByMnemonic(name, address, type, mnemonic) {
        const newWallet = new _models_wallet_model__WEBPACK_IMPORTED_MODULE_2__["Wallet"](
        //  hard code the userId/balance, add empty tokens/mnemonic/transaction,
        (Math.random() * 1000).toString(), 'u1', name, type, address, [100, 0.0000003], false, [], '', mnemonic, []);
        console.log(newWallet);
        return this.wallets.push(newWallet);
    }
    updateWalletName(id, newName) {
        let updatedWallets;
        updatedWallets = [
            ...this.wallets.map((wallet) => (wallet.walletId === id ? Object.assign(Object.assign({}, wallet), { walletName: newName }) : Object.assign({}, wallet))),
        ];
        console.log('service:', this.wallets);
        this.wallets = updatedWallets;
    }
    deleteWallet(id) {
        const newWallets = this.wallets.filter((wallet) => wallet.walletId !== id);
        // console.log('new wallets:', newWallets);
        this.wallets = [...newWallets];
    }
    filterWallets(searchStr) {
        return searchStr && searchStr.trim() !== ''
            ? this.wallets.filter((wallet) => {
                return (wallet.walletName.toLowerCase().indexOf(searchStr.toLowerCase()) > -1 ||
                    wallet.walletAddress.toLowerCase().indexOf(searchStr.toLowerCase()) > -1);
            })
            : this.wallets;
    }
    // add trsansaction to the wallet
    sendTransaction(transaction, walletId) {
        const wallet = this.getWallet(walletId);
        wallet.transactions.push(transaction);
    }
};
WalletsService.ctorParameters = () => [];
WalletsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], WalletsService);



/***/ })

}]);
//# sourceMappingURL=default~export-export-module~notifications-notifications-module~receive-receive-module~wallets-wallets-module-es2015.js.map