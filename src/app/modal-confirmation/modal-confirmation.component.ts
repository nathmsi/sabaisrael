import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent{

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }
    
   
    onConfirm(): void {
      // Close the dialog, return true
      this.dialogRef.close(true);
    }
   
    onDismiss(): void {
      // Close the dialog, return false
      this.dialogRef.close(false);
    }

}
