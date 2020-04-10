import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { WindowRef } from 'src/app/services/windowRef.service';
import { WindowReference } from 'src/app/models/windowRef.model';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

  @Input() categorie: string;
  @Input() products: Product[];
  @Input() onAddToCard: Function;
  @Input() isMobile: Boolean;
  @Input() openProductView: Function;
  @Input() navigateTo: Function;


  productFilter: Product[] = [];
  sizeSelected: string = "";
  qualitySelected: string = "";


  constructor(  public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  onSubmitForm() {

  }

  onDeleteProduct() {

  }

  


  // onAddToCard = (product: Product) => {
  //   this.productService.addToShoppingCard(product);
  //   this.toastr.success(product.name + ' add to shopping card ');
  // }

  // selectOptionSize() {
  //   console.log(this.qualitySelected, this.sizeSelected);

  //   if (this.sizeSelected === "" && this.qualitySelected === "") {
  //     this.productFilter = this.products;
  //   }
  //   else if (this.sizeSelected !== "" && this.qualitySelected !== "") {
  //     this.productFilter = this.products.filter(e => e.size === this.sizeSelected && e.quality === this.qualitySelected);
  //   }
  //   else if (this.sizeSelected !== "" && this.qualitySelected === "") {
  //     this.productFilter = this.products.filter(e => e.size === this.sizeSelected);
  //   }
  //   else {
  //     this.productFilter = this.products.filter(e => e.quality === this.qualitySelected);
  //   }

  // }

  // selectOptionQuality() {
  //   if (this.qualitySelected === "" && this.sizeSelected === "") {
  //     this.productFilter = this.products;
  //   }
  //   else if (this.qualitySelected !== "" && this.sizeSelected !== "") {
  //     this.productFilter = this.products.filter(e => e.size === this.sizeSelected && e.quality === this.qualitySelected);
  //   }
  //   else if (this.qualitySelected !== "" && this.sizeSelected === "") {
  //     this.productFilter = this.products.filter(e => e.quality === this.qualitySelected);
  //   }
  //   else {
  //     this.productFilter = this.products.filter(e => e.size === this.sizeSelected);
  //   }

  // }


  ngOnDestroy() {
   
  }



}
