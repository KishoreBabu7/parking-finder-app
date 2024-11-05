import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  message: string = '';

  constructor(private authService: AuthService) {}

  loginUser() {
    this.authService.login(this.user).subscribe(
      response => {
        this.message = response.message;
        if (response.success) {
          this.authService.setUserDetails(response.user); // Store user details
          this.authService.navigateToHome(); // Navigate to user-dashboard
        }
      },
      error => {
        this.message = error.error.message || 'Login failed';
      }
    );
  }
}
