import { ParkingSlot } from './parking-slot.model'; // Adjust the path as needed

export interface ParkingSpot {
  id: number; 
  name: string;
  location: string;
  availability: number;
  mapUrl: string;
  parkingSlots: ParkingSlot[];
}
