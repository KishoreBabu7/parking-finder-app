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
    status: 'Unpaid', // Default status
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

  // Function to submit the form data
  onSubmit(form: NgForm) {
    // Prevent navigation if the form is invalid
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return; // Stay on the same page if form is invalid
    }

    // Set status to 'Paid' for Pay Now
    this.challanData.status = 'Paid';

    // If valid, proceed with submission logic
    console.log('Submitting Challan Data:', this.challanData);
    this.challanService.createChallan(this.challanData).subscribe(
      (response) => {
        console.log('Challan stored successfully:', response);
        alert('Challan submitted successfully. Status: Paid');
        // Optionally navigate to the payment confirmation page
      },
      (error) => {
        console.error('Error storing challan:', error);
        alert('Failed to submit challan: ' + error.error); // Show error message
      }
    );
  }

  // Function for Pay At Station
  payAtStation() {
    const formFieldsFilled =
      this.challanData.name &&
      this.challanData.mobile &&
      this.challanData.vehicleType &&
      this.challanData.plateNumber &&
      this.challanData.startTime &&
      this.challanData.endTime;

    if (formFieldsFilled) {
      // Set status to 'Unpaid' for Pay at Station
      this.challanData.status = 'Unpaid';

      console.log(
        'Submitting Challan Data for Pay at Station:',
        this.challanData
      );
      this.challanService.createChallan(this.challanData).subscribe(
        (response) => {
          console.log('Challan stored successfully:', response);
          alert('Challan submitted successfully. Status: Unpaid');
          // Optionally navigate to another page or display confirmation
        },
        (error) => {
          console.error('Error storing challan:', error);
          alert('Failed to submit challan: ' + error.error); // Show error message
        }
      );
    } else {
      alert(
        'Please fill out all required fields before proceeding to payment.'
      );
    }
  }
}
