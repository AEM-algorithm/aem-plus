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
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  async ngOnInit() {
    // console.log(this.symbolPage.getTransactions);  
    this.arrayHistory = await this.storage.get("export-history");
    
    this.isLoading = true;


  }
  onShowWallet(id){
    this.arrayHistory.forEach((element,index) => {
      // element.isSelect = true;
      if(id == index){
        element.isSelect = true;
      }
    });
  }
  onHideWallet(id){
    this.arrayHistory.forEach((element,index)  => {
      // element.isSelect = true;
      if(id == index){
        element.isSelect = false;
      }
    });
  }
  onCreate(){
    this.router.navigateByUrl('/tabnav/export/export-invoice');
  }
}
