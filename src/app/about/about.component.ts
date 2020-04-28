import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from '../services/windowRef.service';
import { Subscription } from 'rxjs';
import { WindowReference } from '../models/windowRef.model';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  dataReceive: boolean = false;
  url: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1695.7562059827264!2d35.212484535304704!3d31.78378214880525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d62837961f95%3A0xd3f9d1148b164446!2sAgripas%20St%2069%2C%20Jerusalem!5e0!3m2!1sfr!2sil!4v1585495183413!5m2!1sfr!2sil";
  urlSafe: SafeResourceUrl;

  subscription: Subscription;
  windowRef: WindowReference;


  constructor(
    public sanitizer: DomSanitizer,
    private windowReferService: WindowRef
  ) { 
    this.subscription = this.windowReferService.windowSubject.subscribe(
      (windowRef: WindowReference) =>{
        this.windowRef = windowRef;
      }
    )
    this.windowReferService.emitWindowRef();
  }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  isLoaded(){
    console.log('isLoaded');
    this.dataReceive = true;
  }

  goToLink = (url: string) =>{
    window.open(url, "_blank");
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


