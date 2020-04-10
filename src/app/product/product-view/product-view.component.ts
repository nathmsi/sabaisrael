import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  @Input() product: Product;
  @Input() navigateTo: Function;
  @Input() onAddToCard: Function;

  constructor() { 

  }

  ngOnInit() {
  }

  addToShoppingCard(){
    this.onAddToCard(this.product);
  }

 

  ngOnDestroy() {
  }



}
