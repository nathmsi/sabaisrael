import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WindowRef } from 'src/app/services/windowRef.service';
import { WindowReference } from 'src/app/models/windowRef.model';

interface Sort {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

  @Input() categorie: string;
  @Input() products: Product[];
  @Input() onAddToCard: Function;
  @Input() refWindow: WindowReference;
  @Input() openProductView: Function;
  @Input() navigateTo: Function;


  productFilter: Product[] = [];
  sizeSelected: string = "";
  qualitySelected: string = "";
  selectedOptionPrice: string = "";
  selectedOptionKippotsSize: string = "";
  isFilterLoading: boolean = true;


  foods: Sort[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];


  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.productFilter = this.products.map(e => e);
  }

  ngOnChanges(changes: SimpleChanges) {
   this.productFilter = this.products.map(e => e);
   this.onSelectedOptionPrice();
 }


  onSubmitForm() {

  }

  onDeleteProduct() {

  }

  onSelectedOptionPrice() {
    // console.log(this.selectedOptionPrice);
    this.productFilter = this.products.map(e => e);
    this.selectedOptionPrice === 'less' && this.productFilter.sort((a, b) => (a.price > b.price) ? 1 : -1);
    this.selectedOptionPrice === 'plus' && this.productFilter.sort((a, b) => (a.price > b.price) ? 1 : -1).reverse();
    this.selectedOptionPrice === 'new' && this.productFilter.reverse();
    // console.log(this.productFilter,this.products);
  }

  onSelectedOptionKippotSize() {
    // console.log(this.selectedOptionKippotsSize);
    this.productFilter = this.products.map(e => e);
    // console.log(this.productFilter,this.products);
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
