import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-view-product',
  templateUrl: './home-view-product.component.html',
  styleUrls: ['./home-view-product.component.css']
})
export class HomeViewProductComponent implements OnInit {

  @Input() onAddToCard: Function;
  @Input() openProductView: Function;
  @Input() isMobile: boolean;
  @Input() categorie: string;
  @Input() navigateTo: Function;

  products: Product[] = [];
  dataReceive: boolean = false;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.productService.getProductByCategorieLimited(this.categorie,this.isMobile? 2 : 6).then(
      (products: Product[]) => {
        this.products = products;
        this.dataReceive = true;
      },
      (error) => {
        console.log(error);
        this.dataReceive = true;
      }
    )
  }

}
