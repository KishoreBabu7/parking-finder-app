// parking-spot.model.ts
import { ParkingSlot } from './parking-slot.model';

export interface ParkingSpot {
  id: number;
  name: string;
  location: string;
  availability: number;
  mapUrl: string;
  slots?: ParkingSlot[]; // Changed to use ParkingSlot type
}
