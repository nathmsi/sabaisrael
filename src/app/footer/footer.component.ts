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

  SubscriptionRefWindow: Subscription;
  colorTheme: string = '';
  refWindow: WindowReference;


  constructor(
    private windowRef: WindowRef,
  ) {

    this.SubscriptionRefWindow = this.windowRef.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.refWindow = windowRefer;
      }
    )

    this.windowRef.emitWindowRef();
  }

  ngOnInit(): void {
  }


}
