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

  // Options for the pie chart (user distribution)
  pieChartOptions: Highcharts.Options = {};

  // Options for the bar chart (monthly user data)
  chartOptions: Highcharts.Options = {};

  // Properties for user statistics
  totalUsers: number = 1000; // Example: total number of users
  activeUsers: number = 50; // Example: active users
  newUsersThisMonth: number = 200; // Example: new users this month

  // Array to store monthly user data fetched from the service
  monthlyUserData: MonthlyUser[] = [];

  constructor(private reportingService: ReportingService) {}

  ngOnInit(): void {
    this.initializePieChart(); // Initialize the pie chart for user distribution
    this.fetchMonthlyUserData(); // Fetch monthly data and initialize the bar chart
  }

  // Initialize the pie chart to show user distribution
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

  // Fetch monthly user data from the service and initialize the bar chart
  fetchMonthlyUserData(): void {
    this.reportingService.getMonthlyUsers().subscribe({
      next: (data: MonthlyUser[]) => {
        console.log('Data fetched from backend: ', data);
        this.monthlyUserData = data;
        this.initializeBarChart(); // Initialize the bar chart with fetched data
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  // Initialize the bar chart to show monthly user growth
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
