import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from '../services/parking.service';

@Component({
  selector: 'app-parking-module',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  userLocation: any;
  parkingSpaces: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private parkingService: ParkingService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.getUserLocation();
      this.fetchParkingSpaces();
    }
  }

  checkLoginStatus() {
    
    this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedIn = true; 
    this.getUserLocation();
    this.fetchParkingSpaces(); 
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.fetchParkingSpaces(); 
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  fetchParkingSpaces() {
    this.parkingService.getParkingSpaces(this.userLocation).subscribe(spaces => {
      this.parkingSpaces = spaces;
      // Update Google Map with parking spaces
    });
  }

  logout() {
    // Logic to handle user logout
    localStorage.removeItem('loggedIn'); // Example logout handling
    this.isLoggedIn = false; // Update login status
  }

  navigateToLogin() {
    // Navigate to the login page (you can use this method for your login button)
    this.router.navigate(['/login']);
  }
}
