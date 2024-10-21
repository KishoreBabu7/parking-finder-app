import { ParkingSlot } from './parking-slot.model'; // Adjust the path as needed

export interface ParkingSpot {
  id: number; // Unique identifier for the parking spot
  name: string; // Name of the parking spot
  location: string; // Location of the parking spot
  availability: number; // Number of available slots
  mapUrl: string; // URL for the map location
  parkingSlots: ParkingSlot[]; // Array of associated parking slots
}
