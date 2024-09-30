import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ParkingSpot {
  name: string;
  location: string;
  availability: number;
  slots: { name: string; booked: boolean }[];
  mapUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private parkingSpots: ParkingSpot[] = [
    // Your initial parking spots
  ];

  private parkingSpotsSubject = new BehaviorSubject<ParkingSpot[]>(this.parkingSpots);
  parkingSpots$ = this.parkingSpotsSubject.asObservable();

  addParkingSpot(newSpot: ParkingSpot) {
    this.parkingSpots.push(newSpot);
    this.parkingSpotsSubject.next(this.parkingSpots);
  }

  bookSlot(parkingSpot: ParkingSpot, slotName: string) {
    const slot = parkingSpot.slots.find(s => s.name === slotName);
    if (slot && !slot.booked) {
      slot.booked = true;
      parkingSpot.availability--;
      this.parkingSpotsSubject.next(this.parkingSpots);
    }
  }

  // Other methods...
}
