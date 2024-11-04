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
  selectedYear: number = 2023; 

  // Declare properties for user counts
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
        this.updateChartOptions();

        // Update the user counts based on fetched data
        this.calculateUserStatistics();
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }

  calculateUserStatistics(): void {
    // Calculate total users
    this.totalUsers = this.monthlyUserData.reduce((acc, user) => acc + user.count, 0);

    // Calculate active users (you can modify the logic as needed)
    this.activeUsers = this.monthlyUserData.length > 0 ? this.monthlyUserData.filter(user => user.count > 0).length : 0;

    // Calculate new users for the current month (assuming the current month is in the data)
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    const currentMonthData = this.monthlyUserData.find(user => user.month === currentMonth && user.year === currentYear);
    this.newUsersThisMonth = currentMonthData ? currentMonthData.count : 0;
  }

  updateChartOptions(): void {
    const months = this.monthlyUserData.map(item => item.month);
    const userCounts = this.monthlyUserData.map(item => item.count);

    this.chartOptions = {
      chart: { type: 'line' },  
      title: { text: 'Monthly User Growth' },
      xAxis: { categories: months, title: { text: 'Month' } },
      yAxis: { min: 0, title: { text: 'Number of Users' } },
      series: [{ name: 'Users', type: 'line', data: userCounts }]  
    };
  }

  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const year = parseInt(selectElement.value, 10);
    this.selectedYear = year;
    this.fetchMonthlyUserData(this.selectedYear);
  }
}
