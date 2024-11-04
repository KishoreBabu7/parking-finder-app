import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isLoginMode: boolean = true;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Store multiple vehicle entries
  vehicles: { vehicleRegNo: string; vehicleType: string }[] = [
    { vehicleRegNo: '', vehicleType: '' }
  ];

  constructor(private userService: UserService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForm();
  }

  onSubmit() {
    if (this.isLoginMode) {
      // Login logic: no vehicle info here
      this.userService.loginUser(this.email, this.password).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Login failed! Invalid email or password.';
          this.successMessage = '';
        }
      });
    } else {
      // Registration logic: includes vehicle info
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        this.successMessage = '';
        return;
      }

      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        mobileNumber: this.mobileNumber,
        vehicles: this.vehicles // Pass array of vehicles only during registration
      };

      this.userService.registerUser(user).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Registration successful!';
          this.errorMessage = '';
          this.resetForm(); // Reset the form on successful registration
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Registration failed!';
          this.successMessage = '';
        }
      });
    }
  }

  // Reset form fields
  private resetForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.mobileNumber = '';
    this.vehicles = [{ vehicleRegNo: '', vehicleType: '' }];
    this.errorMessage = '';
    this.successMessage = '';
  }

  // Add a new empty vehicle entry to the vehicles array
  addAnotherVehicle() {
    this.vehicles.push({ vehicleRegNo: '', vehicleType: '' });
  }

  // Remove a specific vehicle entry
  removeVehicle(index: number) {
    if (this.vehicles.length > 1) {
      this.vehicles.splice(index, 1);
    }
  }
}
