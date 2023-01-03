import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { Coin } from '../enums/enums';
import { Router } from '@angular/router';
import { Wallet } from '../services/models/wallet.model';
import { WalletsService } from '../services/wallets/wallets.service';
import { ConfirmModalComponent } from '../export/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-export-invoice',
  templateUrl: './export-invoice.page.html',
  styleUrls: ['./export-invoice.page.scss'],
})
export class ExportInvoicePage implements OnInit {
  constructor(private router: Router) {}

  ionViewWillEnter() {}

  ngOnInit() {}
  onHistory() {
    this.router.navigateByUrl('/tabnav/export/export-history');
  }
  onCreate() {
    this.router.navigateByUrl('/tabnav/export/export-invoice');
  }
}
