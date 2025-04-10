import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RazorpayService, Transaction } from '../services/razorpay.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any = {};
  message: string = '';
  selectedSection: string = 'profile';
  totalPayments: number = 0;
availableSlots: any;

  constructor(
    private authService: AuthService,
    private readonly razorpayService: RazorpayService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUserDetails();

    if (!this.user.paymentHistory) {
      this.user.paymentHistory = [];
    }

    this.fetchUpdatedPayments();
  }

  fetchUpdatedPayments() {
    const userEmail = this.user.email;

    this.razorpayService.getTransactions().subscribe({
      next: (transactions: Transaction[]) => {
        const userTransactions = transactions.filter(
          txn => txn.email === userEmail
        );

        const formattedPayments = userTransactions.map(txn => ({
          date: txn.date ? new Date(txn.date).toLocaleString() : new Date().toLocaleString(),
          amount: txn.amount,
          status: 'Success'
        }));

        // Avoid duplicate entries by checking date and amount
        const existingKeys = new Set(this.user.paymentHistory.map((p: { date: any; amount: any; }) => `${p.date}-${p.amount}`));

        formattedPayments.forEach(payment => {
          const key = `${payment.date}-${payment.amount}`;
          if (!existingKeys.has(key)) {
            this.user.paymentHistory.push(payment);
          }
        });

        this.calculateTotalPayments();
      },
      error: (err: any) => {
        console.error('Failed to fetch Razorpay transactions:', err);
      }
    });
  }

  calculateTotalPayments() {
    this.totalPayments = this.user.paymentHistory.reduce(
      (sum: number, payment: any) => sum + (payment.amount || 0),
      0
    );
  }

  selectSection(section: string) {
    this.selectedSection = section;
  }

  logout() {
    this.authService.logout();
    this.message = 'Logged out successfully. Redirecting to login...';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  editDetails() {
    this.router.navigate(['/register'], { state: { user: this.user } });
  }
}
