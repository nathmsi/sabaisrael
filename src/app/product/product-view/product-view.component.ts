import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { WindowReference } from 'src/app/models/windowRef.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  @Input() product: Product;
  @Input() navigateTo: Function;
  @Input() onAddToCard: Function;
  @Input() refWindow: WindowReference;

  imageLoader: boolean = true;

  constructor(
    public dialog: MatDialog,
  ) { 

  }

  ngOnInit() {
  }

  addToShoppingCard(){
    this.onAddToCard(this.product);
  }

  handleClickImage(){
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: "90%",
      height: this.refWindow.headerMobile? "50%" :"70%",
      data: this.product.photo
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('clodes')
    });
  }

 

  ngOnDestroy() {
  }



}
