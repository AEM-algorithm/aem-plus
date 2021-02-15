import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/services/models/transaction.model.js';
import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() transactionsData: Transaction[];
  // @Output() showChart = new EventEmitter<boolean>();
  @ViewChild('chartRef', { static: true }) chart: ElementRef;

  data: number[];
  labels: string[];

  constructor() {}

  ngOnInit() {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.data = this.transactionsData.map((trans) => trans.amountAUD);
    this.labels = this.transactionsData.map((trans) => months[new Date(trans.time).getMonth()].substring(0, 3));

    console.log(this.data);
    console.log(this.labels);

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

    const transactionChart = new Chart('chart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
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

  onDayFilter() {}

  onWeekFilter() {}
  onMonthFilter() {}
  onYearFilter() {}
}
