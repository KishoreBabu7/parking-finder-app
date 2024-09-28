import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isLoginMode = true;
  username: string = ''; // New username field
  email: string = '';
  password: string = '';
  confirmPassword: string = ''; // New confirm password field
  mobile: string = ''; // New mobile number field
  vehicleRegNo: string = ''; // Vehicle registration number field
  vehicleType: string = '2'; // Default to 2 wheeler
  errorMessage: string = '';
mobileNumber: any;

  constructor() {}

  // Toggle between login and signup modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Handle form submission
  onSubmit() {
    if (!this.email || !this.password || (!this.isLoginMode && !this.username)) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (!this.isLoginMode && this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.isLoginMode) {
      console.log('Logging in with', this.email, this.password);
      // Implement login logic
    } else {
      console.log('Signing up with', {
        username: this.username,
        email: this.email,
        password: this.password,
        mobile: this.mobile,
        vehicleRegNo: this.vehicleRegNo,
        vehicleType: this.vehicleType
      });
      // Implement signup logic
    }
  }

  // Add another vehicle handler (for future implementation)
  addAnotherVehicle() {
    console.log('Adding another vehicle');
  }
}