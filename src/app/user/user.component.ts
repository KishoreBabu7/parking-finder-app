import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isLoginMode: boolean = true; // Start in login mode
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  vehicleRegNo: string = '';
  vehicleType: string = '';
  errorMessage: string = '';

  // Method to switch between login and sign-up modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = ''; // Clear any error messages when switching modes
  }

  // Handle form submission
  onSubmit() {
    if (this.isLoginMode) {
      // Logic for login
      console.log('Login:', this.email, this.password);
    } else {
      // Logic for sign-up
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }
      console.log('Sign Up:', this.username, this.email, this.password, this.mobileNumber, this.vehicleRegNo, this.vehicleType);
    }
  }

  // Logic for adding another vehicle
  addAnotherVehicle() {
    console.log('Add another vehicle');
  }
}
