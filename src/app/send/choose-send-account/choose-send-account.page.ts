import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-send-account',
  templateUrl: './choose-send-account.page.html',
  styleUrls: ['./choose-send-account.page.scss'],
})
export class ChooseSendAccountPage implements OnInit {

  constructor() { }

  btcTokenList = [
    {
      tokenName: 'Token 1',
      btc: 0.00023,
      aud: 200.89
    },
    {
      tokenName: 'Token 2',
      btc: 0.0023023,
      aud: 230.89
    },
    {
      tokenName: 'Token 3',
      btc: 0.000423,
      aud: 20.89
    },
    {
      tokenName: 'Token 4',
      btc: 5.00023,
      aud: 21234123340.89
    },
    {
      tokenName: 'Token 5',
      btc: 0.03323,
      aud: 20120.89
    },
    {
      tokenName: 'Token 6',
      btc: 0.0073,
      aud: 20230.89
    },
    {
      tokenName: 'Token 7',
      btc: 0.000993,
      aud: 200.89232
    },

  ]

  ngOnInit() {
  }

}
