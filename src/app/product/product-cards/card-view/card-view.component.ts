import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {MatDialog } from '@angular/material/dialog';
// import { DialogOverviewComponent } from 'src/app/dialog-overview/dialog-overview.component';
import { ProductUpdateComponent } from '../../product-update/product-update.component';
import { ModalImageComponent } from '../modal-image/modal-image.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  @Input() product: Product;
  @Input() onDeleteProduct: any;
  @Input() onAddToCard: any;
  @Input() isMobile: boolean;


  imageLoader: boolean = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(product: Product): void {
    // const dialogRef = this.dialog.open(DialogOverviewComponent, {
    //   width: '250px',
    //   data: {title: 'Confirmation' }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed' , result);
    //   this.onAddToCard(product);
    // });

    this.onAddToCard(product);
  }

  openImage(photo: string): void {
    this.dialog.open(ModalImageComponent, {
      width: '800px',
      height: '600px',
      data : { photo }
    });
  }





}
