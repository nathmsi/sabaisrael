import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-search-view',
  templateUrl: './product-search-view.component.html',
  styleUrls: ['./product-search-view.component.css']
})
export class ProductSearchViewComponent implements OnInit {

  @Input() id:string;
  @Input() categorie:string;

  product: Product = null;
  dataReceive: boolean = false;
  imageLoader: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.handleSelectProduct(this.categorie,this.id);
  }

  handleSelectProduct(categorie: string,id: string){
    this.productService.getProductByID_Categorie(categorie,id).then(
      (product: Product) =>{
          this.product = product;
          this.dataReceive = true;
      },
      (error) =>{
        console.log(error);
      }
    )
  }

}
