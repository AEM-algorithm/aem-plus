import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-server-selection',
  templateUrl: './server-selection.component.html',
  styleUrls: ['./server-selection.component.scss'],
})
export class ServerSelectionComponent implements OnInit {
  serverList = [
    '62.75.171.41: 7890',
    'go.75.171.41: 7890',
    'san.75.171.41: 7890',
    'san.75.171.41: 7890',
    'san.75.171.41: 7890',
    'alice6.75.171.41: 7890',
    '62.75.nem.41: 7890',
    '62.75.171.41: 7890',
    'hugealice.75.171.41: 7890',
    '62.75.171.41: 7890',
    '62.nem.171.41: 7890',
    '62.75.171.41: 7890',
  ];
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectedServer(index) {
    // click server item to active the user selected server
    console.log('selected ' + index);
  }

  saveCutomServer() {
    // TODO:
    //   1. add the user custom server to the serverlist
    //   2. show the custom server on the list
    //       ---- not navigate back to wallet page?????
    console.log('added...');
    // this.modalCtrl.dismiss();
  }

  onChange(event) {
    console.log(event);
  }
}
