import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
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
  parkingSpots: ParkingSpot[] = []; // All parking spots with their slots
  filteredCards: ParkingSpot[] = []; // Filtered cards for the search
  selectedSpot: ParkingSpot | null = null; // The selected parking spot for viewing slots

  constructor(
    private parkingSpotService: ParkingSpotService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit() {
    this.loadParkingSpots();
  }

  // Load all parking spots
  loadParkingSpots() {
    this.parkingSpotService.getParkingSpots().subscribe(
      (data: ParkingSpot[]) => {
        this.parkingSpots = data; // Fetch the parking spots and their slots
        this.filteredCards = [...this.parkingSpots]; // Clone the array for filtering
      },
      (error) => {
        console.error('Error loading parking spots:', error);
        alert('Failed to load parking spots.');
      }
    );
  }

  // Search parking spots based on location
  searchParking() {
    this.filteredCards = this.parkingSpots.filter((spot) =>
      spot.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Open the modal to view and book/unbook slots for a parking spot
  openSlotBookingModal(spot: ParkingSpot) {
    this.selectedSpot = spot; // Ensure you're setting the selected spot
    this.isSlotModalOpen = true; // Open the modal
  }

  // Close the modal
  closeSlotModal() {
    this.isSlotModalOpen = false;
    this.selectedSpot = null;
  }

  // Returns dynamically generated slots based on the availability of the selected parking spot
  getAvailableSlots(): ParkingSlot[] {
    if (!this.selectedSpot) {
      return [];
    }

    const slots: ParkingSlot[] = [];
    for (let i = 1; i <= this.selectedSpot.availability; i++) {
      const slot: ParkingSlot = {
        id: i,
        name: `Slot-${i}`,
        booked: false, // Initially, assume all slots are unbooked
        parkingSpotId: this.selectedSpot.id,
      };
      slots.push(slot);
    }

    return slots;
  }

  // Toggle booking/unbooking of a slot
  toggleSlotBooking(slot: ParkingSlot) {
    if (slot.booked) {
      this.unbookSlot(this.selectedSpot!.id, slot.id);
    } else {
      this.bookSlot(this.selectedSpot!.id, slot.id);
    }
  }

  // Book a slot by ID and navigate to the challan form
  bookSlot(spotId: number, slotId: number) {
    this.parkingSpotService.bookParkingSlot(spotId, slotId).subscribe(
      () => {
        const bookedSlot = this.selectedSpot?.parkingSlots.find(
          (s) => s.id === slotId
        );
        if (bookedSlot) bookedSlot.booked = true; // Update UI immediately
        alert(
          `You have successfully booked Slot ${slotId} at ${this.selectedSpot?.name}.`
        );

        // After booking the slot, navigate to the challan form
        this.router.navigate(['/challan']); // This will open the challan form
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
        const unbookedSlot = this.selectedSpot?.parkingSlots.find(
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
