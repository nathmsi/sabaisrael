import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isMobile: boolean = false;
  SubscriptionRefWindow: Subscription;
  size = {
    height: '400px',
    width: '600px'
  }


  constructor(
    private windowRef: WindowRef,
  ) { 
    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.isMobile = windowRefer.contentMobile;
      }
    )
    this.windowRef.emitWindowRef();
  }

  ngOnInit(): void {
  }

}
