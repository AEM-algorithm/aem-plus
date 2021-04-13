import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressListModalComponent } from 'src/app/send/address-list-modal/address-list-modal.component';
import { Wallet } from 'src/app/services/models/wallet.model';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.component.html',
  styleUrls: ['./send-modal.component.scss'],
})
export class SendModalComponent implements OnInit {
  @Input() selectedWallet: Wallet;

  selectedType = 'AUD';
  amount = 0.0;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onSelectType(e: any) {
    this.selectedType = e.detail.value;
    console.log('selected type:', this.selectedType);
  }

  showAddressList() {
    this.modalCtrl
      .create({
        component: AddressListModalComponent,
        cssClass: 'height-sixty-modal',
      })
      .then((modal) => {
        modal.present();
      });
  }
}
