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

  // Calculate the fee based on start and end time
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

  // Generate a 5 or 6-character alphanumeric token
  generateTokenId(form: NgForm): void {
    console.log('Form validity:', form.valid); // Debug form validity
    if (form.invalid) {
      this.showFormValidationErrors(form); // Show validation errors
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
    console.log('Token generated:', this.challanData.tokenId); // Debug token generation
  }

  // Show form validation errors in an alert
  showFormValidationErrors(form: NgForm): void {
    let errorMessage = 'Please correct the following errors:\n';

    if (form.controls['name']?.invalid) {
      errorMessage += '- Name is required.\n';
    }
    if (form.controls['mobile']?.invalid) {
      errorMessage += '- Valid 10-digit Mobile Number is required.\n';
    }
    if (form.controls['vehicleType']?.invalid) {
      errorMessage += '- Vehicle Type is required.\n';
    }
    if (form.controls['plateNumber']?.invalid) {
      errorMessage += '- Plate Number is required.\n';
    }
    if (form.controls['startTime']?.invalid) {
      errorMessage += '- Start Time is required.\n';
    }
    if (form.controls['endTime']?.invalid) {
      errorMessage += '- End Time is required.\n';
    }
    if (form.controls['date']?.invalid) {
      errorMessage += '- Date is required.\n';
    }

    alert(errorMessage); // Show the error message in an alert
  }

  // Copy Token ID to clipboard
  copyTokenId(): void {
    if (this.challanData.tokenId) {
      navigator.clipboard
        .writeText(this.challanData.tokenId)
        .then(() => {
          alert('Token ID copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy token ID:', err);
          alert('Failed to copy token ID. Please try again.');
        });
    }
  }

  // Submit form data logic
  onSubmit(form: NgForm) {
    console.log('Form submitted. Form validity:', form.valid); // Debug form validity
    if (!form.valid) {
      this.showFormValidationErrors(form); // Show validation errors
      return;
    }

    // Generate Token ID before submitting (if not already generated)
    if (!this.challanData.tokenId) {
      this.generateTokenId(form);
    }

    // Submit the form data to the server
    this.challanService.createChallan(this.challanData).subscribe(
      (response) => {
        alert(
          `Challan submitted successfully. Token ID: ${this.challanData.tokenId}`
        );
        form.resetForm(); // Reset the form after successful submission
        this.challanData.tokenId = ''; // Clear the token ID
      },
      (error) => {
        alert('Failed to submit challan: ' + error.error);
      }
    );
  }
}
