import { Component, OnInit } from '@angular/core';
import { TehilimsService } from '../services/tehilim.service';

@Component({
  selector: 'app-tehilims',
  templateUrl: './tehilims.component.html',
  styleUrls: ['./tehilims.component.css']
})
export class TehilimsComponent implements OnInit {

  constructor(
    private tehilimsService: TehilimsService
  ) { }

  ngOnInit(): void {
    // this.tehilimsService.createNew().then(
    //   (value) => console.log(value),
    //   (error) => console.log(error)
    // )
  }

}

