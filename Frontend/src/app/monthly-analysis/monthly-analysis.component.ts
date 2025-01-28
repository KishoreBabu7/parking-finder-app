import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monthly-analysis',
  templateUrl: './monthly-analysis.component.html',
  styleUrls: ['./monthly-analysis.component.css']
})
export class MonthlyAnalysisComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  isLoading: boolean = true; // Track loading state

  availableYears: number[] = []; // List of available years
  selectedYear: number = new Date().getFullYear(); // Default to the current year

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAvailableYears(); // Fetch the available years on component load
  }

  // Fetch the available years from the backend
  fetchAvailableYears(): void {
    this.http.get<number[]>('http://localhost:8080/api/reports/available-years').subscribe(
      years => {
        this.availableYears = years;

        // Ensure the current year is in the available years list
        if (!this.availableYears.includes(this.selectedYear)) {
          this.selectedYear = years[0]; // Default to the first year if current year is not available
        }

        this.loadMonthlyUserGrowth(this.selectedYear); // Load data for the selected year
      },
      error => {
        console.error('Error fetching years:', error);
        this.isLoading = false;
      }
    );
  }

  // Load monthly user growth data for the selected year
  loadMonthlyUserGrowth(year: number): void {
    this.isLoading = true; // Show loading indicator
    this.http.get<any[]>(`http://localhost:8080/api/reports/spot-monthly-users/${year}`).subscribe(
      data => {
        const categories = data.map(item => item.month);
        const userCounts = data.map(item => item.count);

        this.chartOptions = {
          chart: { type: 'column' },
          title: { text: `Monthly User Growth - ${year}` },
          xAxis: { categories, title: { text: 'Month' } },
          yAxis: { title: { text: 'User Count' } },
          series: [{ name: 'Users', data: userCounts, type: 'column' }]
        };

        this.isLoading = false; // Stop loading after data is set
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  // Event handler for year change
  onYearChange(): void {
    this.loadMonthlyUserGrowth(this.selectedYear); // Load data for the selected year
  }
}
