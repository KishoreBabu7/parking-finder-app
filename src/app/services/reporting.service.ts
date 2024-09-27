import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MonthlyUser {
  month: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private apiUrl = 'http://localhost:8080/api/monthly-user'; 

  constructor(private http: HttpClient) { }

  getMonthlyUsers(): Observable<MonthlyUser[]> {
    return this.http.get<MonthlyUser[]>(this.apiUrl);
  }
}