import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ParkingSpot } from '../models/parking-spot.model';
import { ParkingSlot } from '../models/parking-slot.model';

@Injectable({
  providedIn: 'root',
})
export class ParkingSpotService {
  private apiUrl = 'http://localhost:8080/api/parking-spots'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all parking spots with their respective slots
  getParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Add error handling for robustness
    );
  }

  // Fetch available parking slots for a specific location (assuming it's based on location filtering)
  getAvailableSlots(location: string): Observable<ParkingSlot[]> {
    return this.http
      .get<ParkingSlot[]>(`${this.apiUrl}?location=${location}`)
      .pipe(catchError(this.handleError));
  }

  // Book a specific slot by its ID
  bookParkingSlot(spotId: number, slotId: number): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/${spotId}/slots/${slotId}/book`, {})
      .pipe(catchError(this.handleError));
  }

  // Unbook a specific slot by its ID
  unbookParkingSlot(spotId: number, slotId: number): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/${spotId}/slots/${slotId}/unbook`, {})
      .pipe(catchError(this.handleError));
  }

  // Common error handling for HTTP requests
  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error); // Log error for debugging
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return a user-friendly error message
    return throwError('Something went wrong; please try again later.');
  }
}
