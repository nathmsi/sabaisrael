import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isMobile: boolean = false;
  SubscriptionRefWindow: Subscription;
  colorTheme: string = '';


  constructor(
    private windowRef: WindowRef,
  ) {

    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.isMobile = windowRefer.contentMobile;
        this.colorTheme = windowRefer.colorTheme;
      }
    )

    this.windowRef.emitWindowRef();
  }

  ngOnInit(): void {
  }


}
