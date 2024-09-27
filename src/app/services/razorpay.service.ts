import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  name: string;
  email: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  private apiUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  // Method to initiate payment
  initiatePayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/initiate-payment`, data);
  }

  // Method to get transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
}
