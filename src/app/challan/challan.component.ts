import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChallanService } from '../services/challan.service';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css'],
})
export class ChallanComponent {
  challanData = {
    name: '',
    mobile: '',
    vehicleType: '',
    plateNumber: '',
    startTime: '',
    endTime: '',
    violationTime: '',
    amount: 0,
    status: '', // Added status field
  };

  constructor(private challanService: ChallanService) {}

  // Function to calculate violation time and amount
  calculateFee() {
    if (this.challanData.startTime && this.challanData.endTime) {
      const startTime = new Date(`1970-01-01T${this.challanData.startTime}:00`);
      const endTime = new Date(`1970-01-01T${this.challanData.endTime}:00`);

      let violationTimeMillis = endTime.getTime() - startTime.getTime();
      if (violationTimeMillis < 0) {
        violationTimeMillis += 24 * 60 * 60 * 1000; // Handle crossing midnight
      }

      const violationMinutes = violationTimeMillis / (1000 * 60);
      const hours = Math.floor(violationMinutes / 60);
      const minutes = Math.round(violationMinutes % 60);

      this.challanData.violationTime = `${hours} hours ${minutes} minutes`;
      this.challanData.amount = hours * 50 + (minutes > 0 ? 50 : 0);
    }
  }

  // Common function for submitting the form data
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Checking the button clicked to set the status field
      if (form.submitted) {
        this.challanData.status = 'paid'; // Assuming Pay Now sets it to 'paid'
      }

      console.log('Submitting Challan Data:', this.challanData);

      this.challanService.createChallan(this.challanData).subscribe(
        (response) => {
          console.log('Challan stored successfully:', response);
          alert('Challan submitted successfully.');
        },
        (error) => {
          console.error('Error storing challan:', error);
          alert('Failed to submit challan: ' + error.error);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // For Pay at Station: Sets status to 'unpaid' and submits the form
  payAtStation(form: NgForm) {
    if (form.valid) {
      this.challanData.status = 'unpaid'; // Set status to 'unpaid'
      console.log(
        'Submitting Challan Data for Pay at Station:',
        this.challanData
      );

      this.challanService.createChallan(this.challanData).subscribe(
        (response) => {
          console.log('Challan stored successfully:', response);
          alert('Challan submitted successfully, payment at station.');
        },
        (error) => {
          console.error('Error storing challan:', error);
          alert('Failed to submit challan: ' + error.error);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // For Pay Now: Sets status to 'paid' and proceeds to payment page
  payNow(form: NgForm) {
    if (form.valid) {
      this.challanData.status = 'paid'; // Set status to 'paid'
      console.log(
        'Proceeding to payment with the following data:',
        this.challanData
      );

      this.challanService.createChallan(this.challanData).subscribe(
        (response: any) => {
          console.log('Payment processed successfully:', response);
          alert('Payment successful, redirecting to payment page.');
          window.location.href = '/payment'; // Redirect to payment page
        },
        (error: any) => {
          console.error('Error processing payment:', error);
          alert('Failed to process payment: ' + error.error);
        }
      );
    } else {
      alert(
        'Please fill out all required fields before proceeding to payment.'
      );
    }
  }
}
