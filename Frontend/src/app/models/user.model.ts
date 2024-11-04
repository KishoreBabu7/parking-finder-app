export interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string; // Optional for login
    mobileNumber?: string;     // Optional for registration
    vehicleRegNo?: string;     // Optional for registration
    vehicleType?: string;      // Optional for registration
  }
  