export interface Challan {
  name: string;
  mobile: string;
  vehicleType: string;
  plateNumber: string;
  startTime: string;
  endTime: string;
  violationTime: string;
  amount: number;
  tokenId?: string; // Added tokenId field
}
