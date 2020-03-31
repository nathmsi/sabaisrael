import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription  } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProductUpdateComponent } from '../product/product-update/product-update.component';
import { ProductFormComponent } from '../product/product-form/product-form.component';
import { MenuUpdateComponent } from './menu-update/menu-update.component';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';

@Component({
  selector: 'app-product-stock-update',
  templateUrl: './product-stock-update.component.html',
  styleUrls: ['./product-stock-update.component.css']
})
export class ProductStockUpdateComponent implements OnInit {

  products: Product[] = [];
  dataReceive: boolean = false;
  menusReceive: boolean = false;
  sidenavOpen: boolean = false;
  isMobile: boolean = false;
  SubscriptionRefWindow: Subscription;
  menus: string[] = [];
  categorieSelected: string = 'Kippots'

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private windowRef: WindowRef,
  ) {



    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.isMobile = windowRefer.contentMobile;
        if (!this.isMobile) { this.sidenavOpen = true } else { this.sidenavOpen = false }
      }
    )

    this.windowRef.emitWindowRef();
  }



  ngOnInit() {
    this.productService.getMenus().then(
      (data: string[]) => {
        this.menus = data;
        this.menusReceive = true;
      }
    )
    this.handleSelectCatgorie("Kippots");
  }


  handleSelectCatgorie(categorie: string) {
    this.products = [];
    this.dataReceive = false;
    this.productService.getProductByCategorie(categorie).then(
      (products: Product[]) => {
        console.log(products);
        this.products = products;
        this.dataReceive = true;
        this.categorieSelected = categorie;
      },
      (error) => {
        this.dataReceive = true;
        console.log(error);
      }
    )
  }


  tabClick(event) {
    this.handleSelectCatgorie(event.tab.textLabel)
  }


  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.handleSelectCatgorie(this.categorieSelected);
      console.log('The dialog Edit was closed');
    });
  }

  updateMenu() {
    const dialogRef = this.dialog.open(MenuUpdateComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.handleSelectCatgorie(this.categorieSelected);
      console.log('updateMenu was closed');
    });
  }




  editProduct = (product: Product) => {
    const dialogRef = this.dialog.open(ProductUpdateComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog Edit was closed');
      this.handleSelectCatgorie(this.categorieSelected);
    });
  }




  ngOnDestroy() {
  }



}
