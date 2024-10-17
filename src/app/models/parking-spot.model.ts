import { ParkingSlot } from './parking-slot.model';

export interface ParkingSpot {
  id: number;
  name: string;
  location: string;
  availability: number; // Available number of slots
  mapUrl: string;
  parkingSlots: ParkingSlot[]; // Array of slots under this parking spot
}
