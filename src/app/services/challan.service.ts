import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Challan interface with the necessary properties
export interface Challan {
  id?: number;
  name: string; // Added property
  mobile: string; // Added property
  vehicleType: string; // Added property
  plateNumber: string; // Added property
  startTime: string; // Added property
  endTime: string; // Added property
  violationTime?: string; // Added property
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChallanService {
  private apiUrl = 'http://localhost:8080/api/challan'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  createChallan(challanData: Challan): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, challanData, { headers });
  }

  processPayment(challanData: Challan): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment`, challanData);
  }
}
