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

  // Load all parking spots
  loadParkingSpots() {
    this.parkingSpotService
      .getParkingSpots()
      .subscribe((data: ParkingSpot[]) => {
        this.parkingSpots = data;
        this.filteredCards = [...this.parkingSpots];
        console.log('Parking spots loaded:', this.parkingSpots); // Debugging
      });
  }

  // Search parking spots based on location
  searchParking() {
    this.filteredCards = this.parkingSpots.filter((spot) =>
      spot.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Open the modal to view and book/unbook slots for a parking spot
  openSlotBookingModal(spot: ParkingSpot) {
    this.selectedSpot = spot;
    console.log('Selected spot for booking:', this.selectedSpot); // Debugging
    this.isSlotModalOpen = true;
  }

  // Close the modal
  closeSlotModal() {
    this.isSlotModalOpen = false;
    this.selectedSpot = null;
  }

  // Returns all slots for the selected parking spot, not just available ones
  getAvailableSlots(): ParkingSlot[] {
    return this.selectedSpot ? this.selectedSpot.slots : [];
  }

  // Toggle booking/unbooking of a slot
  toggleSlotBooking(slot: ParkingSlot) {
    if (slot.booked) {
      this.unbookSlot(this.selectedSpot!.id, slot.id);
    } else {
      this.bookSlot(this.selectedSpot!.id, slot.id);
    }
  }

  // Book a slot by ID
  bookSlot(spotId: number, slotId: number) {
    this.parkingSpotService.bookParkingSlot(spotId, slotId).subscribe(
      () => {
        const bookedSlot = this.selectedSpot?.slots.find(
          (s) => s.id === slotId
        );
        if (bookedSlot) bookedSlot.booked = true; // Update UI immediately
        alert(
          `You have successfully booked Slot ${slotId} at ${this.selectedSpot?.name}.`
        );
      },
      (error: any) => {
        alert('Failed to book the slot. Please try again.');
      }
    );
  }

  // Unbook a slot by ID
  unbookSlot(spotId: number, slotId: number) {
    this.parkingSpotService.unbookParkingSlot(spotId, slotId).subscribe(
      () => {
        const unbookedSlot = this.selectedSpot?.slots.find(
          (s) => s.id === slotId
        );
        if (unbookedSlot) unbookedSlot.booked = false; // Update UI immediately
        alert(
          `You have successfully unbooked Slot ${slotId} at ${this.selectedSpot?.name}.`
        );
      },
      (error: any) => {
        alert('Failed to unbook the slot. Please try again.');
      }
    );
  }
}
