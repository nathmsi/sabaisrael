import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {MatDialog } from '@angular/material/dialog';
// import { DialogOverviewComponent } from 'src/app/dialog-overview/dialog-overview.component';
import { ProductUpdateComponent } from '../../product-update/product-update.component';
import { ModalImageComponent } from '../modal-image/modal-image.component';
import { Router } from '@angular/router';

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
  @Input() openProductView: Function;


  imageLoader: boolean = true;

  constructor(public dialog: MatDialog ,public router: Router) { }

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

  openImage(product: Product): void {
    //this.router.navigate(['/product', 'view', product.categorie , product.id]);
    this.openProductView(product);
  }





}
