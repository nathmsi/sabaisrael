import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';


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
    private productService: ProductService ,
     private toastr: ToastrService ) {
    
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
    this.toastr.show('shopping card is empty');
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
