import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChallanService } from '../services/challan.service';
import { Challan } from '../models/challan.model'; // Import the Challan model

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css'],
})
export class ChallanComponent {
  // Initialize challanData using the Challan model
  challanData: Challan = {
    name: '',
    mobile: '',
    vehicleType: '',
    plateNumber: '',
    startTime: '',
    endTime: '',
    violationTime: '',
    amount: 0,
    tokenId: '', // Default status
  };

  constructor(private challanService: ChallanService) {}

  // Function to handle the calculation of fee and violation time
  calculateFee() {
    if (this.challanData.startTime && this.challanData.endTime) {
      const startTime = this.convertToDate(this.challanData.startTime);
      const endTime = this.convertToDate(this.challanData.endTime);

      let violationTimeMillis = endTime.getTime() - startTime.getTime();
      if (violationTimeMillis < 0) {
        violationTimeMillis += 24 * 60 * 60 * 1000; // Handle crossing midnight
      }

      const violationMinutes = violationTimeMillis / (1000 * 60);
      const hours = Math.floor(violationMinutes / 60);
      const minutes = Math.round(violationMinutes % 60);

      this.challanData.violationTime = `${hours} hours ${minutes} minutes`;
      this.challanData.amount = hours * 50 + (minutes > 0 ? 50 : 0); // Calculate amount
    }
  }

  // Function to convert time into a Date object
  convertToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  // Function to generate a unique Token ID
  generateTokenId(): void {
    // Generate a random alphanumeric string
    const randomString = Math.random().toString(36).substring(2, 12); // Random 10 characters
    const timestamp = new Date().getTime(); // Current timestamp
    this.challanData.tokenId = `${randomString}-${timestamp}`; // Combine them to make the token unique
  }

  // Function to submit the form data
  onSubmit(form: NgForm) {
    // Prevent navigation if the form is invalid
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return; // Stay on the same page if form is invalid
    }

    // If valid, proceed with submission logic
    console.log('Submitting Challan Data:', this.challanData);
    this.challanService.createChallan(this.challanData).subscribe(
      (response) => {
        console.log('Challan stored successfully:', response);
        alert(`Challan submitted successfully. Token ID: ${this.challanData.tokenId} | Status: Paid`);
        // Optionally navigate to the payment confirmation page
      },
      (error) => {
        console.error('Error storing challan:', error);
        alert('Failed to submit challan: ' + error.error); // Show error message
      }
    );
  }
}
