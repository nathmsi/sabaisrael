import { Component, OnInit, Input } from '@angular/core';
import { WindowReference } from 'src/app/models/windowRef.model';
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
  dataReceive: boolean = false;
  menuList: string[] = [];
  countReceive: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.menus.forEach((element: any) => {
      element.value.forEach(val => {
        this.menuList.push(val);
        this.countReceive++;
      });
    });
  }

  setDataReceive = (menu: string) => {
     this.countReceive--;
  }








}
