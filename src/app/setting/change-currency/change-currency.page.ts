import { Component, OnInit } from '@angular/core';

import {ExchangeProvider} from '@app/services/exchange/exchange.provider';

@Component({
  selector: 'app-change-currency',
  templateUrl: './change-currency.page.html',
  styleUrls: ['./change-currency.page.scss'],
})
export class ChangeCurrencyPage implements OnInit {
  currencyData = {
    aud: {
      value: 'aud',
      name: 'AUD',
    },
    jpy: {
      value: 'jpy',
      name: 'JPY',
    },
    usd: {
      value: 'usd',
      name: 'USD',
    },
    gbp: {
      value: 'gbp',
      name: 'GBP',
    },
    chf: {
      value: 'chf',
      name: 'CHF',
    },
    cny: {
      value: 'cny',
      name: 'CNY',
    },
    eur: {
      value: 'eur',
      name: 'EUR',
    },
    pln: {
      value: 'pln',
      name: 'PLN',
    },
  };

  selectedCurrency = '';
  data: any;
  isOpen: boolean = false;

  constructor(private exchange: ExchangeProvider) {
  }

  ngOnInit() {
    this.initCurrency();
  }

  async initCurrency() {
    this.data = this.currencyData;
    const currency = await this.exchange.getCurrency();
    this.selectedCurrency = this.data[currency.toLowerCase()];
  }

  openSelectCurrency() {
    this.isOpen = !this.isOpen;
  }

  selectCurrency(selectedCurrency) {
    this.selectedCurrency = selectedCurrency;
    this.openSelectCurrency();
    this.setDefaultData();
    this.exchange.setCurrency(selectedCurrency.name);
  }

  searchCurrency(event) {
    const keyword = event.detail.value?.toLowerCase() || '';
    if (keyword) {
      const result = Object.keys(this.currencyData).filter((value => {
        const values = value.toLowerCase().split('');
        const isValid = values.find((val) => val === keyword);
        if (isValid) {
          return true;
        }
        return value.toLowerCase() === keyword;
      }));
      const searchResult = {};
      result.forEach((value) => {
        searchResult[value] = this.currencyData[value];
      });
      this.data = searchResult;
    } else {
      this.setDefaultData();
    }
  }

  setDefaultData() {
    this.data = this.currencyData;
  }
}
