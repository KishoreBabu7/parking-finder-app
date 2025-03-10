import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // ✅ Import Router

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

  constructor(private authService: AuthService, private router: Router) {} // ✅ Inject Router

  loginUser() {
    this.authService.login(this.user).subscribe(
      response => {
        this.message = response.message;
        if (response.success) {
          this.authService.setUserDetails(response.user); // ✅ Store user details
          this.router.navigate(['/user-dashboard']); // ✅ Corrected navigation
        }
      },
      error => {
        this.message = error.error?.message || 'Login failed';
      }
    );
  }
}
