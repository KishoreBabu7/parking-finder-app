import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user'; // Backend base URL
  private user: any = null; // To store user details after login

  constructor(private http: HttpClient, private router: Router) {}

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Login the user
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Store user details (called after successful login)
  setUserDetails(user: any) {
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Fetch stored user details
  getUserDetails(): any {
    if (!this.user) {
      const storedUser = sessionStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.user;
  }

  // Logout the user
  logout() {
    this.user = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Redirect to user-dashboard after successful login
  navigateToHome() {
    this.router.navigate(['/user-dashboard']);
  }
}
