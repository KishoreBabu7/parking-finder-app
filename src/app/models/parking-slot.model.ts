export interface ParkingSlot {
  id: number; // Unique identifier for the slot
  name: string; // Name of the slot
  booked: boolean; // Indicates if the slot is booked
  parkingSpotId: number; // Foreign key to the associated parking spot
}
