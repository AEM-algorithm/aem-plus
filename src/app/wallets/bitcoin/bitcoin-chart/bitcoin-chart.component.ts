import { Component, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-bitcoin-chart',
  templateUrl: './bitcoin-chart.component.html',
  styleUrls: ['./bitcoin-chart.component.scss'],
})
export class BitcoinChartComponent implements OnInit {
  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    const myChart = new Chart('btcChart', {
      type: 'line',
      title: 'BTC',

      // display: false, // show title or not
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'balance',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            // backgroundColor: 'none',
            borderColor: [' #216E9A'],
            // boxShadow: '0px 3px 6px #00000029',
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        // title: {
        //   text: 'BTC',
        //   display: true,
        //   position: 'top',
        // },
        legend: {
          // without legend
          display: false,
          // labels: {
          //   fontSize: 9,
          //   fontColor: '#074673',
          // },
        },

        scales: {
          yAxes: [
            {
              // type: 'logarithmic',
              gridLines: {
                drawBorder: false,
                color: '#f9fafc',
                // },
              },
              ticks: {
                // properties: https://www.wanna.net.nz/node_modules/chart.js/dist/docs/axes/labelling.html
                fontColor: '#bfbfc4',
                fontFamily: 'Roboto-Light',
                // fontFunction: (tickIndex) => {
                //   if (tickIndex % 2 !== 0) {
                //     return '14px "Gotham Book"';
                //   } else {
                //     return '30px "Gotham Book"';
                //   }
                // },
                // callback: (value) => {
                //   return '$' + value;
                // },
                // display: false,
                // set max/ min range:
                // suggestedMin: 50,     // --- can be always start from 0
                // suggestedMax: 100    // --- the bigest balance
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                display: false,
              },
              ticks: {
                fontColor: '#074673',
                // change the label text:
                // callback: (tickValue, index, ticks) => {
                //   return tickValue;
                // },
              },
              // display: false,
            },
          ],
        },
      },
    });
  }

  // action sheet for selecting a particular time range
  // onSelectQTD() {
  //   this.actionSheetCtrl
  //     .create({
  //       header: 'Select a time',
  //       buttons: [
  //         {
  //           text: 'Today',
  //           handler: () => {
  //             // this.openBookingModal('select');
  //           },
  //         },

  //         {
  //           text: 'Week',
  //           handler: () => {
  //             // handler the payment
  //           },
  //         },
  //         {
  //           text: 'Month',
  //           handler: () => {
  //             // handler the payment
  //           },
  //         },
  //         {
  //           text: 'Year',
  //           handler: () => {
  //             // handler the payment
  //           },
  //         },
  //         {
  //           text: 'All',
  //           handler: () => {
  //             // handler the payment
  //           },
  //         },
  //         { text: 'Cancel', role: 'cancel' },
  //       ],
  //     })
  //     .then((actionSheetEl) => {
  //       actionSheetEl.present();
  //     });
  // }
}
