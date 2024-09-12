import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  center: google.maps.LatLngLiteral | undefined;
  zoom = 12;
  locations = [
    { name: 'Parking Lot A', lat: 40.73061, lng: -73.935242, chargePerHour: '$5' },
    { name: 'Parking Lot B', lat: 40.74061, lng: -73.925242, chargePerHour: '$6' },
    { name: 'Parking Lot C', lat: 40.75061, lng: -73.915242, chargePerHour: '$7' },
  ];

  constructor() {}

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        () => {
          alert('Geolocation permission denied.');
          this.center = { lat: 40.73061, lng: -73.935242 }; // Default center
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      this.center = { lat: 40.73061, lng: -73.935242 }; // Default center
    }
  }

  onMapReady(map: google.maps.Map) {
    console.log('Map is ready!', map);
  }
}
