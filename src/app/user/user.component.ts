import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isLoginMode = true;
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  mobile = '';
  vehicleRegNo = '';
  vehicleType = '2';
  errorMessage = '';


  constructor() { }


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


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


  addAnotherVehicle() {
    console.log('Adding another vehicle');
  }
}
