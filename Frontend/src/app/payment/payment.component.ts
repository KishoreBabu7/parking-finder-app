import { Component, Input } from '@angular/core';
import { RazorpayService } from '../services/razorpay.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  @Input() name: string = ''; // Input for name
  @Input() amount: number = 0; // Input for amount

  constructor(
    private razorpayService: RazorpayService,
    private http: HttpClient
  ) {}

  // Method called when the payment form is submitted
  onSubmit(paymentForm: NgForm) {
    if (paymentForm.valid) {
      const paymentData = {
        name: paymentForm.value.name || this.name, // Use name from input or fallback
        email: paymentForm.value.email,
        amount: paymentForm.value.amount
          ? paymentForm.value.amount * 1
          : this.amount, // Use amount from input or fallback
      };

      // Call the backend to initiate payment
      this.razorpayService.initiatePayment(paymentData).subscribe(
        (response: any) => {
          this.openRazorpay(response); // Open Razorpay checkout on successful order creation
        },
        (error: any) => {
          console.error('Error initiating payment:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to open the Razorpay checkout
  openRazorpay(orderDetails: any) {
    const options = {
      amount: orderDetails.amount, // Amount in paise
      currency: 'INR',
      name: 'Parking Space Finder',
      description: 'Parking Fee Payment',
      order_id: orderDetails.id, // Razorpay Order ID from backend
      handler: (paymentResponse: any) => {
        this.verifyPayment(paymentResponse); // Verify payment on success
      },
      prefill: {
        name: this.name,
        email: orderDetails.email,
      },
      notes: {
        description: 'Parking Fee Payment',
      },
      theme: {
        color: '#CC6CE7',
      },
      modal: {
        ondismiss: function () {
          alert('Payment cancelled');
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  // Method to verify the payment after success
  verifyPayment(paymentResponse: any) {
    this.http
      .post('http://localhost:8080/api/verify-payment', paymentResponse)
      .subscribe(
        (res) => {
          console.log('Payment successful!', res);
          alert('Payment successful!');
        },
        (err) => {
          console.error('Payment verification failed:', err);
          alert('Payment verification failed!');
        }
      );
  }
}
