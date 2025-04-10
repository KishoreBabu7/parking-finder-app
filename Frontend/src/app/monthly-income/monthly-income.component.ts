import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../services/reporting.service';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.css'],
})
export class MonthlyIncomeComponent implements OnInit {
  spots: any[] = [];
  year: number = new Date().getFullYear();
  availableYears: number[] = [];
  isLoading: boolean = true;

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAvailableYears();
  }

  fetchAvailableYears(): void {
    this.reportService.getAvailableYears().subscribe(
      (years) => {
        this.availableYears = years;
        if (!this.availableYears.includes(this.year)) {
          this.year = years[0];
        }
        this.fetchMonthlyIncome();
      },
      (error) => {
        console.error('Error fetching available years:', error);
        this.isLoading = false;
      }
    );
  }

  fetchMonthlyIncome(): void {
    this.reportService.getSpotMonthlyIncome(this.year).subscribe(
      (data) => {
        // De-duplicate by parkingSpotName
        this.spots = Array.from(new Set(data.map((item: any) => item.parkingSpotName)))
          .map(parkingSpotName => data.find((item: any) => item.parkingSpotName === parkingSpotName));
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  onYearChange(year: number): void {
    this.year = year;
    this.fetchMonthlyIncome();
  }

  viewIncomeGraph(spot: any): void {
    this.router.navigate(['/spot-income', spot.parkingSpotName]);
  }
}
