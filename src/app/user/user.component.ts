import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isLoginMode = true;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobile: string = '';
  vehicleRegNo: string = '';
  vehicleType: string = '2-wheeler';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() {}

  // Toggle between login and signup modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // // Handle form submission
  // onSubmit() {
  //   this.errorMessage = ''; // Clear any previous errors
  //   this.isLoading = true; // Set loading state

  //   // Basic field validation
  //   if (!this.email) {
  //     this.errorMessage = 'Email is required.';
  //     this.isLoading = false;
  //     return;
  //   }
  //   if (!this.password) {
  //     this.errorMessage = 'Password is required.';
  //     this.isLoading = false;
  //     return;
  //   }
  //   if (!this.isLoginMode && !this.username) {
  //     this.errorMessage = 'Username is required for signup.';
  //     this.isLoading = false;
  //     return;
  //   }

  //   // Password validation for signup
  //   if (!this.isLoginMode && this.password !== this.confirmPassword) {
  //     this.errorMessage = 'Passwords do not match.';
  //     this.isLoading = false;
  //     return;
  //   }

  //   // Logging or sending data to the server
  //   if (this.isLoginMode) {
  //     console.log('Logging in with', this.email, this.password);
  //     // Call login service
  //   } else {
  //     console.log('Signing up with', {
  //       username: this.username,
  //       email: this.email,
  //       password: this.password,
  //       mobile: this.mobile,
  //       vehicleRegNo: this.vehicleRegNo,
  //       vehicleType: this.vehicleType
  //     });
  //     // Call signup service
  //   }

  //   this.isLoading = false; // Reset loading state after submission
  // }

  // Add another vehicle handler (for future implementation)
  addAnotherVehicle() {
    console.log('Adding another vehicle');
  }
}
