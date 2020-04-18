import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';
import { Router } from '@angular/router';


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
  windowRef: WindowReference;
  SubscriptionRefWindow: Subscription;


  constructor(
    private productService: ProductService,
    private windowRefer: WindowRef,
    private router: Router,
    ) {

  }



  ngOnInit() {
    this.Subscription = this.productService.shoppingCardSubject.subscribe(
      (products: any[]) => {
        if (products.length > 0) {
          this.getData(products);
        } else {
          this.products = [];
          this.dataReceive = true;
        }
      }
    );
    this.productService.emitShoppingCard();

    this.SubscriptionRefWindow = this.windowRefer.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.windowRef = windowRefer;
      }
    )

    this.windowRefer.emitWindowRef();
  }


  getData(products: any[]) {
    this.productService.requestDataFromSH(products).subscribe((data: any[]) => {
      data.forEach((e) => e.count = this.getCount(e.id, products));
      this.products = data;
      this.dataReceive = true;
    });
  }

  getCount(id, products: any[]) {
    try {
      let count = products.filter(e => e.id === id)[0].count;
      return count;
    } catch (error) {
      console.log(error);
      return 1;
    }
  }


  DeleteAll = () => {
    this.products = [];
    this.productService.deleteProductCard();
  }

  DeleteOne = (id: string) => {
    this.productService.deleteOneProductCard(id);
  }

  countUpdate = (count: number, id: string) => {
    count >= 1 && this.productService.updateCountProduct(count, id);
  }



  setColorTheme(colorTheme: string ,textColor: string){
    this.windowRefer.setColorTheme(colorTheme,textColor);
  }

  openProductView = (product: Product) =>{
    this.router.navigate(['product',product.categorie,product.id]);
  }





  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
