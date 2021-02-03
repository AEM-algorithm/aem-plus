import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart } from '../../../../../node_modules/chart.js';
import { ViewchangeService } from '../../viewchange.service.js';

@Component({
  selector: 'app-bitcoin-chart',
  templateUrl: './bitcoin-chart.component.html',
  styleUrls: ['./bitcoin-chart.component.scss'],
})
export class BitcoinChartComponent implements OnInit {
  @Input() isShowChart: boolean;

  @Output() hideChart = new EventEmitter<boolean>();

  constructor(private viewChangeService: ViewchangeService) {}

  ngOnInit() {
    //  listen to the chart visibility status
    // this.viewChangeService.chartVisibility.subscribe((data) => {});

    // chart
    const options: {} = {
      responsive: true,
      legend: {
        display: false,
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
              fontFamily: 'Roboto-Light',
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
            fill: false,
            borderColor: ' #216E9A',
            borderWidth: 3,
          },
        ],
      },
      options: options,
    });
  }

  onHideChart(e: boolean) {
    //  click set the visiblitity to false to hide the chart
    // this.viewChangeService.hideChart.emit(false);
    // this.viewChangeService.showChart.emit(false);
    this.hideChart.emit(true);
  }

  // TODO: filter  transaction data by  date
  //  filterTransactionByDate{
  // referece: https://www.chartjs.org/samples/latest/scriptable/line.html
  // }
}
