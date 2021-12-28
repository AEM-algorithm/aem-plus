import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { WALLET_ICON, WALLET_NAME } from '@app/constants/constants';

@Component({
  selector: 'app-export-history',
  templateUrl: './export-history.page.html',
  styleUrls: ['./export-history.page.scss'],
})
export class ExportHistoryPage implements OnInit {
  arrayExportHistory = [];
  exportHistories = [];
  wallet;
  coinValue;

  walletIcon;
  walletName;
  isLoading = false;

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.setLoading(true);
    this.walletIcon = WALLET_ICON;
    this.walletName = WALLET_NAME;
    this.exportHistories = await this.getExportHistories();
    this.setLoading(false);
  }

  private async getExportHistories() {
   const exportHistories = await this.storage.get('export-history');
   return exportHistories;
  }

  private setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onCollapse(item) {
    this.exportHistories = this.exportHistories.map(value => {
      if (value.isSelected && value.id === item.id) {
        return {...value, isSelected: false};
      } else {
        return {...value, isSelected: value.id === item.id};
      }
    });
  }

  onCreate(item) {
    const selectedHistory = this.exportHistories.find(value => value.id === item.id);
    this.router.navigate(['/tabnav', 'export', 'export-invoice'],
      {
        queryParams: selectedHistory,
      },
    );
  }
}
