import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { trigger, transition, style, animate, state } from '@angular/animations';


interface ProductSearch{
  name: string;
  id: string;
  categorie: string;
  product: Product;
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
]
})
export class ProductSearchComponent implements OnInit {

  @Input() isMobile: boolean;

  showInput : boolean = false;

  myControl = new FormControl();

  filteredOptions: Observable<ProductSearch[]>;

  subscribeSearch: Subscription;
  productSeach: any[] = [];
  dataReceive: boolean = false;
  noResult: boolean = false;
  // idsSelected: ProductSearch[] = [];
  // products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {

    this.subscribeSearch = this.productService.productSearchSubject.subscribe(
      (productSeach: Product[]) => {
        this.productSeach = productSeach;
        //console.log(productSeach);
        this.dataReceive = true;
      }
    )
    this.productService.emitProductSearch();
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map( value => {
          let filteredValues =  this._filter(value);
          if (value !== '') {
            filteredValues.length < 1 ? (this.noResult = true) : (this.noResult = false);
          }
          return filteredValues;
        })
      );
  }



  private _filter(value: string): ProductSearch[] {
    const filterValue = value.toLowerCase();
    const filertValuer =  filterValue === '' ? [] :
      this.productSeach.filter(element => {
        return element.name.toLowerCase().includes(filterValue) || element.categorie.toLowerCase().includes(filterValue)
    }).slice(0, 5);


    // this.productService.requestDataFromSH(filertValuer).then(
    //   (data: Product[]) => {
    //     data.forEach((e) => {
    //       filertValuer.forEach( value =>{
    //         if(value.id === e.id){
    //           value.product = e;
    //         }
    //       })
    //     });
    //     console.log(filertValuer);
    //     this.dataReceive = true;
    //     return filertValuer;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.dataReceive = true;
    //     return filertValuer;
    //   }
    // )
    return filertValuer;
  }


  openProduct(id) {
    this.router.navigate(['product', 'id', id]);
    this.closeKeyboard();
  }

  openProductKEYUP() {
    if (this.myControl.value !== null) {
      let firstProduct: any[];
      firstProduct = this._filter(this.myControl.value);
      if (firstProduct[0]) {
        //console.log(firstProduct);
        this.openProduct(firstProduct[0].id);
        this.myControl.setValue('');
      } else {
        this.myControl.setValue('');
        this.closeKeyboard();
      }
    }
  }

  closeKeyboard() {
    let activeElement = <HTMLElement>document.activeElement;
    activeElement && activeElement.blur && activeElement.blur();
  }



  // getAllProducts(ids){
  //   this.productService.requestDataFromSH(ids).then(
  //     (data: Product[]) => {
  //       data.forEach((e) => {
  //         this.products.push(e);
  //       });
  //       this.dataReceive = true;
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.products = [];
  //       this.dataReceive = true;
  //     }
  //   )
  // }


}
