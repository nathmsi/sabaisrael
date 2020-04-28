import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderComponent } from './order/order.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/Authentication/auth.service';
import { User } from '../models/user.model';


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
  loadingContent: boolean = false;
  windowRef: WindowReference;
  SubscriptionRefWindow: Subscription;
  userSubscription: Subscription;
  user: User = new User('','','',false,'','');


  constructor(
    private productService: ProductService,
    private windowRefer: WindowRef,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
          this.loadingContent = true;
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

    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
    this.authService.emitUser();
  }


  getData(products: any[]) {
    this.loadingContent = false;
    const newProduct = this.getOnlyNewProduct(products);
    // const lastProduct = this.getOnlyLastProduct(products);
    if (newProduct.length === 0) {
      this.dataReceive = true;
      this.loadingContent = true;
    } else {
      this.productService.requestDataFromSH(newProduct).then(
        (data: Product[]) => {
          data.forEach((e) => {
            e.count = this.getCount(e.id, products)
            this.products.push(e);
          });
          this.dataReceive = true;
          this.loadingContent = true;
        },
        (error) => {
          console.log(error);
          this.products = [];
          this.dataReceive = true;
          this.loadingContent = true;
        }
      )
    }
  }

  getOnlyNewProduct(products: any) {
    let result = [];
    products.forEach(element => {
      if (!this.idExistInProducts(element.id)) {
        result.push(element)
      }
    });
    return result;
  }

  getOnlyLastProduct(products: any) {
    let result = [];
    products.forEach(element => {
      if (this.idExistInProducts(element.id)) {
        result.push(element)
      }
    });
    return result;
  }


  idExistInProducts(id): boolean {
    return this.products.some(el => el.id === id);
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
    this.dataReceive = false;
    this.products = this.products.filter(e => e.id !== id);
    this.productService.deleteOneProductCard(id);
    this.dataReceive = true;
  }

  countUpdate = (count: number, id: string) => {
    this.products.forEach(e => {
      if (e.id === id && count >= 1) {
        e.count = count;
      }
    });
    count >= 1 && this.productService.updateCountProduct(count, id);
  }



  setColorTheme(colorTheme: string, textColor: string) {
    this.windowRefer.setColorTheme(colorTheme, textColor);
  }

  openProductView = (product: Product) => {
    this.router.navigate(['product', product.categorie, product.id]);
  }



  openOrder() {
    if (this.user.isAuth) {
      const dialogRef = this.dialog.open(OrderComponent, {
        height: this.windowRef.contentMobile? '85%' : '60%',
        width: this.windowRef.contentMobile? '100%' : '90%',
        data: {
          products: this.products,
          windowRef: this.windowRef,
          user: this.user
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
      });
    } else {
      this._snackBar.open('please login before ', 'close');
    }
  }





  ngOnDestroy() {
    this.Subscription.unsubscribe();
    this.SubscriptionRefWindow.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
