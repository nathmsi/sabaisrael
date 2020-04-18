import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import { WindowRef } from './services/windowRef.service';
import { Platform } from '@angular/cdk/platform';
import { WindowReference } from './models/windowRef.model';
import { AuthService } from './services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string = 'SabaIsrael';
  firebaseConnected: boolean = false;

  windowRefer: WindowReference = new WindowReference(false);

  constructor(
    private windowRef: WindowRef,
    public platform: Platform,
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {

    this.initWindowRefer();



    this.authService.connectFirebase().then(
      () => {
        console.log('firebase-connected');
        this.firebaseConnected = true;
      },
      (error) => {
        console.error(error);
      }
    )


  }


  initWindowRefer() {
    this.windowRefer.setPlatform(this.platform);
    this.windowRefer.width = window.innerWidth;
    this.windowRefer.height = window.innerHeight;
    this.setObjectWindowRef();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowRefer.width = event.target.innerWidth;
    this.windowRefer.height = event.target.innerHeight;
    this.setObjectWindowRef();
  }

  



  setObjectWindowRef() {
    this.windowRefer.setPlatform(this.platform);
    this.windowRef.setObjectWindowRef(this.windowRefer);
    //console.log('window reference ', this.windowRefer);
  }

  

  ngOnDestroy(): void {
    
  }



}
