import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address-list-modal',
  templateUrl: './address-list-modal.component.html',
  styleUrls: ['./address-list-modal.component.scss'],
})
export class AddressListModalComponent implements OnInit {
  constructor(private ModalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.ModalController.dismiss();
  }
}
