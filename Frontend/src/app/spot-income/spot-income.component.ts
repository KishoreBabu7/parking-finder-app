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
  incomeData: any = {}; // Store the income data per month
  chartOptions: any;
  months: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  constructor(private route: ActivatedRoute, private reportService: ReportService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.spotName = params.get('spotName') || '';
      this.getIncomeDataForSpot();
    });
  }

  // Fetch the monthly income for the selected spot
  getIncomeDataForSpot(): void {
    const year = new Date().getFullYear();
    this.reportService.getMonthlyIncomeBySpot(year).subscribe(
      (data) => {
        // Initialize the data for all months, set income to 0 initially
        this.months.forEach(month => {
          this.incomeData[month] = 0; // Default to 0 for all months
        });

        // Process the data to update the income for the specific spot and month
        data.forEach((item: any) => {
          if (item.parkingSpotName === this.spotName) {
            this.incomeData[item.month] = item.income;
          }
        });

        this.createChart();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Create the chart for the selected spot
  createChart(): void {
    const incomeData = this.months.map((month) => this.incomeData[month]); // Get income data for all months

    this.chartOptions = {
      chart: {
        type: 'column', // Bar chart
      },
      title: {
        text: `Monthly Income for ${this.spotName}`,
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
      series: [
        {
          name: 'Income',
          data: incomeData,
          color: '#7CB5EC',
        },
      ],
    };
  }
}
