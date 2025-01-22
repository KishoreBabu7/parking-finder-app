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

  // Method to create a challan
  // Assuming you have a ChallanService to handle API requests
  createChallan(challanData: Challan): Observable<Challan> {
    return this.http.post<Challan>(
      'http://localhost:8080/api/challan/create',
      challanData
    );
  }
}
