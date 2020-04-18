import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowRef } from '../services/windowRef.service';
import { WindowReference } from '../models/windowRef.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  subscriptionW: Subscription;
  isMobile: boolean = false;
  widthScreen: number;

  videos: string[] = [
    'a6wJvMV7YpE',
    'XrCwOLS3C3I',
    'rjtHDyl6o78',
  ]

  constructor(
    private windowRef: WindowRef
  ) {
    
   }



  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.subscriptionW = this.windowRef.windowSubject.subscribe(
      (element: WindowReference) =>{
        this.isMobile = element.headerMobile;
        this.widthScreen = element.width;
      }
    )
    this.windowRef.emitWindowRef();


  }

  ngOnDestroy(){
    this.subscriptionW.unsubscribe;
  }

}
