import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-export-history',
  templateUrl: './export-history.page.html',
  styleUrls: ['./export-history.page.scss'],
})
export class ExportHistoryPage implements OnInit {
  arrayExportHistory = [];
  isLoading = false;
  arrayHistory = [];
  isShowWallet = false;
  valueFrom;
  valueTo;
  coinValue;
  walletValue;
  wallet;
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.arrayHistory = await this.storage.get("export-history");
    this.isLoading = true;


  }
  onShowWallet(id) {
    this.arrayHistory.forEach((element, index) => {
      if (id == index) {
        element.isSelect = true;
      }
    });
  }
  onHideWallet(id) {
    this.arrayHistory.forEach((element, index) => {
      if (id == index) {
        element.isSelect = false;
      }
    });
  }
  onCreate(id) {
    let queryParams;
    this.arrayHistory.forEach((element, index) => {
      if (id == index) {
        queryParams = {
          from: element.from,
          to: element.to,
          wallet_type: element.wallet_type,
          wallet: element.wallet,
          wallet_address: element.wallet_address
        };

      }
    });

    this.router.navigate(['/tabnav', 'export', 'export-invoice'],
      {
        queryParams,
      },
    );
  }
}
