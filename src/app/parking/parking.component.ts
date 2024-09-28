import { Component } from '@angular/core';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent {
  // Modal visibility
  showModal: boolean = false;

  // Parking cards array
  parkingCards = [
    { name: 'Parking Place 1', location: 'XYZ Street', availability: 10 },
    { name: 'Parking Place 2', location: 'ABC Avenue', availability: 5 }
  ];

  // New parking spot object
  newParkingSpot = {
    name: '',
    location: '',
    availability: null
  };

  // Open the modal
  openAddModal() {
    this.showModal = true;
  }

  // Close the modal
  closeAddModal() {
    this.showModal = false;
  }

  // Add new parking spot and close modal
  addParkingSpot() {
    if (this.newParkingSpot.name && this.newParkingSpot.location && this.newParkingSpot.availability !== null) {
      this.parkingCards.push({
        name: this.newParkingSpot.name,
        location: this.newParkingSpot.location,
        availability: this.newParkingSpot.availability
      });

      // Reset form and close modal
      this.newParkingSpot = { name: '', location: '', availability: null };
      this.showModal = false;
    } else {
      alert('Please fill in all fields');
    }
  }
}


