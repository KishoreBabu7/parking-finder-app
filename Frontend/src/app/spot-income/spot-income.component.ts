import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../services/reporting.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-spot-income',
  templateUrl: './spot-income.component.html',
  styleUrls: ['./spot-income.component.css'],
})
export class SpotIncomeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  spotName: string = '';
  incomeData: any = {}; // Store the income data for each year and month
  chartOptions: any;
  months: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  years: number[] = [2024, 2025]; // Define available years
  selectedYear: number = 2024; // Default selected year

  constructor(private route: ActivatedRoute, private reportService: ReportService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.spotName = params.get('spotName') || '';
      this.getIncomeDataForSpot(); // Fetch data for the default selected year
    });
  }

  // Fetch the monthly income for the selected spot and year
  getIncomeDataForSpot(): void {
    this.reportService.getMonthlyIncomeBySpot(this.selectedYear).subscribe(
      (data) => {
        // Initialize the data for all months for the selected year, set income to 0 initially
        this.incomeData[this.selectedYear] = {};
        this.months.forEach(month => {
          this.incomeData[this.selectedYear][month] = 0; // Default to 0 for all months
        });

        // Process the data to update the income for the specific spot and month
        data.forEach((item: any) => {
          if (item.parkingSpotName === this.spotName && item.year === this.selectedYear) {
            this.incomeData[this.selectedYear][item.month] = item.income || 0; // Ensure we don't set undefined
          }
        });

        this.createChart(); // Update the chart
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Create the chart for the selected spot and year
  createChart(): void {
    const incomeDataForYear = this.months.map((month) => this.incomeData[this.selectedYear][month]);

    this.chartOptions = {
      chart: {
        type: 'column', // Bar chart
      },
      title: {
        text: `Monthly Income for ${this.spotName} in ${this.selectedYear}`,
      },
      xAxis: {
        categories: this.months, // Display all months on the X-axis
        title: {
          text: 'Month',
        },
      },
      yAxis: {
        title: {
          text: 'Income ($)',
        },
      },
      series: [{
        name: `${this.selectedYear}`,
        data: incomeDataForYear,
        color: '#7CB5EC', // Default color for the selected year
      }],
    };
  }

  // Handle the change in year selection
  onYearChange(year: number): void {
    this.selectedYear = year;
    this.getIncomeDataForSpot(); // Fetch data for the new selected year
  }
}