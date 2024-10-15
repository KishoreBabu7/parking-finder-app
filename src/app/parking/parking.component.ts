import { Component, OnInit } from '@angular/core';
import { ParkingSpotService } from '../services/parking-spot.service';
import { ParkingSpot } from '../models/parking-spot.model';
import { ParkingSlot } from '../models/parking-slot.model';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent implements OnInit {
  searchQuery: string = '';
  isSlotModalOpen: boolean = false;
  parkingSpots: ParkingSpot[] = [];
  filteredCards: ParkingSpot[] = [];
  selectedSpot: ParkingSpot | null = null;

  constructor(private parkingSpotService: ParkingSpotService) {}

  ngOnInit() {
    this.loadParkingSpots();
  }

  loadParkingSpots() {
    this.parkingSpotService
      .getParkingSpots()
      .subscribe((data: ParkingSpot[]) => {
        this.parkingSpots = data;
        this.filteredCards = [...this.parkingSpots];
        console.log('Parking spots loaded:', this.parkingSpots); // Debugging line
      });
  }

  searchParking() {
    this.filteredCards = this.parkingSpots.filter((spot) =>
      spot.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openSlotBookingModal(spot: ParkingSpot) {
    this.selectedSpot = spot;
    console.log('Selected spot:', this.selectedSpot); // Debugging line
    this.isSlotModalOpen = true;
  }

  closeSlotModal() {
    this.isSlotModalOpen = false;
    this.selectedSpot = null;
  }

  // Returns available slots for the selected parking spot
  getAvailableSlots(spot: ParkingSpot | null): ParkingSlot[] {
    if (spot) {
      const availableSlots = spot.slots?.filter((slot) => !slot.booked) || [];
      console.log('Available slots:', availableSlots); // Debugging line
      return availableSlots;
    }
    return [];
  }

  // Handle booking and unbooking of slots
  toggleSlotBooking(slot: ParkingSlot) {
    if (slot.booked) {
      this.unbookSlot(this.selectedSpot!.id, slot.id);
    } else {
      this.bookSlot(this.selectedSpot!.id, slot.id);
    }
  }

  bookSlot(spotId: number, slotId: number) {
    this.parkingSpotService.bookParkingSlot(spotId, slotId).subscribe(
      () => {
        const bookedSlot = this.selectedSpot?.slots?.find(
          (s) => s.id === slotId
        );
        if (bookedSlot) bookedSlot.booked = true;
        alert(
          `You have successfully booked ${this.selectedSpot?.name} - Slot ${slotId}.`
        );
      },
      (error: any) => {
        alert('Failed to book the slot. Please try again.');
      }
    );
  }

  unbookSlot(spotId: number, slotId: number) {
    this.parkingSpotService.unbookParkingSlot(spotId, slotId).subscribe(
      () => {
        const unbookedSlot = this.selectedSpot?.slots?.find(
          (s) => s.id === slotId
        );
        if (unbookedSlot) unbookedSlot.booked = false;
        alert(
          `You have successfully unbooked ${this.selectedSpot?.name} - Slot ${slotId}.`
        );
      },
      (error: any) => {
        alert('Failed to unbook the slot. Please try again.');
      }
    );
  }
}
