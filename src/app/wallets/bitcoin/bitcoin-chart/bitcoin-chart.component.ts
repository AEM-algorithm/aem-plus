import { Component, OnInit } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-bitcoin-chart',
  templateUrl: './bitcoin-chart.component.html',
  styleUrls: ['./bitcoin-chart.component.scss'],
})
export class BitcoinChartComponent implements OnInit {
  // custom the selection options
  customActionSheetOptions: any = {
    header: 'Financial year',
    subHeader: 'Quarter-To-Date',
  };

  timescaleOptions = [
    'Last Financial Year',
    'Last Quarter',
    'Last Month',
    'Current Month',
    'Current Quarter',
    'This Financial Year',
  ];

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
            borderColor: ['rgb(33, 110, 154)'],
            borderWidth: 2,
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
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                // color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'],
                // },
                ticks: {
                  beginAtZero: true,
                },
              },
              // display: false,
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                display: false,
              },
              // display: false,
            },
          ],
        },
      },
    });
  }

  // action sheet for selecting a particular time range
  onSelectQTD() {
    this.actionSheetCtrl
      .create({
        header: 'Select a time',
        buttons: [
          {
            text: 'Today',
            handler: () => {
              // this.openBookingModal('select');
            },
          },

          {
            text: 'Week',
            handler: () => {
              // handler the payment
            },
          },
          {
            text: 'Month',
            handler: () => {
              // handler the payment
            },
          },
          {
            text: 'Year',
            handler: () => {
              // handler the payment
            },
          },
          {
            text: 'All',
            handler: () => {
              // handler the payment
            },
          },
          { text: 'Cancel', role: 'cancel' },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }
}
