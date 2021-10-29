import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-export-history',
  templateUrl: './export-history.page.html',
  styleUrls: ['./export-history.page.scss'],
})
export class ExportHistoryPage implements OnInit {
  arrayHistory = [
    {
      "id": 1,
      "time": "10:59 6/05/2021",
      "date": "01/05/2019 - 01/05/2021",
      "wallet_type": "Bitcoin",
      "wallet": [
        {
          "wallet": "My wallet 1 (BTC)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 2 (BTC)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    },
    {
      "id": 2,
      "time": "11:59 6/05/2021",
      "date": "02/05/2019 - 01/05/2021",
      "wallet_type": "Bitcoin",
      "wallet": [
        {
          "wallet": "My wallet 3 (BTC)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 4 (BTC)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    },
    {
      "id": 3,
      "time": "12:59 6/05/2021",
      "date": "03/05/2019 - 01/05/2021",
      "wallet_type": "NEM",
      "wallet": [
        {
          "wallet": "My wallet 1 (NEM)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 2 (NEM)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    },
    {
      "id": 4,
      "time": "13:59 6/05/2021",
      "date": "04/05/2019 - 01/05/2021",
      "wallet_type": "Etherum",
      "wallet": [
        {
          "wallet": "My wallet 1 (ETH)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 2 (ETH)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    },
    {
      "id": 5,
      "time": "14:59 6/05/2021",
      "date": "05/05/2019 - 01/05/2021",
      "wallet_type": "Bitcoin",
      "wallet": [
        {
          "wallet": "My wallet 5 (BTC)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 6 (BTC)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    },
    {
      "id": 6,
      "time": "15:59 6/05/2021",
      "date": "06/05/2019 - 01/05/2021",
      "wallet_type": "Bitcoin",
      "wallet": [
        {
          "wallet": "My wallet 7 (BTC)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 8 (BTC)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    },
    {
      "id": 7,
      "time": "16:59 6/05/2021",
      "date": "07/05/2019 - 01/05/2021",
      "wallet_type": "Bitcoin",
      "wallet": [
        {
          "wallet": "My wallet 9 (BTC)",
          "address": "walletaddress1234567890"
        },
        {
          "wallet": "My wallet 10 (BTC)",
          "address": "walletaddress1234567890"
        }
      ],
      "isSelect": false
    }
  ]
  isShowWallet = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  onShowWallet(id){
    this.arrayHistory.forEach(element => {
      // element.isSelect = true;
      if(id == element.id){
        element.isSelect = true;
      }
    });
  }
  onHideWallet(id){
    this.arrayHistory.forEach(element => {
      // element.isSelect = true;
      if(id == element.id){
        element.isSelect = false;
      }
    });
  }
  onCreate(){
    this.router.navigateByUrl('/tabnav/export/export-invoice');
  }
}
