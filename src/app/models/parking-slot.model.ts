export interface ParkingSlot {
  id: number;
  name: string;
  booked: boolean;  // Whether the slot is booked or not
  parkingSpotId: number;
}
