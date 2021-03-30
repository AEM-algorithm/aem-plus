import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressDetailModalComponent } from '../address-detail-modal/address-detail-modal.component'
import { addressList } from '../../services/dummyData/address-list.data'
import { AddressList} from '../../services/models/address-list.modal'

@Component({
  selector: 'app-address-list-modal',
  templateUrl: './address-list-modal.component.html',
  styleUrls: ['./address-list-modal.component.scss'],
})
export class AddressListModalComponent implements OnInit {

  addressList: AddressList[] = addressList;

  constructor(
    private listModalController: ModalController,
    private detailModalController: ModalController,
    ) {}

  ngOnInit() {}

  closeModal() {
    this.listModalController.dismiss();
  }

  openDetailModal() {
    this.closeModal()
    this.detailModalController
    .create({
      component: AddressDetailModalComponent,
      cssClass: 'height-sixty-modal',
    })
    .then((modal) => {
      modal.present();
    });
  }
}
