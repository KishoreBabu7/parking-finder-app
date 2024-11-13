import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonthlyUser {
  month: string;
  count: number;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMonthlyUsers(year: number): Observable<MonthlyUser[]> {
    // Fixed template literal syntax
    return this.http.get<MonthlyUser[]>(`${this.baseUrl}/monthly-user/${year}`);
  }
}
