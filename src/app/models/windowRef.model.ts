import { Platform } from '@angular/cdk/platform';

export class WindowReference {
    isMobile: boolean;
    ANDROID: boolean;
    IOS: boolean;
    isBrowser: boolean;
    width: number;
    height: number;
    headerMobile: boolean;
    contentMobile: boolean;
    colorTheme: string ;
    colorText: string;
    
    constructor( isMobile ) {
        this.isMobile = isMobile;
        this.ANDROID =false;
        this.IOS = false;
        this.isBrowser = false;
        this.width = 1000;
        this.height = 1000;
        this.headerMobile = false;
        this.contentMobile = false;
        this.colorTheme = 'dark';
    }

    

    setPlatform(platform: Platform){
        this.ANDROID = platform.ANDROID;
        this.IOS = platform.IOS;
        this.isBrowser = platform.isBrowser;
    }
}
