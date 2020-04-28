import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmationComponent } from 'src/app/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order = null;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public orderService: OrderService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
   // console.log(this.data);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.data.products.map(t => parseInt(t.price) * t.count).reduce((acc, value) => acc + value, 0);
  }

  getTotalCount() {
    return this.data.products.map(t => t.count).reduce((acc, value) => acc + value, 0);
  }


  onSaveForm = (order: Order): void => {
    order.products = this.data.products.map(e => ({ id: e.id, count: e.count }));
    order.count = this.getTotalCount();
    order.total = this.getTotalCost();
    console.log(order);
    this.order = order;
  }

  onSubmitOrder() {
    this.isLoading = true;
    if (this.order !== null) {
      const dialogRef = this.dialog.open(ModalConfirmationComponent, {
        maxWidth: "400px",
        data: "Do you confirm to submit this order"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.orderService.createNewOrder(this.order).then(
            (data) => {
              console.log(data);
              this.isLoading = false;
              this._snackBar.open('order sent !', 'close');
              this.dialogRef.close(true);
            },
            (error) => {
              console.log(error);
              this._snackBar.open('error !' + error, 'close');
              this.isLoading = false;
            }
          )
        }else{
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
      this._snackBar.open('you need to save your information before', 'close');
    }
  }


}
