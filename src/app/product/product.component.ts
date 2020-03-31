import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Platform } from '@angular/cdk/platform';
import { ToastrService } from 'ngx-toastr';
import { WindowRef } from '../services/windowRef.service';
import { Subscription } from 'rxjs';
import { WindowReference } from '../models/windowRef.model';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  prodcuctFilter: Product[] = [];
  categorieSelected: string = 'Kippots'
  isMobile: boolean = false;
  dataReceive: boolean = false;
  menusReceive: boolean = false;
  mobileQuery: MediaQueryList;
  // imgFontKippots: string = 'https://firebasestorage.googleapis.com/v0/b/saba-israel.appspot.com/o/images%2Fmenu%2Fkippot.jpg?alt=media&token=7f14d998-4058-4f6f-938a-b49df082262b';
  // sizesKippots: string[] = ['12', '14', '16', '18', '20'];
  // qualityKippots: string[] = ['srouga', 'bad', 'ktifa'];
  panelOpenState = false;
  SubscriptionRefWindow: Subscription;
  menus: string[] = [];
  sidenavOpen: boolean = false;


  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private productService: ProductService,
    private platform: Platform,
    private windowRef: WindowRef,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {


    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.isMobile = windowRefer.contentMobile;
        if(!this.isMobile){ this.sidenavOpen = true} else {this.sidenavOpen = false}
      }
    )

    this.windowRef.emitWindowRef();

  }


  ngOnInit(): void {
    this.isMobile = this.platform.ANDROID || this.platform.IOS;
    this.productService.getMenus().then(
      (data: string[]) => {
        this.menus = data;
        this.menusReceive = true;
      }
    )
    this.handleSelectCatgorie(this.categorieSelected);
  }



  tabClick(event) {
    this.handleSelectCatgorie(event.tab.textLabel)
  }



  handleSelectCatgorie(categorie: string) {
    this.products = [];
    this.dataReceive = false;
    this.categorieSelected = categorie;
    this.productService.getProductByCategorie(categorie).then(
      (products: Product[]) => {
        //console.log(products);
        this.dataReceive = true;
        this.products = products;
        this.prodcuctFilter = products;
      },
      (error) => {
        this.dataReceive = true;
        console.log(error);
      }
    )
  }



  onAddToCard = (product: Product) => {
    this.productService.addToShoppingCard(product);
    this.toastr.success('+ shopping card ');
  }

  
  

  ngOnDestroy(): void {
    this.SubscriptionRefWindow.unsubscribe();
  }








}
