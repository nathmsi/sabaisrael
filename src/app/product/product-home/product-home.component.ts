import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {

  @Input() onAddToCard: Function;
  @Input() openProductView: Function;
  @Input() isMobile: boolean;
  @Input() navigateTo: Function;
  @Input() menus: any[];
  menuList: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.menus.forEach((element: any) => {
      element.value.forEach(val => {
        this.menuList.push(val);
      });
    });
  }






}
