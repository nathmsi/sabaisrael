import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
  isMobile: boolean = false;
  lengthShoppingCard: number = 0;
  showSC: boolean = false;
  user: User = {
    name: 'default',
    email: '',
    uid: "",
    isAuth: false,
    photo: "",
    phone: "",
    level: ""
  };
  colorTheme: string = '';
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
        this.isMobile = windowRefer.headerMobile;
        this.colorTheme = windowRefer.colorTheme;
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


  

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/auth', 'signin']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
