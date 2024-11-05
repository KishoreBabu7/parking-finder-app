import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any = {};
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Fetch the user details
    this.user = this.authService.getUserDetails();
  }

  logout() {
    this.authService.logout(); // Clear session or token
    this.message = 'Logged out successfully. Redirecting to login...';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  editDetails() {
    // Navigate to the registration form with current details for editing
    this.router.navigate(['/register'], { state: { user: this.user } });
  }
}
