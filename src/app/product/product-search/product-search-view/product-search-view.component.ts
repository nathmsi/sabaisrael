import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-search-view',
  templateUrl: './product-search-view.component.html',
  styleUrls: ['./product-search-view.component.css']
})
export class ProductSearchViewComponent implements OnInit {

  @Input() id:any;
  @Input() product: Product;

  //product: Product = null;
  //dataReceive: boolean = false;
  imageLoader: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log(this.product);
    // this.handleSelectProduct(this.id);
  }

  // handleSelectProduct(id: string){
  //   this.productService.getProductByID_Categorie('categorie',id).then(
  //     (product: Product) =>{
  //         this.product = product;
  //         this.dataReceive = true;
  //     },
  //     (error) =>{
  //       console.log(error);
  //     }
  //   )
  // }

}
