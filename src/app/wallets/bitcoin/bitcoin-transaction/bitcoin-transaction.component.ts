import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { TransactionFilterModalComponent } from '../../transaction-filter-modal/transaction-filter-modal.component';
import { ViewchangeService } from '../../viewchange.service';

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
      time: 1575118800000,
      incoming: false,
      address: 'JLKJDLKSN3942390482393498JKSNK', //address of the user's wallet
      fee: 0.25,
      amount: 0.000023,
      hash: 'dfjsdljfsadjhfklsdfsdjncnvksdjfisdjfkldf', //???? contains what info???
      confirmations: 1,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      receiver: 'Chaofan',
      recevierAddress: 'sjflkasdkflfsdfaskdfasdfasdf',
      description: 'a transaction from chaofan',
    },
    {
      time: 1578700800000,
      incoming: true,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.000019,
      hash: 'sdfjsdashjdfwohehbvasndalsfasdfadsfdsfdf',
      confirmations: 2,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      receiver: 'Chaofan',
      recevierAddress: 'sdfasdfasdfslkjojdrhnqewlkfn',
      description: 'payment for aem',
    },
    {
      time: 1580475600000,
      incoming: false,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.000002,
      hash: 'fdsnvjnsdjpafhiaqhopajdvnjdnvkldmfdfjf',
      confirmations: 3,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      receiver: 'Dee',
      recevierAddress: 'sdfalkjdfisdjfkhfkjdsfasdfasdfsd',
      description: 'a transaction dee paid ',
    },
    {
      time: 1584921600000,
      incoming: false,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 4,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      receiver: 'Sunny',
      recevierAddress: 'hgsaddavfutytsawASADSDFGSDJYSA',
      description: 'another transaction',
    },
    {
      time: 1586959200000,
      incoming: false,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 5,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      receiver: 'Serin',
      recevierAddress: 'LJGMVKLFDSNSDJKFHAEFSDCDSFfghdfg',
      description: 'a transaction',
    },
    {
      time: 1589810400000,
      incoming: true,
      address: 'JLKJDLKSN3942390482393498JKSNK',
      fee: 0.25,
      amount: 0.00081,
      hash: 'jdfbfdsjkfjsdfoiweuryethbdcjaksnfas',
      confirmations: 6,
      // backend no this value
      amountAUD: 10,
      businessName: 'AEM',
      receiver: 'Jakub',
      recevierAddress: 'xgksjdlfkjerhtndsnclaksdas',
      description: 'a transaction',
    },
  ];

  @Input() isShowChart: boolean;

  filteredTransaction;

  getDate(time: number) {
    return new Date(time).toDateString(); // Mon 18 May 2020
  }
  constructor(private modalCtrl: ModalController, private viewChangeService: ViewchangeService) {}

  ngOnInit() {
    this.filteredTransaction = this.transactions;
  }
  ionViewWillEnter() {
    this.filteredTransaction = this.transactions;
  }

  onFilterData() {
    // open the filter model
    // console.log('filter...');
    this.modalCtrl
      .create({
        component: TransactionFilterModalComponent,
        cssClass: 'transaction-filter-modal-style',
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  onShowChart() {
    this.viewChangeService.showChart.emit(true);
  }

  // onSearchTransaction(e: any) {
  //   console.log(e.target.value);
  // }

  onSearchTransaction(e: any) {
    // console.log(e);
    // console.log(e.target.value);

    this.filteredTransaction = this.transactions;

    const inputValue = e.target.value;

    if (inputValue && inputValue.trim() !== '') {
      this.filteredTransaction = this.filteredTransaction.filter((transaction) => {
        return (
          transaction.receiver.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
          transaction.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
          transaction.recevierAddress.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );
      });
    }
  }
}
