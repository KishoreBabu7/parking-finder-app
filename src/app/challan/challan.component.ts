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

  // Function to convert time with AM/PM into a Date object
  convertToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  // Function to submit the form data
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Submitting Challan Data:', this.challanData);
      this.challanService.createChallan(this.challanData).subscribe(
        (response) => {
          console.log('Challan stored successfully:', response);
          alert('Challan submitted successfully');
        },
        (error) => {
          console.error('Error storing challan:', error);
          alert('Failed to submit challan: ' + error.error); // Show error message
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
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
          alert('Failed to submit challan: ' + error.error); // Show error message
        }
      );
    } else {
      alert(
        'Please fill out all required fields before proceeding to payment.'
      );
    }
  }

  // Function for Pay Now
  payNow() {
    this.onSubmit; // Call the onSubmit function to handle the submission
  }
}
