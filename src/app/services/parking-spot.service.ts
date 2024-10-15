// parking-spot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../models/parking-spot.model';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpotService {
  private apiUrl = 'http://localhost:8080/api/parking-spots'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all parking spots
  getParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.apiUrl);
  }
  // Fetch available parking slots for a specific location
  getAvailableSlots(location: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?location=${location}`);
  }

  // Book a specific slot by its ID
  bookParkingSlot(spotId: number, slotId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${spotId}/slots/${slotId}/book`, {});
  }

  // Unbook a specific slot by its ID
  unbookParkingSlot(spotId: number, slotId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${spotId}/slots/${slotId}/unbook`,
      {}
    );
  }
}
