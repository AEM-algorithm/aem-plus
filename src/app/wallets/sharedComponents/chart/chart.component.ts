import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Output() showChart = new EventEmitter<boolean>();
  @ViewChild('chartRef', { static: true }) chart: ElementRef;

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

    const gradientBG = this.chart.nativeElement.getContext('2d').createLinearGradient(0, 20, 0, 220);
    gradientBG.addColorStop(0, '#074673');
    gradientBG.addColorStop(0.5, '#41a1c8');

    // console.log(this.chartRef);

    const transactionChart = new Chart('chart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3],
            // fill: false,
            // borderColor: '#f7f7f7',
            borderWidth: 0,
            fill: true,
            backgroundColor: gradientBG,
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
