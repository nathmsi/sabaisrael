import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})

// class ProductSearch{
//   id:string ='';
//   name:string ='';
//   categorie:string =''
// }

export class ProductSearchComponent implements OnInit {

  @Input() isMobile: boolean;

  myControl = new FormControl();

  filteredOptions: Observable<string[]>;

  subscribeSearch: Subscription;
  productSeach: any[] = [];
  dataReceive: boolean = false;
  noResult: boolean = false;


  constructor(
    private productService: ProductService,
    private router: Router
  ) {

    this.subscribeSearch = this.productService.productSearchSubject.subscribe(
      (productSeach: any[]) => {
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
        map(value => {
          let filteredValues = this._filter(value);
          if (value !== '') {
            filteredValues.length < 1 ? (this.noResult = true) : (this.noResult = false);
          }
          return filteredValues;
        })
      );
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return filterValue === '' ? [] : 
    this.productSeach.filter(element => {
      return element.name.toLowerCase().includes(filterValue) || element.categorie.toLowerCase().includes(filterValue)
    }).slice(0, 3);
  }


  functiontest(id, categorie) {
    this.router.navigate(['product', categorie, id]);
  }

}
