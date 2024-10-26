import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallanService {
  private apiUrl = 'http://localhost:8080/api/challan'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  createChallan(challanData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, challanData, { headers });
  }
}
