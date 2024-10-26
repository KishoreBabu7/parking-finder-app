import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ReportingService, MonthlyUser } from '../services/reporting.service';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.css']
})
export class HistoricalChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  pieChartOptions: Highcharts.Options = {};

  chartOptions: Highcharts.Options = {};
  totalUsers: number = 1000; 
  activeUsers: number = 50; 
  newUsersThisMonth: number = 200; 

  monthlyUserData: MonthlyUser[] = [];

  constructor(private reportingService: ReportingService) {}

  ngOnInit(): void {
    this.initializePieChart(); 
    this.fetchMonthlyUserData();
  }

  initializePieChart(): void {
    this.pieChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'User Distribution'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          colorByPoint: true
        } as any
      },
      series: [{
        name: 'Users',
        type: 'pie',
        data: [
          { name: 'Total Users', y: this.totalUsers },
          { name: 'Active Users', y: this.activeUsers },
          { name: 'New Users This Month', y: this.newUsersThisMonth }
        ]
      }]
    };
  }
  fetchMonthlyUserData(): void {
    this.reportingService.getMonthlyUsers().subscribe({
      next: (data: MonthlyUser[]) => {
        console.log('Data fetched from backend: ', data);
        this.monthlyUserData = data;
        this.initializeBarChart(); 
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  initializeBarChart(): void {
    const months = this.monthlyUserData.map(item => item.month);
    const userCounts = this.monthlyUserData.map(item => item.count);

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly User Growth'
      },
      xAxis: {
        categories: months,
        title: {
          text: 'Month'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Users'
        }
      },
      series: [{
        name: 'Users',
        type: 'column',
        data: userCounts
      }]
    };
  }
}
