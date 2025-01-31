import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChallanService } from '../services/challan.service';
import { Challan } from '../models/challan.model';

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

  convertToDate(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  generateTokenId(form: NgForm): void {
    if (form.invalid) {
      alert(
        'Please fill out all required fields correctly before generating a token.'
      );
      return;
    }

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    const tokenLength = Math.floor(Math.random() * 2) + 5; // Randomly choose 5 or 6

    for (let i = 0; i < tokenLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    this.challanData.tokenId = token;
    this.challanData.bookingDate = new Date().toLocaleDateString();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!this.challanData.tokenId) {
      this.generateTokenId(form);
    }

    this.challanService.createChallan(this.challanData).subscribe(
      (response) => {
        alert(
          `Challan submitted successfully. Token ID: ${this.challanData.tokenId}`
        );
        form.resetForm();
        this.challanData.tokenId = '';
      },
      (error) => {
        alert('Failed to submit challan: ' + error.error);
      }
    );
  }
}
