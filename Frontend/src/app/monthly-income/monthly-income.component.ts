import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../services/reporting.service';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.css'],
})
export class MonthlyIncomeComponent implements OnInit {
  spots: any[] = []; // Store the spot-wise data with monthly income
  year: number = new Date().getFullYear(); // Default to the current year

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMonthlyIncome(); // Fetch data when the component loads
  }

  // Fetch spot-wise monthly income data
  fetchMonthlyIncome(): void {
    this.reportService.getSpotMonthlyIncome(this.year).subscribe(
      (data) => {
        // Remove duplicates based on parking spot name
        this.spots = Array.from(new Set(data.map((a: any) => a.parkingSpotName)))
          .map(parkingSpotName => {
            return data.find((a: any) => a.parkingSpotName === parkingSpotName);
          });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Handle year change and fetch updated data
  onYearChange(year: number): void {
    this.year = year;
    this.fetchMonthlyIncome();
  }

  // Navigate to the income graph for a selected spot
  viewIncomeGraph(spot: any): void {
    this.router.navigate(['/spot-income', spot.parkingSpotName]);
  }
}
