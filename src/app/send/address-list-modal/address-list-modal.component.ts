import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddressDetailModalComponent } from '../address-detail-modal/address-detail-modal.component'

@Component({
  selector: 'app-address-list-modal',
  templateUrl: './address-list-modal.component.html',
  styleUrls: ['./address-list-modal.component.scss'],
})
export class AddressListModalComponent implements OnInit {

  addressList = [
    {
      name: 'William Shakespeare'
    },
    {
      name: 'Will Smith'
    },
    {
      name: 'Napoleon Bonaparte'
    },
    {
      name: 'George Walker Bush'
    },
    {
      name: 'Albert Einstein'
    },
    {
      name: 'Thomas Alva Edison'
    },
    {
      name: 'Mark Twain'
    },
    {
      name: 'Isaac Newton'
    },
    {
      name: 'Bill Gates'
    },
    {
      name: 'David Beckham'
    },
  ]

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
