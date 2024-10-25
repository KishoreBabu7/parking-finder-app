import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChallanService } from '../services/challan.service';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css']
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
    amount: 0
  };

  constructor(private challanService: ChallanService) {}

  calculateFee() {
    if (this.challanData.startTime && this.challanData.endTime) {
      const startTime = this.convertToDate(this.challanData.startTime, this.challanData.startTimePeriod);
      const endTime = this.convertToDate(this.challanData.endTime, this.challanData.endTimePeriod);

      let violationTimeMillis = endTime.getTime() - startTime.getTime();
      if (violationTimeMillis < 0) {
        violationTimeMillis += 24 * 60 * 60 * 1000;  // Handle crossing midnight
      }

      const violationMinutes = violationTimeMillis / (1000 * 60);
      const hours = Math.floor(violationMinutes / 60);
      const minutes = Math.round(violationMinutes % 60);

      this.challanData.violationTime = `${hours} hours ${minutes} minutes`;
      this.challanData.amount = hours * 50 + (minutes > 0 ? 50 : 0);  // Calculate amount
    }
  }

  convertToDate(time: string, period: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    let adjustedHours = hours;

    if (period === 'PM' && hours !== 12) {
      adjustedHours += 12;  // Convert PM hours to 24-hour format
    } else if (period === 'AM' && hours === 12) {
      adjustedHours = 0;  // Convert 12 AM to 0 hours
    }

    now.setHours(adjustedHours, minutes, 0, 0);
    return now;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Submitting Challan Data:', this.challanData);

      this.challanService.createChallan(this.challanData)
        .subscribe(response => {
          console.log('Challan stored successfully:', response);
          alert('Challan submitted successfully');
        }, error => {
          console.error('Error storing challan:', error);
          alert('Failed to submit challan');
        });
    } else {
      alert('Please fill out all required fields.');
    }
  }

  payAtStation() {
    console.log('Payment method: Pay at Station');
  }
}
