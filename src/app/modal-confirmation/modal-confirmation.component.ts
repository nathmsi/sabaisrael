import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WindowReference } from '../models/windowRef.model';
import { WindowRef } from '../services/windowRef.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent {

  windowRef: WindowReference;
  SubscriptionRefWindow: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private windowRefer: WindowRef) {

      this.SubscriptionRefWindow = this.windowRefer.windowSubject.subscribe(
        (windowRefer: WindowReference) => {
          this.windowRef = windowRefer;
        }
      )
  
      this.windowRefer.emitWindowRef();

  }


  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
