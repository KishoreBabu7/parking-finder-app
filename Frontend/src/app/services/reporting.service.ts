import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  // Fetch available years
  getAvailableYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/available-years`);
  }

  // Fetch monthly user data for a specific year
  getSpotMonthlyUsers(year: number): Observable<SpotMonthlyUser[]> {
    return this.http.get<SpotMonthlyUser[]>(`${this.baseUrl}/spot-monthly-users/${year}`);
  }

  getSpotMonthlyIncome(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/spot-monthly-income/${year}`);
  }
  

  // Fetch monthly income by a specific spot
  getMonthlyIncomeBySpot(year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/spot-monthly-income/${year}`);
  }
}

// Define the structure for the user data response
export interface SpotMonthlyUser {
  month: string;
  count: number;
}

// Define the structure for the income data response
export interface SpotMonthlyIncome {
  month: string;
  income: number;
  spotName: string;
  year: number;
}
