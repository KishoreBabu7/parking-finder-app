import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challan } from '../models/challan.model';

@Injectable({
  providedIn: 'root',
})
export class ChallanService {
  private apiUrl = 'http://localhost:8080/api/challan'; // Adjust the URL based on your backend

  constructor(private http: HttpClient) {}

  createChallan(challan: Challan): Observable<Challan> {
    return this.http.post<Challan>(this.apiUrl, challan);
  }

  processPayment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/payNow/${id}`, {});
  }
}
