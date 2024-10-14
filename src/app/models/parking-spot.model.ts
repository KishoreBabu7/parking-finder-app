// parking-spot.model.ts
export interface ParkingSpot {
  id: number;
  name: string;
  location: string;
  availability: number; // Overall availability of the spot
  mapUrl: string;
}
