import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitcoin-transaction',
  templateUrl: './bitcoin-transaction.component.html',
  styleUrls: ['./bitcoin-transaction.component.scss'],
})
export class BitcoinTransactionComponent implements OnInit {
  // ===== Backend data structure: =====
  // time: number,
  // incoming: boolean,
  // address: string,
  // fee: number,
  // amount: number,
  // hash: string,
  // confirmations: number,
  transactions = [
    {
      time: 1575118800000, //2018-12-29T18:30:00.000Z
      incoming: false,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.000023,
      hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
      confirmations: 1,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      trader: 'Chaofan',
    },
    {
      time: 1578700800000,
      incoming: true,
      address: 'HJSLKDJ3J8689JHKJHKJJNJKN73',
      fee: 0.25,
      amount: 0.000019,
      hash: 'sdfjsdashjdfwohehbvasndalsfasdfadsfdsfdf',
      confirmations: 2,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      trader: 'Chaofan',
    },
    {
      time: 1580475600000,
      incoming: false,
      address: 'KJKJNCJSHF7694JNBCEIWFJNF',
      fee: 0.25,
      amount: 0.000002,
      hash: 'fdsnvjnsdjpafhiaqhopajdvnjdnvkldmfdfjf',
      confirmations: 3,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      trader: 'Dee',
    },
    {
      time: 1584921600000,
      incoming: false,
      address: 'JNAODJSA8234928JBJN9234Uh',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 4,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      trader: 'Sunny',
    },
    {
      time: 1586959200000,
      incoming: false,
      address: 'JNAODJSA8234928JBJN9234Uh',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 5,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      trader: 'Serin',
    },
    {
      time: 1589810400000,
      incoming: true,
      address: 'JNAODJSA8234928JBJN9234Uh',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 6,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      trader: 'Jakub',
    },
  ];

  getDate(time: number) {
    const date = new Date(time);
    // return date.getMonth() + date.getUTCDay() + date.getUTCFullYear();
    return date.toUTCString();
  }
  constructor() {}

  ngOnInit() {
    // Date maniplulations;
    // let number = 1570752000000;
    // // let date = new Date(number * 1000);
    // let date = new Date(number);
    // console.log(date.toISOString());
    // console.log(date.toUTCString());
    // console.log(date.getDate());
    // console.log(date.getFullYear());
  }
}

/*

For later testing:
    date time in numbers:

    1546308231 ------- Tue Jan 01 2019 13:03:51 GMT+1100 (Australian Eastern Daylight Time)
    1570752000000 -----  2019-10-11

    1575118800000 --- 2019-12-1
    1578700800000 --- 2020-01-11
    1580475600000 --- 2020-02-1
    1584921600000 --- 2020-03-23
    1586959200000 --- 2020-4-16
    1589810400000   ---- 2020-5-19

    new Date('2020-5-19').getTime() ----- 1589810400000 
*/
