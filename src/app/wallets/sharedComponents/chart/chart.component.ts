import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HelperFunService } from 'src/app/services/helper/helper-fun.service.js';
import { Transaction } from 'src/app/services/models/transaction.model.js';
import { Chart } from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() transactionsData: Transaction[];
  @ViewChild('chartRef', { static: true }) chart: ElementRef;

  filteredTrans: Transaction[];

  xyAxis: {
    xAxis: string[];
    yAxis: number[];
  };

  startDate: Date;
  endDate: Date;

  constructor(private helperService: HelperFunService) { }

  periodOption = {
    Day: {
      value: 'Day',
      isSelected: false,
    },
    Week: {
      value: 'Week',
      isSelected: false,
    },
    Month: {
      value: 'Month',
      isSelected: false,
    },
    Year: {
      value: 'Year',
      isSelected: false,
    },
    All: {
      value: 'All',
      isSelected: false,
    },
    Custom: {
      value: 'Custom',
      isSelected: false,
    },
  };

  renderPeriodOptions(selection) {
    for (const item in this.periodOption) {
      if (item === selection) {
        const isSelected = this.periodOption[selection].isSelected;
        this.periodOption[selection].isSelected = true;
      } else {
        this.periodOption[item].isSelected = false;
      }
    }
  }

  private getXYAxis(transactions: Transaction[], mode) {
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

    let xAxis: Array<string> = [];

    switch (mode) {
      case 'day':
        xAxis = transactions.map(
          (trans) =>
            new Date(trans.time).getHours() +
            ':' +
            new Date(trans.time).getMinutes()
        );
        break;
      case 'week':
        xAxis = transactions.map(
          (trans) =>
            new Date(trans.time).getDate() +
            '/' +
            months[new Date(trans.time).getMonth()].substring(0, 3)
        );
        break;
      case 'month':
        xAxis = transactions.map(
          (trans) =>
            new Date(trans.time).getDate() +
            '/' +
            months[new Date(trans.time).getMonth()].substring(0, 3)
        );
        break;
      case 'year':
        xAxis = transactions.map(
          (trans) =>
            months[new Date(trans.time).getMonth()].substring(0, 3) +
            '/' +
            new Date(trans.time).getFullYear().toString().substr(-2)
        );
        break;
      case 'all':
        xAxis = transactions.map(
          (trans) =>
            months[new Date(trans.time).getMonth()].substring(0, 3) +
            '/' +
            new Date(trans.time).getFullYear().toString().substr(-2)
        );
        break;
      default:
        xAxis = transactions.map(
          (trans) =>
            months[new Date(trans.time).getMonth()].substring(0, 3) +
            '/' +
            new Date(trans.time).getFullYear().toString().substr(-2)
        );
        break;
    }

    const yAxis = transactions.map((trans) => trans.amountCurrency);
    this.xyAxis = { xAxis: xAxis.reverse(), yAxis: yAxis.reverse() };
    return this.xyAxis;
  }

  private createChart(xyAxis: { xAxis; yAxis }) {
    this.getXYAxis(this.filteredTrans, 'all');

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
              min: 0,
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

    const gradientBG = this.chart.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 20, 0, 220);
    gradientBG.addColorStop(0, '#074673');
    gradientBG.addColorStop(0.5, '#41a1c8');

    const transactionChart = new Chart('chart', {
      type: 'line',
      data: {
        labels: xyAxis.xAxis,
        datasets: [
          {
            data: xyAxis.yAxis,
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

  ngOnInit() {
    // console.log('chart component:', this.transactionsData);
    if (this.transactionsData) {
      this.allData();
    }
  }

  dayFilter() {
    // get today's transactions
    this.filteredTrans = this.helperService.onDayFilter(this.transactionsData);
    // extract labels(amount) & time(month) from filtered data
    // console.log('day:', this.filteredTrans);
    this.xyAxis = this.getXYAxis(this.filteredTrans, 'day');
    // console.log('day', this.xyAxis);
    this.createChart(this.xyAxis);
    this.renderPeriodOptions(this.periodOption.Day.value);
  }

  weekFilter() {
    this.filteredTrans = this.helperService.onWeekFilter(this.transactionsData);
    // console.log('week', this.filteredTrans);
    this.xyAxis = this.getXYAxis(this.filteredTrans, 'week');
    // console.log('week', this.xyAxis);
    this.createChart(this.xyAxis);
    this.renderPeriodOptions(this.periodOption.Week.value);
  }

  monthFilter() {
    this.filteredTrans = this.helperService.onMonthFilter(
      this.transactionsData
    );
    // console.log('month', this.filteredTrans);
    this.xyAxis = this.getXYAxis(this.filteredTrans, 'month');
    // console.log('month', this.xyAxis);
    this.createChart(this.xyAxis);
    this.renderPeriodOptions(this.periodOption.Month.value);
  }

  yearFilter() {
    this.filteredTrans = this.helperService.onYearFilter(this.transactionsData);
    // console.log('year', this.filteredTrans);
    this.xyAxis = this.getXYAxis(this.filteredTrans, 'year');
    // console.log('year', this.xyAxis);
    this.createChart(this.xyAxis);
    this.renderPeriodOptions(this.periodOption.Year.value);
  }

  allData() {
    this.filteredTrans = this.transactionsData;
    // console.log('all', this.filteredTrans);
    this.xyAxis = this.getXYAxis(this.filteredTrans, 'all');
    // console.log('all', this.xyAxis);
    this.createChart(this.xyAxis);
    this.renderPeriodOptions(this.periodOption.All.value);
  }

  getStartDateSel(e: any) {
    this.startDate = new Date(e.detail.value);
    this.customFilter();
  }
  getEndDateSel(e: any) {
    this.endDate = new Date(e.detail.value);
    this.customFilter();
  }

  customFilter() {
    if (this.startDate && this.endDate) {
      this.filteredTrans = this.helperService.dateRangeFilter(
        this.transactionsData,
        this.startDate,
        this.endDate
      );
      this.xyAxis = this.getXYAxis(this.filteredTrans, 'month');
      this.createChart(this.xyAxis);
    }
    this.renderPeriodOptions(this.periodOption.Custom.value);
  }
}
