import { Component } from '@angular/core';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.component.css'
})
export class CancelComponent {
  onCancel(cancelForm: any) {
    if (cancelForm.valid) {
      alert('Payment has been successfully canceled!');
    }
  }
}
