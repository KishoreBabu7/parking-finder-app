import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user'; // Backend base URL
  private userSubject = new BehaviorSubject<any>(null); // Reactive state for user
  user$ = this.userSubject.asObservable(); // Observable for navbar updates

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage(); // Load user when service initializes
  }

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

  // Store user details after successful login
  setUserDetails(user: any) {
    if (typeof window !== 'undefined') { // ✅ Check if running in the browser
      localStorage.setItem('user', JSON.stringify(user)); // Persist login
    }
    this.userSubject.next(user); // Update navbar and UI
  }

  // Load user details from storage
  private loadUserFromStorage() {
    if (typeof window !== 'undefined') { // ✅ Prevent SSR issues
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }

  // Fetch stored user details
  getUserDetails(): any {
    return this.userSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('user'); // ✅ Improved check
    }
    return !!this.userSubject.value;
  }

  // Logout the user
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.userSubject.next(null); // Update UI immediately
    this.router.navigate(['/home']); // Redirect to home
  }

  // Redirect to dashboard after login
  navigateToDashboard() {
    this.router.navigate(['/user-dashboard']);
  }
}
