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
  availableYears: number[] = []; // List of available years from the backend
  isLoading: boolean = true; // Track loading state

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAvailableYears(); // Fetch the available years when the component loads
  }

  // Fetch available years from the backend
  fetchAvailableYears(): void {
    this.reportService.getAvailableYears().subscribe(
      (years) => {
        this.availableYears = years;

        // Ensure the current year is in the available years list
        if (!this.availableYears.includes(this.year)) {
          this.year = years[0]; // Default to the first year if the current year is not available
        }

        this.fetchMonthlyIncome(); // Fetch data for the default or selected year
      },
      (error) => {
        console.error('Error fetching available years:', error);
        this.isLoading = false;
      }
    );
  }

  // Fetch spot-wise monthly income data for the selected year
  fetchMonthlyIncome(): void {
    this.reportService.getSpotMonthlyIncome(this.year).subscribe(
      (data) => {
        // Remove duplicates based on parking spot name
        this.spots = Array.from(new Set(data.map((a: any) => a.parkingSpotName)))
          .map(parkingSpotName => {
            return data.find((a: any) => a.parkingSpotName === parkingSpotName);
          });
        this.isLoading = false; // Stop loading when data is fetched
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  // Handle year change and fetch updated data
  onYearChange(year: number): void {
    this.year = year;
    this.fetchMonthlyIncome(); // Fetch data for the new selected year
  }

  // Navigate to the income graph for a selected spot
  viewIncomeGraph(spot: any): void {
    this.router.navigate(['/spot-income', spot.parkingSpotName]);
  }
}