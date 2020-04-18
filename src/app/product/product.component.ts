import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { Platform } from '@angular/cdk/platform';
import { WindowRef } from '../services/windowRef.service';
import { Subscription } from 'rxjs';
import { WindowReference } from '../models/windowRef.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productSelected: Product;
  categorieSelected: string = 'Kippots'
  dataReceive: boolean = false;
  menusReceive: boolean = false;
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  SubscriptionRefWindow: Subscription;
  menus: any[] = [];
  sidenavOpen: boolean = false;
  showProductView: boolean = false;
  showProductHome: boolean = false;
  openProductSearch: boolean = true;
  refWindow: WindowReference;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private windowRef: WindowRef,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {


    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.refWindow =  windowRefer;
        this.refWindow.isMobile = windowRefer.contentMobile;
        if (!this.refWindow.isMobile) { this.sidenavOpen = true  } else { this.sidenavOpen = false , this.openProductSearch = false }
      }
    )

    this.productService.getProductMapSearch();
    this.windowRef.emitWindowRef();

  }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: { categorie: string , id: string}) => {
        //console.log(params);
        this.dataReceive = false;
        if(params.id !== ''){
          this.handleSelectProduct(params.categorie,params.id);
        }else{
          params.categorie === 'home' ? this.handleSelectMenu() : this.handleSelectCatgorie_(params.categorie);
        }
      }
    );
    this.productService.getMainMenus().then(
      (data: any[]) => {
        this.menus = data;
        this.menusReceive = true;
      }
    )

  }

  handleSelectMenu(){
    this.categorieSelected = 'Home';
    this.dataReceive = true;
    this.showProductView = false;
    this.showProductHome = true;
  }


  handleSelectProduct(categorie: string,id: string){
    this.showProductView = false;
    this.showProductHome = false;
    this.productSelected = null;
    this.categorieSelected = categorie;
    //!this.isMobile && (this.sidenavOpen = false );
    this.productService.getProductByID_Categorie(categorie,id).then(
      (product: Product) =>{
        this.productSelected = product;
        this.showProductView = true;
        this.dataReceive = true;
      },
      (error) =>{
        console.log(error);
      }
    )
  }



  handleSelectCatgorie_(categorie: string) {
    this.products = [];
    this.showProductView = false;
    this.showProductHome = false;
    this.categorieSelected = categorie;
    //!this.isMobile && (this.sidenavOpen = true );
    this.productService.getProductByCategorie(categorie).then(
      (products: Product[]) => {
        this.dataReceive = true;
        this.products = products;
      },
      (error) => {
        this.dataReceive = true;
        console.log(error);
      }
    )
  }

  handleSelectCatgorie(categorie: string) {
    this.router.navigate(['product',categorie,'']);
  }



  onAddToCard = (product: Product) => {
    this.productService.addToShoppingCard(product);
    let snackBarRef = this._snackBar.open('+ shopping cart ', 'Go');
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopping-cart']);
    })
  }

  openProductView = (product: Product) =>{
    this.router.navigate(['product',product.categorie,product.id]);
  }

  closeProductView = () =>{
    this.router.navigate(['product',this.productSelected.categorie,'']);
  }

  navigateTo = (path: string) => {
    this.router.navigate(['product',path,'']);
  }



  ngOnDestroy(): void {
    this.SubscriptionRefWindow.unsubscribe();
  }








}
