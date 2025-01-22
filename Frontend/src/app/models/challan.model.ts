export interface Challan {
  name: string;
  mobile: string;
  vehicleType: string;
  plateNumber: string;
  startTime: string;
  endTime: string;
  violationTime: string;
  amount: number;
  tokenId: string;
  bookingDate: string; // Add this if it's not already there
  date: string; // Add this line for the 'date' field
}
