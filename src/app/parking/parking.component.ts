import { Component, OnInit } from '@angular/core';

interface ParkingSpot {
  name: string;
  location: string;
  availability: number;
  mapUrl: string;
  slots: { name: string; booked: boolean }[]; // Define slots in the ParkingSpot interface
}

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  searchQuery: string = '';
  isModalOpen: boolean = false;
  isSlotModalOpen: boolean = false;
  selectedParkingArea: ParkingSpot | null = null; // Track selected parking area for slot booking

  parkingSpots: ParkingSpot[] = [
    {
      name: 'Centurion University Of Technology and Management',
      location: ' Alluri Nagar, Paralakhemundi, Odisha',
      availability: 10,
      slots: [], // Initialize slots
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4809.668770448797!2d84.12824941211053!3d18.798192684282068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3cf98111e52f3b%3A0x316b288d3abda74e!2sCenturion%20University%20of%20Technology%20and%20Management%20(CUTM)!5e0!3m2!1sen!2sin!4v1727674534052!5m2!1sen!2sin',
    },
    {
      name: 'R Sitapur Post Office',
      location: 'Kshatriya St, R.Sitapur, Tulasipadu, Paralakhemundi, Odisha 761211',
      availability: 5,
      slots: [],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4809.681704984787!2d84.12622740531938!3d18.797740012642826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3cf9902341708b%3A0xf2b1b0f0980233a0!2sR%20Sitapur%20Post%20Office!5e0!3m2!1sen!2sin!4v1727680689072!5m2!1sen!2sin',
    }
  ];

  filteredCards: ParkingSpot[] = [...this.parkingSpots];

  newParkingSpot: ParkingSpot = {
    name: '',
    location: '',
    availability: 0,
    slots: [], // Initialize slots
    mapUrl: '',
  };

  ngOnInit() {
    this.generateSlots(); // Generate slots when component initializes
  }

  searchParking() {
    this.filteredCards = this.parkingSpots.filter(spot =>
      spot.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openAddParkingModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openSlotBookingModal(parkingSpot: ParkingSpot) {
    this.selectedParkingArea = parkingSpot; // Set selected parking area
    this.isSlotModalOpen = true; // Open the slot booking modal
  }

  closeSlotModal() {
    this.isSlotModalOpen = false;
    this.selectedParkingArea = null; // Reset selected area
  }

  generateSlots() {
    this.parkingSpots.forEach(parkingArea => {
      parkingArea.slots = []; // Clear any existing slots
      for (let i = 1; i <= parkingArea.availability; i++) {
        parkingArea.slots.push({ name: `Parking Slot ${i}`, booked: false });
      }
    });
  }

  bookSlot(slot: any) {
    slot.booked = true; // Mark the slot as booked
    alert(`${slot.name} has been successfully booked!`); // Notify the user
  }

  addParkingSpot() {
    if (
      this.newParkingSpot.name &&
      this.newParkingSpot.location &&
      this.newParkingSpot.availability > 0 &&
      this.newParkingSpot.mapUrl
    ) {
      this.newParkingSpot.slots = []; // Initialize slots for new parking spot
      this.parkingSpots.push({ ...this.newParkingSpot });
      this.filteredCards = [...this.parkingSpots];
      this.newParkingSpot = { name: '', location: '', availability: 0, slots: [], mapUrl: '' };
      this.closeModal();
      this.generateSlots(); // Regenerate slots after adding a new parking spot
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
