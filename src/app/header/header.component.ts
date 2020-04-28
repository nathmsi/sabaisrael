import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/Authentication/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import {
  Platform,
} from '@angular/cdk/platform';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;
  lengthShoppingCard: number = 0;
  showSC: boolean = false;
  user: User = {
    name: 'default',
    email: '',
    uid: "",
    isAuth: false,
    photo: "",
    phone: "",
    level: "",
    token: "",
    photoUrl: ""
  };
  refWindow: WindowReference;
  userSubscription: Subscription;
  SubscriptionShoppingCard: Subscription;
  SubscriptionRefWindow: Subscription;


  

  constructor(
    public platform: Platform,
    private authService: AuthService,
    private windowRef: WindowRef,
    private router: Router,
    private product: ProductService) {

    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        console.log("%c Header component ", "color: orange", user);
        this.user = user;
      }
    );

    this.SubscriptionShoppingCard = this.product.shoppingCardSubject.subscribe(
      (products: any[]) => {
        this.lengthShoppingCard = products.length;
      }
    );

    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) =>{
        this.refWindow = windowRefer;
      }
    )


    this.authService.emitUser();
    this.product.getShoppingCard();
    this.windowRef.emitWindowRef();



  }

  ngOnInit(): void {
  }

  clickSC = () => {
    if(this.router.url === '/shopping-cart'){
        this.showSC = false;
    }else{
      this.showSC = !this.showSC;
    }
  }



  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      window.pageYOffset >= 54 && this.router.url.startsWith("/product") &&  ( this.isMenuCollapsed = true );
    }
  




  

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/auth', 'signin']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.SubscriptionRefWindow.unsubscribe();
  }



}
