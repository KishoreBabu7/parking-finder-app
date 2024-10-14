import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../models/parking-spot.model';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpotService {
  private apiUrl = 'http://localhost:8080/api/parking-spots';

  constructor(private http: HttpClient) {}

  getParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.apiUrl);
  }

  addParkingSpot(parkingSpot: ParkingSpot): Observable<ParkingSpot> {
    return this.http.post<ParkingSpot>(this.apiUrl, parkingSpot);
  }
}
