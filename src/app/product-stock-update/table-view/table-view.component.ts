import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  @Input() products: Product[];
  @Input() editProduct: Function;
  @Input() addProduct: Function;

  dataSource = new MatTableDataSource<Product>(this.products);
  displayedColumns: string[] = ['photo', 'name', 'description' , 'price', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;
}

}
