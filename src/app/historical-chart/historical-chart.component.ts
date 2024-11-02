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
  lineChartOptions: Highcharts.Options = {};
  barChartOptions: Highcharts.Options = {};
  monthlyUserData: MonthlyUser[] = [];
  selectedYear: number = 2023; 

  totalUsers: number = 0;
  activeUsers: number = 0; 
  newUsersThisMonth: number = 0;

  constructor(private reportingService: ReportingService) {}

  ngOnInit(): void {
    this.fetchMonthlyUserData(this.selectedYear);
  }

  fetchMonthlyUserData(year: number): void {
    this.reportingService.getMonthlyUsers(year).subscribe({
      next: (data: MonthlyUser[]) => {
        this.monthlyUserData = data;
        this.updateLineChartOptions();
        this.updateBarChartOptions();
        this.calculateUserStatistics();
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  calculateUserStatistics(): void {
    this.totalUsers = this.monthlyUserData.reduce((acc, user) => acc + user.count, 0);
    this.activeUsers = this.monthlyUserData.length > 0 ? this.monthlyUserData.filter(user => user.count > 0).length : 0;

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    const currentMonthData = this.monthlyUserData.find(user => user.month === currentMonth && user.year === currentYear);
    this.newUsersThisMonth = currentMonthData ? currentMonthData.count : 0;
  }

  updateLineChartOptions(): void {
    const months = this.monthlyUserData.map(item => item.month);
    const userCounts = this.monthlyUserData.map(item => item.count);

    this.lineChartOptions = {
      chart: { type: 'line' },
      title: { text: 'Monthly User Growth' },
      xAxis: { categories: months, title: { text: 'Month' } },
      yAxis: { min: 0, title: { text: 'Number of Users' } },
      series: [{ name: 'Users', type: 'line', data: userCounts }]
    };
  }

  updateBarChartOptions(): void {
    this.barChartOptions = {
      chart: { type: 'column' },
      title: { text: 'User Statistics' },
      xAxis: { categories: ['Total Users', 'Active Users', 'New Users This Month'], title: { text: 'User Statistics' } },
      yAxis: { min: 0, title: { text: 'Number of Users' } },
      series: [{
        name: 'Users',
        type: 'column',
        data: [this.totalUsers, this.activeUsers, this.newUsersThisMonth]
      }]
    };
  }

  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const year = parseInt(selectElement.value, 10);
    this.selectedYear = year;
    this.fetchMonthlyUserData(this.selectedYear);
  }
}
