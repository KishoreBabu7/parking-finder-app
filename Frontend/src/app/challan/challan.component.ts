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
  challanData: Challan = {
    name: '',
    mobile: '',
    vehicleType: '',
    plateNumber: '',
    startTime: '',
    endTime: '',
    violationTime: '',
    amount: 0,
    tokenId: '',
    bookingDate: '',
    date: '',
  };

  constructor(private challanService: ChallanService) {}

  // Function to calculate violation fee and violation time
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

  // Convert time string to Date object
  convertToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  // Generate Token ID
  generateTokenId(): void {
    const randomString = Math.random().toString(36).substring(2, 12); // Random 10 characters
    const timestamp = new Date().getTime(); // Current timestamp
    this.challanData.tokenId = `${randomString}-${timestamp}`; // Combine them to make the token unique

    // Set bookingDate to the current date and time
    this.challanData.bookingDate = new Date().toLocaleDateString(); // Get current date in the format "MM/DD/YYYY"
  }

  // Submit form data
  onSubmit(form: NgForm) {
    console.log('Form submission triggered.');

    if (!form.valid) {
      alert('Please fill out all required fields.');
      return; // Stay on the same page if form is invalid
    }

    this.generateTokenId(); // Generate Token ID before submitting
    console.log('Generated Token ID:', this.challanData.tokenId);

    // Ensure the request is a POST request and the URL is correct
    this.challanService.createChallan(this.challanData).subscribe(
      (response) => {
        console.log('Challan stored successfully:', response);
        alert(
          `Challan submitted successfully. Token ID: ${this.challanData.tokenId}`
        );
      },
      (error) => {
        console.error('Error storing challan:', error);
        alert('Failed to submit challan: ' + error.error);
      }
    );
  }
}
