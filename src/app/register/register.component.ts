import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    vehicles: [{ vehicleRegNo: '', vehicleType: '' }]
  };

  message: string = '';
  passwordMismatch: boolean = false;
  mobileNumberExists: boolean = false;
  emailExists: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    // Reset flags and message
    this.passwordMismatch = false;
    this.mobileNumberExists = false;
    this.emailExists = false;
    this.message = '';  // Clear message on each attempt

    // Check for password mismatch
    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
      this.message = 'Passwords do not match. Please try again.';
      return;
    }

    this.authService.register(this.user).subscribe(
      response => {
        this.message = 'Registration successful! Redirecting to login...';
        // Navigate to login page after successful registration
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error occurred:', error);

        // Check error response for specific messages
        if (error.status === 409 && error.error) {
          if (error.error.message.includes('Email')) {
            this.emailExists = true;
            this.message = 'Email already exists. Please use a different email.';
          } else if (error.error.message.includes('Mobile number')) {
            this.mobileNumberExists = true;
            this.message = 'Mobile number already exists. Please use a different mobile number.';
          }
        } else if (error.status === 400 && error.error.message.includes('Passwords do not match')) {
          this.passwordMismatch = true;
          this.message = 'Passwords do not match. Please try again.';
        } else {
          this.message = 'Registration failed. Please try again.';
        }
      }
    );
  }

  addVehicle() {
    this.user.vehicles.push({ vehicleRegNo: '', vehicleType: '' });
  }
}
