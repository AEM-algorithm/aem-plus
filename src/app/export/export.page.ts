import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
  // isLocked = 'locked';
  // set to unlock for develop:
  isLocked = 'unlock';
  constructor() {}

  ngOnInit() {}

  onPurchase(unlockExport: string) {
    this.isLocked = unlockExport;
  }
}
