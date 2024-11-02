import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) {}

  registerUser() {
    this.authService.register(this.user).subscribe(
      response => {
        this.message = response.message; // Success message
      },
      error => {
        console.log('Error occurred:', error); // Log error for debugging
  
        // Handle conflict error for existing email
        if (error.status === 409 && error.error) {
          this.message = error.error.message || 'Email already exists. Please use a different email.';
        } else {
          this.message = 'Registration failed. Please try again.';
        }
      }
    );
  }
  
}
