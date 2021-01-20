import { Injectable } from '@angular/core';
import { Wallet } from '../models/wallet.model';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  //  =====  Mock wallets data =====
  private _wallets: Wallet[] = [
    new Wallet(
      'w1',
      'u1',
      'myBTCwallet1',
      'BTC',
      'sjdfasfl45asdfass454dfasdfsd',
      [100.0, 0.0000123],
      false,
      [],
      'fkjhsdfsdfa',
      ['btc', 'first', 'key', 'more', 'any']
    ),
    new Wallet(
      'w2',
      'u1',
      'myXEMwallet1',
      'NEM',
      'sjdfasfl45asdfass454dfasdfsd',
      [100.0, 0.0000123],
      false,
      [
        { name: 'exmToken1', balance: [78.0, 0.000000042] },
        { name: 'exmToken2', balance: [22.0, 0.000000012] },
      ],
      'fkjhsdfsdfa',
      ['xem', 'first', 'key', 'more', 'any']
    ),
    new Wallet(
      'w3',
      'u1',
      'myETHwallet1',
      'ETH',
      'dfjasdfjasldkfja34sldkfjlasfdfasdfa',
      [172.23, 0.0000233],
      false,
      [
        { name: 'ethToken1', balance: [52.0, 0.0000000082] },
        { name: 'ethToken2', balance: [122.0, 0.00000032] },
      ],
      'fkjhsdfsdfa',
      ['eth', ' first', 'key', 'more', 'any']
    ),
    new Wallet(
      'w4',
      'u1',
      'myBTCwallet2',
      'BTC',
      'fsdfahythdsasdf345erddfgdfsadfht',
      [423.0, 0.0000023],
      false,
      [],
      'fkjhsdfsdfa',
      ['btc', 'second', 'key', 'more', 'any']
    ),
    new Wallet(
      'w5',
      'u1',
      'myXEMwallet2',
      'NEM',
      'fsfgrtutyrrsewr675ewsasdffdhjtutuyeq',
      [289.0, 0.0000343],
      false,
      [
        { name: 'exm2Token1', balance: [120.0, 0.00000029] },
        { name: 'exm2Token2', balance: [169.0, 0.00000042] },
      ],
      'fkjhsdfsdfa',
      ['xem', 'second', 'key', 'more', 'any']
    ),
  ];

  get wallets() {
    return this._wallets;
  }

  constructor() {}
}
