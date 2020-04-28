import { Component, OnInit, Input } from '@angular/core';
import { WindowReference } from 'src/app/models/windowRef.model';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {

  @Input() onAddToCard: Function;
  @Input() openProductView: Function;
  @Input() refWindow: WindowReference;
  @Input() navigateTo: Function;
  @Input() menus: any[];
  @Input() products : Product[];

  menuList: string[] = [];
  

  constructor() { }

  ngOnInit(): void {
    this.menus.forEach((element: any) => {
      element.value.forEach(val => {
        this.menuList.push(val);
      });
    });
  }


  _filterProductByCategorie(categorie: string){
    let limit = this.refWindow.contentMobile ? 2 : 6;
    limit = this.refWindow.headerMobile ? 3 : limit;
    return this.products.filter( e => e.categorie === categorie).slice(0, limit);
  }








}
