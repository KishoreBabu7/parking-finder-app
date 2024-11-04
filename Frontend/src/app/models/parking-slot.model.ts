///parking-slot.model.ts
export interface ParkingSlot {
  id: number;
  name: string;
  booked: boolean;
  parkingSpotId: number;
}
