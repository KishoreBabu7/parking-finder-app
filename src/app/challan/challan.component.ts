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
    startTimePeriod: 'AM',
    endTime: '',
    endTimePeriod: 'AM',
    violationTime: '',
    amount: 0,
  };

  constructor(private challanService: ChallanService) {}

  calculateFee() {
    if (this.challanData.startTime && this.challanData.endTime) {
      const startTime = this.convertToDate(
        this.challanData.startTime,
        this.challanData.startTimePeriod
      );
      const endTime = this.convertToDate(
        this.challanData.endTime,
        this.challanData.endTimePeriod
      );

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

  convertToDate(time: string, period: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    let adjustedHours = hours;

    if (period === 'PM' && hours !== 12) {
      adjustedHours += 12; // Convert PM hours to 24-hour format
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0; // Convert 12 AM to 0 hours
    }

    now.setHours(adjustedHours, minutes, 0, 0);
    return now;
  }

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
          alert('Failed to submit challan: ' + error.error);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }

  payNow(challanForm: NgForm) {
    if (challanForm.valid) {
      console.log(
        'Proceeding to payment with the following data:',
        this.challanData
      );

      this.challanService.processPayment(this.challanData).subscribe(
        (response: any) => {
          console.log('Payment processed successfully:', response);
          alert('Payment successful, redirecting to payment page.');

          // Navigate to payment page
          window.location.href = '/payment'; // Replace with router navigation if using Angular routing
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
          alert('Failed to submit challan: ' + error.error);
        }
      );
    } else {
      alert(
        'Please fill out all required fields before proceeding to payment.'
      );
    }
  }
}
