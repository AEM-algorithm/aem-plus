// modules
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// component
import { QrCodeComponent } from '../qr-code/qr-code.component';

// services
import {ClipboardProvider} from '@app/services/clipboard/clipboard.provider';
import {ExchangeProvider} from '@app/services/exchange/exchange.provider';
import { Wallet } from 'src/app/services/models/wallet.model';
import { UtilsService } from 'src/app/services/helper/utils.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  @Input() wallet: Wallet;

  fiatCurrency;

  constructor(
    private modalCtrl: ModalController,
    private clipboard: ClipboardProvider,
    private utils: UtilsService,
    private exchange: ExchangeProvider
  ) {}

  async ngOnInit() {
    const currency = await this.exchange.getFiatCurrency();
    this.fiatCurrency = currency.fiatSymbol;
  }

  showQRcode() {
    this.modalCtrl
      .create({
        component: QrCodeComponent,
        componentProps: {
          wallet: this.wallet,
        },
      })
      .then((modalEl) => modalEl.present());
  }

  onCopyAddress(address: string) {
    this.clipboard.copy(address);
    this.utils.showAddressCopyMessage();
  }
}
