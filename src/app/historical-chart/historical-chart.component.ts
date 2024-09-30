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
  chartOptions: Highcharts.Options = {}; 
  monthlyUserData: MonthlyUser[] = []; 
  

  totalUsers: number = 0; 
  activeUsers: number = 0; 
  newUsersThisMonth: number = 0; 

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    this.reportingService.getMonthlyUsers().subscribe({
      next: (data: MonthlyUser[]) => {
        console.log('Data fetched from backend: ', data);
        this.monthlyUserData = data;

        this.calculateUserStatistics();
        this.initializeChart();
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  calculateUserStatistics(): void {
    this.totalUsers = this.monthlyUserData.reduce((acc, curr) => acc + curr.count, 0);

    this.activeUsers = Math.floor(Math.random() * this.totalUsers); 
    this.newUsersThisMonth = Math.floor(Math.random() * 20); 
  }

  initializeChart(): void {
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