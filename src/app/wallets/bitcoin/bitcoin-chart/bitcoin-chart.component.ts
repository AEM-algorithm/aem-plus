import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-bitcoin-chart',
  templateUrl: './bitcoin-chart.component.html',
  styleUrls: ['./bitcoin-chart.component.scss'],
})
export class BitcoinChartComponent implements OnInit {
  @Output() showChart = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    // chart
    const options: {} = {
      responsive: true,
      legend: {
        display: false,
      },

      elements: {
        point: {
          radius: 0,
        },
      },

      layout: {
        padding: {
          left: 0,
          right: 5,
          top: 30,
          bottom: 0,
        },
      },

      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: '#f9fafc',
              drawTicks: true,
            },
            position: 'right',
            ticks: {
              display: true,
              fontColor: '#bfbfc4',
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
              fontColor: '#bfbfc4',
              // change the label text:
              // callback: (tickValue, index, ticks) => {
              //   return index %2=== 0 ? tickValue : '';    //hide the label of every 2nd one
              //  or return $ + tickValue; // add the dollar sign before the labels
              // },
            },
          },
        ],
      },
    };

    const transactionChart = new Chart('btcChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            // fill: false,
            borderColor: '#216E9A',
            borderWidth: 3,
            fill: true,
            backgroundColor: '#216E9A',
          },
        ],
      },

      options: options,
    });
  }

  onHideChart() {
    this.showChart.emit(false);
  }

  // TODO: filter  transaction data by  date
  //  filterTransactionByDate{
  // referece: https://www.chartjs.org/samples/latest/scriptable/line.html
  // }
}
