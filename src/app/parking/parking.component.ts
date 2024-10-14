import { Component, OnInit } from '@angular/core';
import { ParkingSpotService } from '../services/parking-spot.service';
import { ParkingSpot } from '../models/parking-spot.model';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent implements OnInit {
  searchQuery: string = '';
  isModalOpen: boolean = false;
  parkingSpots: ParkingSpot[] = [];
  filteredCards: ParkingSpot[] = [];
  newParkingSpot: ParkingSpot = {
    id: 0, // Initialize id appropriately
    name: '',
    location: '',
    availability: 0,
    mapUrl: '',
  };

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
      });
  }

  searchParking() {
    this.filteredCards = this.parkingSpots.filter((spot) =>
      spot.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openAddParkingModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
