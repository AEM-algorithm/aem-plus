import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-node-selection',
  templateUrl: './node-selection.component.html',
  styleUrls: ['./node-selection.component.scss'],
})
export class NodeSelectionComponent implements OnInit {
  nodeSelections = [
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

  addNode() {
    // TODO: add the custom node to the list
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmNode() {
    this.modalCtrl.dismiss();
  }

  onChange(event) {
    console.log(event);
  }
}
