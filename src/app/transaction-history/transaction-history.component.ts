import { Component, OnInit } from '@angular/core';
import { RazorpayService } from '../services/razorpay.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent implements OnInit {
  isOpen = false;
  transactions: any[] = [];

  constructor(private razorpayService: RazorpayService) {}

  ngOnInit() {
    this.getTransactions();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  getTransactions() {
    this.razorpayService.getTransactions().subscribe(
      (response) => {
        this.transactions = response;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}
