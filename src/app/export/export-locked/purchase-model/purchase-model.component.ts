import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-model',
  templateUrl: './purchase-model.component.html',
  styleUrls: ['./purchase-model.component.scss'],
})
export class PurchaseModelComponent implements OnInit {
  // pass price here
  @Input() price: number;
  @Output() updateIsPurchased = new EventEmitter<boolean>();
  isPurchased = true;
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onPurchase() {
    this.closeModal();
    // this.isPurchased = true;
    this.updateIsPurchased.emit(this.isPurchased);
    this.router.navigateByUrl('/tabnav/export');
    console.log('purchasing...');
  }
}
