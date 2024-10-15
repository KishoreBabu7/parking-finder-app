// parking-spot.model.ts
export interface ParkingSlot {
  id: number;
  name: string;
  booked: boolean;
}

export interface ParkingSpot {
  id: number;
  name: string;
  location: string;
  availability: number; // total available slots
  slots: ParkingSlot[]; // available slots
  mapUrl: string; // URL for the map
}
