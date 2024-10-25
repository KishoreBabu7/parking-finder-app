import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonthlyUser {
  month: string;
  count: number;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private apiUrl = 'http://localhost:8080/api'; // Base URL for your API

  constructor(private http: HttpClient) { }

  // Fetch monthly user data
  getMonthlyUsers(): Observable<MonthlyUser[]> {
    return this.http.get<MonthlyUser[]>(`${this.apiUrl}/monthly-user`);
  }

  // Fetch user statistics
  getUserStatistics(): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(`${this.apiUrl}/user-statistics`);
  }
}
