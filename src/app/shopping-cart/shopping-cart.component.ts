import { Component, OnInit,  Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input() isPoPup: boolean = false;
  @Input() closePoPup: Function;

  Subscription: Subscription;
  products: Product[] = [];
  dataReceive: boolean = false;

  constructor(
    private productService: ProductService) {
    
  }



  ngOnInit() {
    this.Subscription = this.productService.shoppingCardSubject.subscribe(
      (products: any[]) => {
        this.products = products;
          this.dataReceive = true;
      }
    );
    this.productService.emitShoppingCard();
  }

  DeleteAll = () => {
    this.products = [];
    this.productService.deleteProductCard();
  }

  DeleteOne = (id: string) => {
    this.productService.deleteOneProductCard(id);
  }

  countUpdate = (count: number,id: string) => {
    count >= 1 && this.productService.updateCountProduct(count,id);
  }





  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
