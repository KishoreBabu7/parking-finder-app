import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isLoginMode: boolean = true;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  // Switch between login and registration modes
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Handle form submission for both login and sign-up
  onSubmit() {
    if (this.isLoginMode) {
      // Admin login logic
      if (this.username === 'admin' && this.password === 'admin123') {
        console.log('Admin login successful');
        this.router.navigate(['/admin-dashboard']);  // Redirect to admin dashboard
      } else {
        this.errorMessage = 'Invalid username or password.';
      }
    } else {
      // Admin registration logic (validate passwords match, etc.)
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        console.log('Admin registration successful');
        this.router.navigate(['/admin-dashboard']);  // Redirect to admin dashboard
      }
    }
  }
}
