import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  // private apiUrl = 'http://your-backend-api-url.com/api/parking'; 

  // constructor(private http: HttpClient) {}

  // getParkingSpaces(location: { lat: number; lng: number }): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/spaces?lat=${location.lat}&lng=${location.lng}`);
  // }
}
