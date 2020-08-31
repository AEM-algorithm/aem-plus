import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitcoin-transaction',
  templateUrl: './bitcoin-transaction.component.html',
  styleUrls: ['./bitcoin-transaction.component.scss'],
})
export class BitcoinTransactionComponent implements OnInit {
  transactions = [
    {
      incoming: false,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.000023,
      hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf',
      confirmations: 1,
    },
    {
      incoming: true,
      address: 'HJSLKDJ3J8689JHKJHKJJNJKN73',
      fee: 0.25,
      amount: 0.000019,
      hash: 'sdfjsdashjdfwohehbvasndalsfasdfadsfdsfdf',
      confirmations: 2,
    },
    {
      incoming: false,
      address: 'KJKJNCJSHF7694JNBCEIWFJNF',
      fee: 0.25,
      amount: 0.000002,
      hash: 'fdsnvjnsdjpafhiaqhopajdvnjdnvkldmfdfjf',
      confirmations: 3,
    },
    {
      incoming: false,
      address: 'JNAODJSA8234928JBJN9234Uh',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 4,
    },
    {
      incoming: false,
      address: 'JNAODJSA8234928JBJN9234Uh',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 5,
    },
    {
      incoming: true,
      address: 'JNAODJSA8234928JBJN9234Uh',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 6,
    },
  ];
  constructor() {}

  ngOnInit() {}
}
