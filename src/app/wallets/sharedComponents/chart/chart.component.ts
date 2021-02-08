import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
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
}
