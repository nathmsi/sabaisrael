import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-table-view-sc',
  templateUrl: './table-view-sc.component.html',
  styleUrls: ['./table-view-sc.component.css']
})
export class TableViewScComponent implements OnInit {

  @Input() products: Product[];
  @Input() DeleteAll: Function;
  @Input() DeleteOne: Function;
  @Input() countUpdate: Function;
  @Input() isPoPup: boolean;


  dataSource = new MatTableDataSource<Product>(this.products);
  displayedColumns: string[] = ['photo', 'name', 'count' , 'price', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    //console.log(this.products);
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
}

    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.products.map(t => parseInt(t.price)*t.count).reduce((acc, value) => acc + value, 0);
    }

    getTotalCount(){
      return this.products.map(t => t.count).reduce((acc, value) => acc + value, 0);
    }

    

}
